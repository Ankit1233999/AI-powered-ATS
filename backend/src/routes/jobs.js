import { Router } from "express";
import Job from "../models/Job.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
const allowedFields = ["title", "department", "location", "employmentType", "description", "requirements", "status"];
const pickJobFields = (body) => Object.fromEntries(allowedFields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
const validateJob = (job) => {
  const required = ["title", "department", "location", "employmentType", "description"];
  return required.find((field) => !job[field] || (typeof job[field] === "string" && !job[field].trim()));
};

router.get("/", async (req, res, next) => {
  try {
    const query = { status: "open", archivedAt: null };
    if (req.query.location) query.location = new RegExp(req.query.location, "i");
    if (req.query.department) query.department = new RegExp(req.query.department, "i");
    res.json({ jobs: await Job.find(query).sort({ createdAt: -1 }).populate("createdBy", "name") });
  } catch (error) { next(error); }
});

router.use(requireAuth, requireRole("recruiter"));
router.get("/manage", async (req, res, next) => {
  try { res.json({ jobs: await Job.find({ createdBy: req.user.id }).sort({ createdAt: -1 }) }); } catch (error) { next(error); }
});
router.post("/manage", async (req, res, next) => {
  try {
    const values = pickJobFields(req.body);
    const missing = validateJob(values);
    if (missing) return res.status(400).json({ message: `${missing} is required.` });
    const job = await Job.create({ ...values, createdBy: req.user.id });
    res.status(201).json({ job });
  } catch (error) { next(error); }
});
router.patch("/manage/:id", async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!job) return res.status(404).json({ message: "Job not found." });
    Object.assign(job, pickJobFields(req.body));
    const missing = validateJob(job);
    if (missing) return res.status(400).json({ message: `${missing} is required.` });
    await job.save();
    res.json({ job });
  } catch (error) { next(error); }
});
router.delete("/manage/:id", async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, createdBy: req.user.id, archivedAt: null }, { archivedAt: new Date(), status: "closed" }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job archived.", job });
  } catch (error) { next(error); }
});
export default router;
