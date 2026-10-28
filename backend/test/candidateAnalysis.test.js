import test from "node:test";
import assert from "node:assert/strict";
import { analyzeCandidate } from "../src/services/candidateAnalysis.js";

test("fallback analysis scores matching skills and extracts years of experience", async () => {
  const priorKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const result = await analyzeCandidate({ job: { description: "Build services", requirements: ["JavaScript", "MongoDB", "AWS"] }, resumeText: "JavaScript developer with 6 years of experience building MongoDB services." });
  if (priorKey) process.env.OPENAI_API_KEY = priorKey;
  assert.equal(result.provider, "heuristic");
  assert.equal(result.yearsExperience, 6);
  assert.deepEqual(result.matchedSkills, ["JavaScript", "MongoDB"]);
  assert.equal(result.matchScore, 78);
});
