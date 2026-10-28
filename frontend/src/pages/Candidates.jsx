import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, Card, CardContent, Chip, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import api, { apiError } from "../api";

const initialFilters = { minScore: "", skills: "", minExperience: "", stage: "", sort: "score" };
const queryFrom = (filters) => {
  const params = new URLSearchParams();
  if (filters.minScore !== "") params.set("minScore", filters.minScore);
  if (filters.skills.trim()) params.set("skills", filters.skills.trim());
  if (filters.minExperience !== "") params.set("minExperience", filters.minExperience);
  if (filters.stage) params.set("stage", filters.stage);
  if (filters.sort === "newest") params.set("sort", "newest");
  return params.toString();
};

export default function Candidates() {
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const query = queryFrom(appliedFilters);
  const { data, isLoading, error } = useQuery({ queryKey: ["candidates", query], queryFn: () => api.get(`/applications/manage${query ? `?${query}` : ""}`).then((response) => response.data.applications) });
  const update = (field) => (event) => setFilters({ ...filters, [field]: event.target.value });
  const reset = () => { setFilters(initialFilters); setAppliedFilters(initialFilters); };
  if (isLoading) return <Typography>Loading candidates…</Typography>;
  if (error) return <Alert severity="error">{apiError(error)}</Alert>;
  const items = data || [];
  return <Box>
    <Typography variant="h5" fontWeight={800}>Candidate ranking</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Rank applicants using AI match score, skills, experience, and pipeline stage.</Typography>
    <Card variant="outlined" sx={{ mb: 3 }}><CardContent>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
        <TextField label="Minimum match score" type="number" inputProps={{ min: 0, max: 100 }} value={filters.minScore} onChange={update("minScore")} sx={{ minWidth: 170 }} />
        <TextField label="Required skills" helperText="Separate skills with commas" value={filters.skills} onChange={update("skills")} sx={{ minWidth: 220 }} />
        <TextField label="Minimum experience" type="number" inputProps={{ min: 0, max: 80 }} value={filters.minExperience} onChange={update("minExperience")} sx={{ minWidth: 180 }} />
        <TextField select label="Stage" value={filters.stage} onChange={update("stage")} sx={{ minWidth: 140 }}><MenuItem value="">All stages</MenuItem><MenuItem value="applied">Applied</MenuItem><MenuItem value="interview">Interview</MenuItem><MenuItem value="offered">Offered</MenuItem></TextField>
        <TextField select label="Order" value={filters.sort} onChange={update("sort")} sx={{ minWidth: 150 }}><MenuItem value="score">Best match</MenuItem><MenuItem value="newest">Newest first</MenuItem></TextField>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}><Button variant="contained" onClick={() => setAppliedFilters(filters)}>Apply filters</Button><Button onClick={reset}>Clear</Button></Stack>
    </CardContent></Card>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{items.length} candidate{items.length === 1 ? "" : "s"} found</Typography>
    <Stack spacing={2}>{items.map((item) => <Card key={item._id} variant="outlined"><CardContent>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}><Box><Typography variant="h6" fontWeight={800}>{item.applicant?.name}</Typography><Typography color="text.secondary">{item.applicant?.email} · {item.job?.title}</Typography></Box><Stack direction="row" spacing={1}><Chip label={item.stage} /><Chip label={item.analysis?.matchScore == null ? "Analysis pending" : `${item.analysis.matchScore}% match`} color={item.analysis?.matchScore >= 70 ? "success" : "default"} /></Stack></Stack>
      <Typography sx={{ mt: 1.5 }}>{item.analysis?.summary || "Resume analysis is pending."}</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>{item.analysis?.matchedSkills?.map((skill) => <Chip key={skill} size="small" label={skill} color="primary" variant="outlined" />)}{item.analysis?.yearsExperience != null && <Chip size="small" label={`${item.analysis.yearsExperience} years experience`} />}</Stack>
      {item.analysis?.missingSkills?.length > 0 && <><Divider sx={{ my: 1.5 }} /><Typography variant="body2" color="text.secondary">Missing skills: {item.analysis.missingSkills.join(", ")}</Typography></>}
    </CardContent></Card>)}</Stack>
    {!items.length && <Typography color="text.secondary">No candidates match these filters.</Typography>}
  </Box>;
}
