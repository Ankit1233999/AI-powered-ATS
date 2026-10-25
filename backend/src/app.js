import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "100kb" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use((error, _req, res, _next) => {
  if (error.name === "ValidationError" || error.name === "MulterError") return res.status(400).json({ message: error.message });
  if (error.message === "Only PDF and DOCX resumes are accepted.") return res.status(400).json({ message: error.message });
  if (error.name === "CastError") return res.status(404).json({ message: "Resource not found." });
  console.error(error);
  res.status(500).json({ message: "An unexpected error occurred." });
});
export default app;
