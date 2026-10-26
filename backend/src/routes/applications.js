import { Router } from "express";
import crypto from "node:crypto";
import Application, { PIPELINE_STAGES } from "../models/Application.js";
import Job from "../models/Job.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { resumeUpload } from "../middleware/upload.js";
import { getResumeDownloadUrl, storeResume } from "../config/storage.js";
import { extractResumeText } from "../services/resumeParser.js";
import { analyzeCandidate } from "../services/candidateAnalysis.js";

const router = Router();
const extension = (name) => name.includes(".") ? name.slice(name.lastIndexOf(".")).toLowerCase() : "";
const upload = (req, res) => new Promise((resolve, reject) => resumeUpload(req, res, (error) => error ? reject(error) : resolve()));

router.post("/", requireAuth, requireRole("applicant"), async (req, res, next) => {
  try {
    await upload(req, res);
    const { jobId, coverLetter = "" } = req.body;
    if (!jobId || !req.file) return res.status(400).json({ message: "A job and resume are required." });
    const job = await Job.findOne({ _id: jobId, status: "open", archivedAt: null });
    if (!job) return res.status(404).json({ message: "This job is not available for applications." });
    if (await Application.exists({ job: job.id, applicant: req.user.id })) return res.status(409).json({ message: "You have already applied for this job." });
    const key = `resumes/${job.id}/${req.user.id}/${crypto.randomUUID()}${extension(req.file.originalname)}`;
    await storeResume({ key, body: req.file.buffer, contentType: req.file.mimetype });
    let resumeText = "";
    let analysis = { status: "pending" };
    try {
      resumeText = await extractResumeText(req.file);
      const result = await analyzeCandidate({ job, resumeText });
      analysis = { status: "completed", ...result, analyzedAt: new Date(), error: result.analysisWarning || "" };
    } catch (analysisError) {
      analysis = { status: "failed", error: analysisError.message };
    }
    const application = await Application.create({
      job: job.id, applicant: req.user.id, coverLetter,
      resume: { key, originalName: req.file.originalname, contentType: req.file.mimetype, size: req.file.size },
      resumeText, analysis,
      statusHistory: [{ stage: "applied", changedBy: req.user.id }],
    });
    res.status(201).json({ application });
  } catch (error) { next(error); }
});

router.get("/mine", requireAuth, requireRole("applicant"), async (req, res, next) => {
  try { res.json({ applications: await Application.find({ applicant: req.user.id }).populate("job", "title department location employmentType").sort({ createdAt: -1 }) }); } catch (error) { next(error); }
});

router.get("/manage", requireAuth, requireRole("recruiter"), async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id }).select("_id");
    const query = { job: { $in: jobs.map((job) => job.id) } };
    if (req.query.jobId) query.job = req.query.jobId;
    if (req.query.stage && PIPELINE_STAGES.includes(req.query.stage)) query.stage = req.query.stage;
    const applications = await Application.find(query).populate("applicant", "name email").populate("job", "title department").sort({ createdAt: -1 });
    res.json({ applications, stages: PIPELINE_STAGES });
  } catch (error) { next(error); }
});

router.patch("/:id/stage", requireAuth, requireRole("recruiter"), async (req, res, next) => {
  try {
    const { stage } = req.body;
    if (!PIPELINE_STAGES.includes(stage)) return res.status(400).json({ message: "Invalid pipeline stage." });
    const application = await Application.findById(req.params.id).populate("job", "createdBy");
    if (!application || application.job.createdBy.toString() !== req.user.id) return res.status(404).json({ message: "Application not found." });
    if (application.stage !== stage) { application.stage = stage; application.statusHistory.push({ stage, changedBy: req.user.id }); await application.save(); }
    res.json({ application });
  } catch (error) { next(error); }
});

router.post("/:id/analyze", requireAuth, requireRole("recruiter"), async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).select("+resumeText").populate("job");
    if (!application || application.job.createdBy.toString() !== req.user.id) return res.status(404).json({ message: "Application not found." });
    if (!application.resumeText) return res.status(422).json({ message: "This resume has no readable text to analyze." });
    const result = await analyzeCandidate({ job: application.job, resumeText: application.resumeText });
    application.analysis = { status: "completed", ...result, analyzedAt: new Date(), error: result.analysisWarning || "" };
    await application.save();
    res.json({ analysis: application.analysis });
  } catch (error) { next(error); }
});

router.get("/:id/resume", requireAuth, async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate("job", "createdBy");
    if (!application) return res.status(404).json({ message: "Application not found." });
    const isOwner = application.applicant.toString() === req.user.id;
    const isRecruiter = req.user.role === "recruiter" && application.job.createdBy.toString() === req.user.id;
    if (!isOwner && !isRecruiter) return res.status(403).json({ message: "You do not have permission for this resume." });
    res.json({ url: await getResumeDownloadUrl(application.resume.key), expiresInSeconds: 300 });
  } catch (error) { next(error); }
});
export default router;
