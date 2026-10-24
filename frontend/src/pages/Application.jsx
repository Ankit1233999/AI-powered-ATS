
import { useState } from "react";
import {
  Box,
  Card,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialApplications = [
  { id: 1, candidate: "Rahul Sharma", position: "Frontend Developer", date: "2026-10-10", status: "Under Review" },
  { id: 2, candidate: "Priya Singh", position: "UI/UX Designer", date: "2026-10-12", status: "Interview" },
  { id: 3, candidate: "Amit Kumar", position: "Backend Developer", date: "2026-10-14", status: "Applied" },
  { id: 4, candidate: "Sneha Gupta", position: "Full Stack Developer", date: "2026-10-15", status: "Hired" },
  { id: 5, candidate: "Rohit Verma", position: "Data Analyst", date: "2026-10-16", status: "Applied" },
  { id: 6, candidate: "Neha Sharma", position: "Frontend Developer", date: "2026-10-16", status: "Interview" },
  { id: 7, candidate: "Vikas Yadav", position: "Backend Developer", date: "2026-10-17", status: "Shortlisted" },
  { id: 8, candidate: "Pooja Meena", position: "UI/UX Designer", date: "2026-10-17", status: "Under Review" },
  { id: 9, candidate: "Arjun Singh", position: "Full Stack Developer", date: "2026-10-18", status: "Rejected" },
  { id: 10, candidate: "Anjali Jain", position: "Data Analyst", date: "2026-10-18", status: "Shortlisted" },
  { id: 11, candidate: "Karan Patel", position: "Python Developer", date: "2026-10-19", status: "Applied" },
  { id: 12, candidate: "Simran Kaur", position: "Java Developer", date: "2026-10-19", status: "Interview" },
  { id: 13, candidate: "Deepak Saini", position: "Cloud Engineer", date: "2026-10-20", status: "Hired" },
  { id: 14, candidate: "Riya Agarwal", position: "Software Engineer", date: "2026-10-20", status: "Under Review" },
  { id: 15, candidate: "Mohit Choudhary", position: "Data Scientist", date: "2026-10-20", status: "Rejected" },
  { id: 16, candidate: "Kavita Sharma", position: "QA Engineer", date: "2026-10-21", status: "Applied" },
  { id: 17, candidate: "Aakash Verma", position: "DevOps Engineer", date: "2026-10-21", status: "Shortlisted" },
  { id: 18, candidate: "Meera Joshi", position: "Machine Learning Engineer", date: "2026-10-22", status: "Interview" },
  { id: 19, candidate: "Rajat Mehta", position: "Product Designer", date: "2026-10-22", status: "Under Review" },
  { id: 20, candidate: "Isha Kapoor", position: "Mobile App Developer", date: "2026-10-23", status: "Applied" },
];

const statusColors = {
  Applied: "default",
  "Under Review": "info",
  Interview: "warning",
  Hired: "success",
  Rejected: "error",
};

export default function Applications() {
  const [applications, setApplications] = useState(initialApplications);
  const [filter, setFilter] = useState("All");

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  const updateStatus = (id, status) => {
    setApplications((previous) =>
      previous.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f6f7fb", minHeight: "100%" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#202544" }}>
        Applications
      </Typography>

      <Typography sx={{ color: "#777f96", mt: 1, mb: 3 }}>
        Track candidate applications and manage recruitment progress.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
        {[
          { label: "Total Applications", value: applications.length },
          {
            label: "Under Review",
            value: applications.filter((a) => a.status === "Under Review").length,
          },
          {
            label: "Interviews",
            value: applications.filter((a) => a.status === "Interview").length,
          },
          {
            label: "Hired",
            value: applications.filter((a) => a.status === "Hired").length,
          },
        ].map((item) => (
          <Card
            key={item.label}
            elevation={0}
            sx={{
              flex: "1 1 180px",
              p: 2.5,
              border: "1px solid #e8eaf2",
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: "#777f96", fontSize: 14 }}>
              {item.label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "#4f46e5" }}>
              {item.value}
            </Typography>
          </Card>
        ))}
      </Stack>

      <Card elevation={0} sx={{ p: 2, border: "1px solid #e8eaf2", borderRadius: 3 }}>
        <TextField
          select
          label="Filter by status"
          size="small"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          sx={{ minWidth: 220, mb: 2 }}
        >
          <MenuItem value="All">All Applications</MenuItem>
          {["Applied", "Under Review", "Interview", "Hired", "Rejected"].map(
            (status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            )
          )}
        </TextField>

        {filteredApplications.length === 0 ? (
          <Typography sx={{ p: 3, color: "#777f96" }}>
            No applications found.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {filteredApplications.map((app) => (
              <Box
                key={app.id}
                sx={{
                  p: 2,
                  border: "1px solid #eef0f6",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "#202544" }}>
                    {app.candidate}
                  </Typography>
                  <Typography sx={{ color: "#777f96", fontSize: 14, mt: 0.5 }}>
                    {app.position}
                  </Typography>
                  <Typography sx={{ color: "#777f96", fontSize: 13, mt: 0.5 }}>
                    Applied on: {app.date}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Chip
                    label={app.status}
                    color={statusColors[app.status] || "default"}
                    size="small"
                  />

                  <TextField
                    select
                    size="small"
                    label="Update status"
                    value={app.status}
                    onChange={(event) => updateStatus(app.id, event.target.value)}
                    sx={{ minWidth: 155 }}
                  >
                    {["Applied", "Under Review", "Interview", "Hired", "Rejected"].map(
                      (status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
}
