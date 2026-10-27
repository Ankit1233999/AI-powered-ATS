import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import api, { apiError } from "../api";

export default function Candidates() {
  const { data, isLoading, error } = useQuery({ queryKey: ["applications"], queryFn: () => api.get("/applications/manage").then(r => r.data.applications) });
  if (isLoading) return <Typography>Loading candidates…</Typography>;
  if (error) return <Alert severity="error">{apiError(error)}</Alert>;
  const items = data || [];
  return <Box><Typography variant="h5" fontWeight={800}>Candidates</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>Applicants for your job openings and their AI analysis.</Typography><Stack spacing={2}>{items.map(item => <Card key={item._id} variant="outlined"><CardContent><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}><Box><Typography variant="h6" fontWeight={800}>{item.applicant?.name}</Typography><Typography color="text.secondary">{item.applicant?.email} · {item.job?.title}</Typography></Box><Stack direction="row" spacing={1}><Chip label={item.stage} /><Chip label={item.analysis?.matchScore == null ? "Analysis pending" : `${item.analysis.matchScore}% match`} color={item.analysis?.matchScore >= 70 ? "success" : "default"} /></Stack></Stack><Typography sx={{ mt: 1.5 }}>{item.analysis?.summary || "Resume analysis is pending."}</Typography>{item.analysis?.matchedSkills?.length > 0 && <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>{item.analysis.matchedSkills.map(skill => <Chip key={skill} size="small" label={skill} color="primary" variant="outlined" />)}</Stack>}</CardContent></Card>)}</Stack>{!items.length && <Typography color="text.secondary">No applications received yet.</Typography>}</Box>;
}
