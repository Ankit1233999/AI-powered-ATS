
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
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const initialCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    position: "Frontend Developer",
    status: "Applied",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "9876543211",
    position: "Backend Developer",
    status: "Interview",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "9876543212",
    position: "Full Stack Developer",
    status: "Shortlisted",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "9876543213",
    position: "UI/UX Designer",
    status: "Applied",
  },
  {
    id: 5,
    name: "Rohit Verma",
    email: "rohit@example.com",
    phone: "9876543214",
    position: "Python Developer",
    status: "Interview",
  },
  {
    id: 6,
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "9876543215",
    position: "Data Analyst",
    status: "Hired",
  },
  {
    id: 7,
    name: "Vikas Yadav",
    email: "vikas@example.com",
    phone: "9876543216",
    position: "Java Developer",
    status: "Rejected",
  },
  {
    id: 8,
    name: "Pooja Meena",
    email: "pooja@example.com",
    phone: "9876543217",
    position: "React Developer",
    status: "Shortlisted",
  },
  {
    id: 9,
    name: "Arjun Singh",
    email: "arjun@example.com",
    phone: "9876543218",
    position: "DevOps Engineer",
    status: "Applied",
  },
  {
    id: 10,
    name: "Anjali Jain",
    email: "anjali@example.com",
    phone: "9876543219",
    position: "Software Engineer",
    status: "Interview",
  },
  {
    id: 11,
    name: "Karan Patel",
    email: "karan@example.com",
    phone: "9876543220",
    position: "Node.js Developer",
    status: "Applied",
  },
  {
    id: 12,
    name: "Simran Kaur",
    email: "simran@example.com",
    phone: "9876543221",
    position: "HR Executive",
    status: "Hired",
  },
  {
    id: 13,
    name: "Deepak Saini",
    email: "deepak@example.com",
    phone: "9876543222",
    position: "MERN Stack Developer",
    status: "Shortlisted",
  },
  {
    id: 14,
    name: "Riya Agarwal",
    email: "riya@example.com",
    phone: "9876543223",
    position: "QA Tester",
    status: "Applied",
  },
  {
    id: 15,
    name: "Mohit Choudhary",
    email: "mohit@example.com",
    phone: "9876543224",
    position: "Machine Learning Engineer",
    status: "Rejected",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  status: "Applied",
};

const statusColors = {
  Applied: "default",
  Shortlisted: "info",
  Interview: "warning",
  Hired: "success",
  Rejected: "error",
};

const statusOptions = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
];

export default function Candidates() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = [
      candidate.name,
      candidate.email,
      candidate.phone,
      candidate.position,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const hiredCount = candidates.filter(
    (candidate) => candidate.status === "Hired"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  const handleOpen = (candidate = null) => {
    if (candidate) {
      setEditingId(candidate.id);
      setForm({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        status: candidate.status,
      });
    } else {
      setEditingId(null);
      setForm({ ...emptyForm });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCandidate = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      position: form.position.trim(),
    };

    if (
      !newCandidate.name ||
      !newCandidate.email ||
      !newCandidate.position
    ) {
      return;
    }

    if (editingId !== null) {
      setCandidates((previous) =>
        previous.map((candidate) =>
          candidate.id === editingId
            ? { ...candidate, ...newCandidate }
            : candidate
        )
      );
    } else {
      setCandidates((previous) => [
        ...previous,
        { ...newCandidate, id: Date.now() },
      ]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmed) return;

    setCandidates((previous) =>
      previous.filter((candidate) => candidate.id !== id)
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Page heading */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Candidates
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Manage and track your applicants.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Candidate
        </Button>
      </Stack>

      {/* Summary cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Total Candidates
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
              {candidates.length}
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Interviews
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
              {interviewCount}
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              Hired
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
              {hiredCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Search and status filter */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Search by name, email, phone, or position..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          sx={{ minWidth: { sm: 200 } }}
        >
          <MenuItem value="All">All statuses</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredCandidates.length} of {candidates.length} candidates
      </Typography>

      {/* Candidate list */}
      <Stack spacing={2}>
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <PersonSearchIcon color="action" />
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {candidate.name}
                    </Typography>

                    <Typography color="text.secondary" variant="body2">
                      {candidate.email}
                    </Typography>

                    <Typography color="text.secondary" variant="body2">
                      {candidate.phone || "Phone not provided"}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      Position: {candidate.position}
                    </Typography>

                    <Chip
                      sx={{ mt: 1 }}
                      label={candidate.status}
                      color={statusColors[candidate.status] || "default"}
                      size="small"
                    />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <IconButton
                    aria-label={`Edit ${candidate.name}`}
                    title="Edit candidate"
                    onClick={() => handleOpen(candidate)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label={`Delete ${candidate.name}`}
                    title="Delete candidate"
                    color="error"
                    onClick={() => handleDelete(candidate.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}

        {filteredCandidates.length === 0 && (
          <Card variant="outlined">
            <CardContent sx={{ py: 5, textAlign: "center" }}>
              <PersonSearchIcon
                sx={{ fontSize: 44, color: "text.secondary", mb: 1 }}
              />

              <Typography variant="h6">No candidates found</Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Try another search or change the status filter.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>

      {/* Add and edit dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            {editingId !== null ? "Edit Candidate" : "Add Candidate"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="name"
                label="Full Name"
                required
                fullWidth
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                name="phone"
                label="Phone"
                fullWidth
                value={form.phone}
                onChange={handleChange}
              />

              <TextField
                name="position"
                label="Applied Position"
                required
                fullWidth
                value={form.position}
                onChange={handleChange}
              />

              <TextField
                name="status"
                select
                label="Status"
                fullWidth
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>

            <Button type="submit" variant="contained">
              {editingId !== null ? "Save Changes" : "Add Candidate"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
