import os
import io
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
import google.generativeai as genai
from pypdf import PdfReader

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")
print("Loaded API Key:", api_key)  # Yeh terminal mein check karne ke liye hai

if api_key:
    genai.configure(api_key=api_key)

app = FastAPI(title="AI-powered ATS Backend")

@app.get("/")
def read_root():
    return {"message": "AI-powered ATS Backend is running successfully!"}

@app.post("/analyze-resume")
async def analyze_resume(
    job_description: str = Form(...),
    file: UploadFile = File(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    try:
        contents = await file.read()
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
        return {"analysis": response.text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))