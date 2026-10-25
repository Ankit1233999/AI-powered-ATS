import multer from "multer";
const allowed = new Set(["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
export const resumeUpload = multer({
  storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => callback(allowed.has(file.mimetype) ? null : new Error("Only PDF and DOCX resumes are accepted."), allowed.has(file.mimetype)),
}).single("resume");
