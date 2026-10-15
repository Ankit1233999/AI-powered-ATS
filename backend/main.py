import os
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from pydantic import BaseModel
import pypdf2

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

app = FastAPI(
    title="AI-Powered ATS Backend",
    version="1.0",
    description="Backend API for AI-powered Applicant Tracking System using FastAPI and Gemini"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI-Powered ATS Backend API!"}

def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        reader = pypdf2.PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF file: {str(e)}")

@app.post("/api/analyze")
async def analyze_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    resume_text = extract_text_from_pdf(resume)

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Uploaded PDF resume is empty or unreadable.")

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) analyzer. 
        Compare the following Resume text with the Job Description and provide:
        1. Match Score (in percentage, e.g., 85%)
        2. Missing Keywords that should be added to the resume
        3. Strengths of the candidate based on the resume
        4. Areas of improvement

        Job Description:
        {job_description}

        Resume Text:
        {resume_text}

        Provide the output in a clear, structured JSON-like or readable format.
        """

        response = model.generate_content(prompt)
        analysis_result = response.text

        return {
            "status": "success",
            "filename": resume.filename,
            "analysis": analysis_result
        }

    except Exception as  e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")