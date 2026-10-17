
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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  status: "Applied",
};

export default function Candidates() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCandidates = candidates.filter((candidate) =>
    `${candidate.name} ${candidate.email} ${candidate.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
      setForm(emptyForm);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
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
    if (!window.confirm("Delete this candidate?")) return;

    setCandidates((previous) =>
      previous.filter((candidate) => candidate.id !== id)
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
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

      <TextField
        fullWidth
        placeholder="Search by name, email, or position..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          },
        }}
        sx={{ mb: 3, maxWidth: 600 }}
      />

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {filteredCandidates.length} candidate(s)
      </Typography>

      <Stack spacing={2}>
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {candidate.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {candidate.email}
                  </Typography>
                  <Typography color="text.secondary">
                    {candidate.phone || "Phone not provided"}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    Position: {candidate.position}
                  </Typography>
                  <Chip
                    sx={{ mt: 1 }}
                    label={candidate.status}
                    color={
                      candidate.status === "Interview"
                        ? "success"
                        : candidate.status === "Shortlisted"
                          ? "info"
                          : "default"
                    }
                    size="small"
                  />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    aria-label={`Edit ${candidate.name}`}
                    onClick={() => handleOpen(candidate)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={`Delete ${candidate.name}`}
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
          <Typography color="text.secondary">
            No candidates found.
          </Typography>
        )}
      </Stack>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            {editingId !== null ? "Edit Candidate" : "Add Candidate"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Full Name"
                required
                fullWidth
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />

              <TextField
                label="Email"
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />

              <TextField
                label="Phone"
                fullWidth
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />

              <TextField
                label="Applied Position"
                required
                fullWidth
                value={form.position}
                onChange={(event) =>
                  setForm({ ...form, position: event.target.value })
                }
              />

              <TextField
                select
                label="Status"
                fullWidth
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Hired">Hired</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
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
