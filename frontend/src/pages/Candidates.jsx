
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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const initialCandidates = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", position: "Frontend Developer", status: "Applied" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "9876543211", position: "Backend Developer", status: "Interview" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "9876543212", position: "Full Stack Developer", status: "Shortlisted" },
  { id: 4, name: "Sneha Gupta", email: "sneha@example.com", phone: "9876543213", position: "UI/UX Designer", status: "Applied" },
  { id: 5, name: "Rohit Verma", email: "rohit@example.com", phone: "9876543214", position: "Python Developer", status: "Interview" },
  { id: 6, name: "Neha Sharma", email: "neha@example.com", phone: "9876543215", position: "Data Analyst", status: "Hired" },
  { id: 7, name: "Vikas Yadav", email: "vikas@example.com", phone: "9876543216", position: "Java Developer", status: "Rejected" },
  { id: 8, name: "Pooja Meena", email: "pooja@example.com", phone: "9876543217", position: "React Developer", status: "Shortlisted" },
  { id: 9, name: "Arjun Singh", email: "arjun@example.com", phone: "9876543218", position: "DevOps Engineer", status: "Applied" },
  { id: 10, name: "Anjali Jain", email: "anjali@example.com", phone: "9876543219", position: "Software Engineer", status: "Interview" },
  { id: 11, name: "Karan Patel", email: "karan@example.com", phone: "9876543220", position: "Node.js Developer", status: "Applied" },
  { id: 12, name: "Simran Kaur", email: "simran@example.com", phone: "9876543221", position: "HR Executive", status: "Hired" },
  { id: 13, name: "Deepak Saini", email: "deepak@example.com", phone: "9876543222", position: "MERN Stack Developer", status: "Shortlisted" },
  { id: 14, name: "Riya Agarwal", email: "riya@example.com", phone: "9876543223", position: "QA Tester", status: "Applied" },
  { id: 15, name: "Mohit Choudhary", email: "mohit@example.com", phone: "9876543224", position: "Machine Learning Engineer", status: "Rejected" },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  status: "Applied",
};

const statusOptions = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
];

const statusColors = {
  Applied: "default",
  Shortlisted: "info",
  Interview: "warning",
  Hired: "success",
  Rejected: "error",
};

export default function Candidates() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });

  const hiredCount = candidates.filter(
    (candidate) => candidate.status === "Hired"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  const shortlistedCount = candidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;

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
    if (
      !window.confirm("Are you sure you want to delete this candidate?")
    ) {
      return;
    }

    setCandidates((previous) =>
      previous.filter((candidate) => candidate.id !== id)
    );
  };

  const summaryCards = [
    {
      title: "Total Candidates",
      value: candidates.length,
      icon: <PersonSearchIcon />,
      color: "#4f46e5",
      background: "#eef2ff",
    },
    {
      title: "Interviews",
      value: interviewCount,
      icon: <WorkOutlineIcon />,
      color: "#b45309",
      background: "#fef3c7",
    },
    {
      title: "Shortlisted",
      value: shortlistedCount,
      icon: <PersonSearchIcon />,
      color: "#0369a1",
      background: "#e0f2fe",
    },
    {
      title: "Hired",
      value: hiredCount,
      icon: <WorkOutlineIcon />,
      color: "#15803d",
      background: "#dcfce7",
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        width: "100%",
        maxWidth: 1600,
        mx: "auto",
      }}
    >
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
            Candidates
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Manage, review, and track your applicants.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            alignSelf: { xs: "flex-start", sm: "auto" },
            px: 2.5,
            py: 1.2,
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#3730a3" },
          }}
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
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {summaryCards.map((item) => (
          <Card
            key={item.title}
            variant="outlined"
            sx={{
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
        ))}
      </Box>

      {/* Search and filter */}
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
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search name, email, phone, or position..."
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
            label="Application Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: { md: 200 } }}
          >
            <MenuItem value="All">All statuses</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Card>

      {/* Candidate list heading */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography fontWeight={700} sx={{ color: "#172033" }}>
          All Candidates
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {filteredCandidates.length} of {candidates.length} candidates
        </Typography>
      </Stack>

      {/* Candidate cards */}
      <Stack spacing={2}>
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            variant="outlined"
            sx={{
              borderRadius: "16px",
              borderColor: "#e5eaf2",
              bgcolor: "#ffffff",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#c7d2fe",
                boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  sx={{ minWidth: 0 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: "14px",
                      bgcolor: "#eef2ff",
                      color: "#4f46e5",
                    }}
                  >
                    <PersonSearchIcon />
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 750,
                        color: "#172033",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {candidate.name}
                    </Typography>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={{ xs: 0.5, md: 2 }}
                      sx={{ mt: 0.75 }}
                    >
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <MailOutlineIcon
                          sx={{ fontSize: 17, color: "#667085" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ overflowWrap: "anywhere" }}
                        >
                          {candidate.email}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <PhoneOutlinedIcon
                          sx={{ fontSize: 17, color: "#667085" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {candidate.phone || "Phone not provided"}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1.5 }}
                    >
                      <WorkOutlineIcon
                        sx={{ fontSize: 18, color: "#667085" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {candidate.position}
                      </Typography>
                    </Stack>

                    <Chip
                      label={candidate.status}
                      color={statusColors[candidate.status] || "default"}
                      size="small"
                      sx={{ mt: 1.5, fontWeight: 700 }}
                    />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(candidate)}
                    sx={{
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
                    aria-label={`Delete ${candidate.name}`}
                    title="Delete candidate"
                    color="error"
                    onClick={() => handleDelete(candidate.id)}
                    sx={{
                      border: "1px solid #fee2e2",
                      borderRadius: "8px",
                      "&:hover": { bgcolor: "#fef2f2" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}

        {filteredCandidates.length === 0 && (
          <Card
            variant="outlined"
            sx={{
              py: 6,
              px: 2,
              textAlign: "center",
              borderRadius: "16px",
              borderColor: "#e5eaf2",
            }}
          >
            <PersonSearchIcon
              sx={{ fontSize: 46, color: "#a5b4fc", mb: 1 }}
            />

            <Typography variant="h6" fontWeight={700}>
              No candidates found
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Try another search or change the status filter.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </Stack>

      {/* Add and edit candidate dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "18px" } }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
            {editingId !== null ? "Edit Candidate" : "Add Candidate"}
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, mt: 0.5 }}
            >
              Enter the applicant's information below.
            </Typography>

            <Stack spacing={2}>
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
                label="Email Address"
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                name="phone"
                label="Phone Number"
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
                label="Application Status"
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

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={handleClose} color="inherit">
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
              {editingId !== null ? "Save Changes" : "Add Candidate"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
