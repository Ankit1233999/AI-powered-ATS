const MAX_JOB_TEXT = 14_000;
const MAX_RESUME_TEXT = 24_000;

const cleanList = (value) => Array.isArray(value) ? [...new Set(value.map((item) => String(item).trim()).filter(Boolean))].slice(0, 20) : [];
const clampScore = (value) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
const yearsOfExperience = (text) => {
  const matches = [...text.matchAll(/\b(\d{1,2})(?:\s*\+)?\s*(?:years?|yrs?)\b/gi)].map((match) => Number(match[1]));
  return matches.length ? Math.max(...matches) : null;
};
const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const includesSkill = (text, skill) => {
  const normalized = String(skill).trim();
  if (!normalized) return false;
  return new RegExp(`(^|[^a-z0-9])${escapePattern(normalized)}(?=$|[^a-z0-9])`, "i").test(text);
};

function heuristicAnalysis({ job, resumeText }) {
  const searchable = `${job.description} ${(job.requirements || []).join(" ")}`.toLowerCase();
  const resume = resumeText.toLowerCase();
  const requirements = cleanList(job.requirements?.length ? job.requirements : searchable.match(/[a-z][a-z+#.]{1,}/g) || []).slice(0, 20);
  const matchedSkills = requirements.filter((skill) => includesSkill(resume, skill));
  const missingSkills = requirements.filter((skill) => !includesSkill(resume, skill)).slice(0, 8);
  const yearsExperience = yearsOfExperience(resumeText);
  const hasExperience = yearsExperience !== null;
  const score = requirements.length ? 30 + (matchedSkills.length / requirements.length) * 65 + (hasExperience ? 5 : 0) : 50;
  return {
    provider: "heuristic",
    matchScore: clampScore(score),
    summary: matchedSkills.length ? `The resume matches ${matchedSkills.length} listed job requirement${matchedSkills.length === 1 ? "" : "s"}. Review the highlighted experience before progressing the candidate.` : "No explicit skill overlap was detected automatically. Review the resume manually.",
    matchedSkills, missingSkills,
    yearsExperience,
    experienceHighlights: hasExperience ? ["Resume includes a stated duration of experience."] : [],
  };
}

async function openAiAnalysis({ job, resumeText }) {
  const prompt = `Evaluate this candidate strictly against the job. Return JSON only with matchScore (0-100), summary, matchedSkills, missingSkills, experienceHighlights, yearsExperience (number or null). Do not infer facts not stated.\n\nJOB TITLE: ${job.title}\nJOB DESCRIPTION: ${(job.description || "").slice(0, MAX_JOB_TEXT)}\nREQUIREMENTS: ${(job.requirements || []).join(", ")}\n\nRESUME: ${resumeText.slice(0, MAX_RESUME_TEXT)}`;
  const response = await fetch(process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.1, response_format: { type: "json_object" }, messages: [{ role: "system", content: "You are an objective recruiting assistant. Return only valid JSON." }, { role: "user", content: prompt }] }),
  });
  if (!response.ok) throw new Error(`AI provider request failed (${response.status}).`);
  const payload = await response.json();
  const result = JSON.parse(payload.choices?.[0]?.message?.content || "{}");
  return { provider: "openai", matchScore: clampScore(result.matchScore), summary: String(result.summary || "Analysis completed.").slice(0, 2000), matchedSkills: cleanList(result.matchedSkills), missingSkills: cleanList(result.missingSkills), experienceHighlights: cleanList(result.experienceHighlights), yearsExperience: Number.isFinite(Number(result.yearsExperience)) ? Math.max(0, Math.min(80, Number(result.yearsExperience))) : null };
}

export async function analyzeCandidate(input) {
  if (!process.env.OPENAI_API_KEY) return heuristicAnalysis(input);
  try { return await openAiAnalysis(input); } catch (error) { return { ...heuristicAnalysis(input), provider: "heuristic-fallback", analysisWarning: error.message }; }
}
