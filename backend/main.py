import os
import io
import logging
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from pypdf import PdfReader

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ats_backend")

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

app = FastAPI(title="AI-powered ATS Backend")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ATSResponse(BaseModel):
    status: str
    analysis: str

class ErrorResponse(BaseModel):
    status: str
    message: str

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

@app.get("/")
def read_root():
    return {"message": "AI-powered ATS Backend is running successfully!"}

@app.get("/ping")
def ping_pong():
    return {"ping": "pong"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "api_key_configured": api_key is not None
    }

@app.get("/formats")
def get_supported_formats():
    return {
        "supported_formats": ["pdf"],
        "max_file_size_mb": 5
    }

@app.get("/stats")
def get_stats():
    return {
        "service": "AI-powered ATS Backend",
        "total_endpoints": 5,
        "environment": "development"
    }

@app.post("/analyze-resume", response_model=ATSResponse, responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def analyze_resume(
    job_description: str = Form(...),
    file: UploadFile = File(...)
):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured.")

    # Validate Job Description length
    if not job_description.strip() or len(job_description.strip()) < 10:
        raise HTTPException(status_code=400, detail="Job description must be at least 10 characters long.")

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    try:
        contents = await file.read()
        
        # Limit file size to 5MB
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size exceeds the 5MB limit.")

        pdf_file = io.BytesIO(contents)
        
        reader = PdfReader(pdf_file)
        resume_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                resume_text += text + "\n"
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF.")

        model = genai.GenerativeModel("gemini-1.5-flash")
        
        prompt = f"""
        You are an expert HR recruiter. Analyze the following resume against the job description.
        Provide a match percentage and brief feedback including strengths and gaps.
        
        Job Description: {job_description}
        
        Resume Text:
        {resume_text}
        """
        
        response = model.generate_content(prompt)
        return {
            "status": "success",
            "analysis": response.text
        }
    
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error during resume analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))