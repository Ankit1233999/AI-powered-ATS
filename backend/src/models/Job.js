import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, required: true, trim: true, maxlength: 100 },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship"], required: true },
    description: { type: String, required: true, trim: true, maxlength: 10000 },
    requirements: [{ type: String, trim: true, maxlength: 250 }],
    status: { type: String, enum: ["draft", "open", "closed"], default: "draft" },
    archivedAt: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, archivedAt: 1, createdAt: -1 });

export default mongoose.model("Job", jobSchema);
