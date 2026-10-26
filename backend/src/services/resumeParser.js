import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const MAX_TEXT_LENGTH = 40_000;

export async function extractResumeText(file) {
  let text = "";
  if (file.mimetype === "application/pdf") {
    const parser = new PDFParse({ data: file.buffer });
    try { text = (await parser.getText()).text; } finally { await parser.destroy(); }
  } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    text = (await mammoth.extractRawText({ buffer: file.buffer })).value;
  } else {
    throw new Error("Only PDF and DOCX resumes are supported for analysis.");
  }
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) throw new Error("No readable text was found in the resume.");
  return normalized.slice(0, MAX_TEXT_LENGTH);
}
