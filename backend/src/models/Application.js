import mongoose from "mongoose";

export const PIPELINE_STAGES = ["applied", "interview", "offered"];

const statusHistorySchema = new mongoose.Schema({
  stage: { type: String, enum: PIPELINE_STAGES, required: true },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { _id: false });

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stage: { type: String, enum: PIPELINE_STAGES, default: "applied", required: true },
  resume: {
    key: { type: String, required: true }, originalName: { type: String, required: true },
    contentType: { type: String, required: true }, size: { type: Number, required: true },
  },
  coverLetter: { type: String, trim: true, maxlength: 4000, default: "" },
  statusHistory: { type: [statusHistorySchema], default: [] },
}, { timestamps: true });

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ job: 1, stage: 1, createdAt: -1 });
applicationSchema.index({ applicant: 1, createdAt: -1 });
export default mongoose.model("Application", applicationSchema);
