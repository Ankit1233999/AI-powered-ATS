
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";


const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Jaipur",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 3,
    title: "HR Executive",
    department: "Human Resources",
    location: "Jaipur",
    type: "Internship",
    status: "Closed",
  },
  {
    id: 4,
    title: "React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Internship",
    status: "Open",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Jaipur",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 6,
    title: "Data Analyst",
    department: "Analytics",
    location: "Hybrid",
    type: "Full-time",
    status: "Closed",
  },
  {
    id: 7,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 8,
    title: "Python Developer",
    department: "Engineering",
    location: "Jaipur",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 9,
    title: "Java Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 10,
    title: "Software Tester",
    department: "Quality Assurance",
    location: "Jaipur",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 11,
    title: "DevOps Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 12,
    title: "Machine Learning Engineer",
    department: "Artificial Intelligence",
    location: "Hybrid",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 13,
    title: "AI Engineer Intern",
    department: "Artificial Intelligence",
    location: "Jaipur",
    type: "Internship",
    status: "Open",
  },
  {
    id: 14,
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 15,
    title: "Product Manager",
    department: "Product",
    location: "Hybrid",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 16,
    title: "Business Analyst",
    department: "Business",
    location: "Jaipur",
    type: "Full-time",
    status: "Open",
  },
  {
    id: 17,
    title: "Graphic Designer",
    department: "Design",
    location: "Remote",
    type: "Part-time",
    status: "Open",
  },
  {
    id: 18,
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Jaipur",
    type: "Internship",
    status: "Open",
  },
  {
    id: 19,
    title: "Database Administrator",
    department: "Database",
    location: "Hybrid",
    type: "Full-time",
    status: "Closed",
  },
  {
    id: 20,
    title: "Technical Support Engineer",
    department: "IT Support",
    location: "Jaipur",
    type: "Contract",
    status: "Open",
  },
];


const emptyForm = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  status: "Open",
};

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];

const jobStatuses = ["Open", "Closed"];

export default function Jobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });

  const openJobs = jobs.filter((job) => job.status === "Open").length;
  const closedJobs = jobs.filter((job) => job.status === "Closed").length;

  const filteredJobs = jobs.filter((job) => {
    const searchText = [
      job.title,
      job.department,
      job.location,
      job.type,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;
    const matchesType = typeFilter === "All" || job.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleOpenForm = (job = null) => {
    if (job) {
      setEditingId(job.id);
      setForm({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        status: job.status,
      });
    } else {
      setEditingId(null);
      setForm({ ...emptyForm });
    }

    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newJob = {
      ...form,
      title: form.title.trim(),
      department: form.department.trim(),
      location: form.location.trim(),
    };

    if (!newJob.title || !newJob.department || !newJob.location) {
      return;
    }

    if (editingId !== null) {
      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job.id === editingId ? { ...job, ...newJob } : job
        )
      );
    } else {
      setJobs((previousJobs) => [
        ...previousJobs,
        { ...newJob, id: Date.now() },
      ]);
    }

    handleCloseForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    setJobs((previousJobs) =>
      previousJobs.filter((job) => job.id !== id)
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: "100%", maxWidth: 1600, mx: "auto" }}>
      {/* Page heading */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#172033",
              letterSpacing: "-0.8px",
              fontSize: { xs: "1.65rem", sm: "2rem" },
            }}
          >
            Job Management
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Create, organize, and manage your job openings.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
          sx={{
            alignSelf: { xs: "flex-start", sm: "auto" },
            px: 2.5,
            py: 1.2,
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#3730a3" },
          }}
        >
          Add New Job
        </Button>
      </Stack>

      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: "Total Jobs",
            value: jobs.length,
            icon: <WorkIcon />,
            color: "#4f46e5",
            background: "#eef2ff",
          },
          {
            title: "Open Positions",
            value: openJobs,
            icon: <BusinessCenterOutlinedIcon />,
            color: "#15803d",
            background: "#dcfce7",
          },
          {
            title: "Closed Positions",
            value: closedJobs,
            icon: <WorkIcon />,
            color: "#b45309",
            background: "#fef3c7",
          },
        ].map((item) => (
          <Grid item xs={12} sm={4} key={item.title}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: "16px",
                borderColor: "#e5eaf2",
                boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
              }}
            >
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{ mt: 1, fontWeight: 800, color: "#172033" }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      bgcolor: item.background,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search and filters */}
      <Card
        variant="outlined"
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 3,
          borderRadius: "16px",
          borderColor: "#e5eaf2",
          boxShadow: "0 2px 8px rgba(15,23,42,0.03)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >
          <TextField
            fullWidth
            placeholder="Search by title, department, or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#667085" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            label="Job Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: { md: 165 } }}
          >
            <MenuItem value="All">All statuses</MenuItem>
            {jobStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Employment Type"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            sx={{ minWidth: { md: 190 } }}
          >
            <MenuItem value="All">All types</MenuItem>
            {employmentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Card>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography fontWeight={700} sx={{ color: "#172033" }}>
          All Job Openings
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {filteredJobs.length} of {jobs.length} jobs
        </Typography>
      </Stack>

      {/* Job cards */}
      <Grid container spacing={2.5}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} lg={4} key={job.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: "16px",
                borderColor: "#e5eaf2",
                bgcolor: "#ffffff",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "#c7d2fe",
                  boxShadow: "0 10px 25px rgba(15,23,42,0.07)",
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      bgcolor: "#eef2ff",
                      color: "#4f46e5",
                    }}
                  >
                    <WorkIcon />
                  </Box>

                  <Chip
                    label={job.status}
                    color={job.status === "Open" ? "success" : "default"}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Stack>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 2.5,
                    fontWeight: 750,
                    color: "#172033",
                    overflowWrap: "anywhere",
                  }}
                >
                  {job.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 0.75, fontSize: 13 }}
                >
                  {job.department}
                </Typography>

                <Stack spacing={1.25} sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnOutlinedIcon
                      sx={{ fontSize: 18, color: "#667085" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <BusinessCenterOutlinedIcon
                      sx={{ fontSize: 18, color: "#667085" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {job.type}
                    </Typography>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    borderTop: "1px solid #e5eaf2",
                    mt: 2.5,
                    pt: 2,
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenForm(job)}
                      sx={{
                        flex: 1,
                        borderColor: "#dce3ee",
                        color: "#4f46e5",
                        "&:hover": {
                          borderColor: "#4f46e5",
                          bgcolor: "#eef2ff",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <IconButton
                      aria-label={`Delete ${job.title}`}
                      title="Delete job"
                      color="error"
                      onClick={() => handleDelete(job.id)}
                      sx={{
                        border: "1px solid #fee2e2",
                        borderRadius: "8px",
                        "&:hover": { bgcolor: "#fef2f2" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty search result */}
      {filteredJobs.length === 0 && (
        <Card
          variant="outlined"
          sx={{
            mt: 2,
            py: 6,
            px: 2,
            textAlign: "center",
            borderRadius: "16px",
            borderColor: "#e5eaf2",
          }}
        >
          <WorkIcon sx={{ fontSize: 44, color: "#a5b4fc", mb: 1 }} />

          <Typography variant="h6" fontWeight={700}>
            No jobs found
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Try another search or change the filters.
          </Typography>

          <Button
            sx={{ mt: 2 }}
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setTypeFilter("All");
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}

      {/* Create and edit job dialog */}
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "18px" },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
            {editingId !== null ? "Edit Job" : "Create New Job"}
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, mt: 0.5 }}
            >
              Enter the details for this job opening.
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Job Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                select
                label="Employment Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
              >
                {employmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                {jobStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={handleCloseForm} color="inherit">
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={editingId === null ? <AddIcon /> : <EditIcon />}
              sx={{
                px: 2.5,
                bgcolor: "#4f46e5",
                "&:hover": { bgcolor: "#3730a3" },
              }}
            >
              {editingId !== null ? "Save Changes" : "Create Job"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
