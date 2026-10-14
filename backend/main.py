import os
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pypdf2

app = FastAPI(title="AI-Powered ATS Backend", version="1.0")

# CORS middleware add kar rahe hain taaki frontend se requests easily aa sakein
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Aap baad mein frontend ka specific URL de sakti hain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
  return {"message": "Welcome to AI-Powered ATS Backend API!"}


def extract_text_from_pdf(file: UploadFile) -> str:
  """Uploaded PDF file se text extract karne ka function"""
  reader = pypdf2.PdfReader(file.file)
  text = ""
  for page in reader.pages:
    text += page.extract_text() or ""
  return text


@app.post("/api/analyze")
async def analyze_resume(
    job_description: str = Form(...), resume: UploadFile = File(...)
):
  # 1. PDF se text extract karo
  resume_text = extract_text_from_pdf(resume)

  # Yahan hum baad mein Google Gemini API integrate karenge
  # Jo resume text aur job description ko compare karke score aur feedback dega.

  return {
      "status": "success",
      "filename": resume.filename,
      "extracted_text_preview": resume_text[
          :300
      ],  # Sirf shuru ka text check karne ke liye
      "message": (
          "Resume uploaded successfully! Gemini API integration pending."
      ),
  }