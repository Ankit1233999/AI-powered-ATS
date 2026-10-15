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
];

const emptyForm = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  status: "Open",
};

export default function Jobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.department} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
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
      setForm(emptyForm);
    }

    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.department.trim() ||
      !form.location.trim()
    ) {
      return;
    }

    if (editingId !== null) {
      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job.id === editingId ? { ...job, ...form } : job
        )
      );
    } else {
      setJobs((previousJobs) => [
        ...previousJobs,
        {
          ...form,
          id: Date.now(),
        },
      ]);
    }

    handleCloseForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (confirmed) {
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Job Management
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create and manage your job openings.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Add New Job
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search by job title, department, or location..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1, color: "gray" }} />,
          },
        }}
        sx={{ mb: 3, maxWidth: 600 }}
      />

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {filteredJobs.length} job(s) found
      </Typography>

      <Grid container spacing={2}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} lg={4} key={job.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 3,
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Box
                    sx={{
                      backgroundColor: "#e8eafc",
                      color: "#3949ab",
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <WorkIcon />
                  </Box>

                  <Chip
                    label={job.status}
                    color={job.status === "Open" ? "success" : "default"}
                    size="small"
                  />
                </Stack>

                <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                  {job.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {job.department}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Location: {job.location}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Type: {job.type}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenForm(job)}
                  >
                    Edit
                  </Button>

                  <IconButton
                    aria-label={`Delete ${job.title}`}
                    color="error"
                    onClick={() => handleDelete(job.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          No jobs found. Try another search or create a new job.
        </Typography>
      )}

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            {editingId !== null ? "Edit Job" : "Create New Job"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
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
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </TextField>

              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseForm}>Cancel</Button>

            <Button type="submit" variant="contained">
              {editingId !== null ? "Save Changes" : "Create Job"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}