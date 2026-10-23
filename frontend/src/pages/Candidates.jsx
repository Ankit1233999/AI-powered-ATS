
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
import EmailIcon from "@mui/icons-material/Email";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WorkIcon from "@mui/icons-material/Work";

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

const initialCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    position: "Frontend Developer",
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "9876543211",
    position: "UI/UX Designer",
    status: "Interview",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "9876543212",
    position: "Backend Developer",
    status: "Applied",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "9876543213",
    position: "Full Stack Developer",
    status: "Hired",
  },
  {
    id: 5,
    name: "Rohit Verma",
    email: "rohit@example.com",
    phone: "9876543214",
    position: "Data Analyst",
    status: "Applied",
  },
  {
    id: 6,
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "9876543215",
    position: "Frontend Developer",
    status: "Interview",
  },
  {
    id: 7,
    name: "Vikas Yadav",
    email: "vikas@example.com",
    phone: "9876543216",
    position: "Backend Developer",
    status: "Shortlisted",
  },
  {
    id: 8,
    name: "Pooja Meena",
    email: "pooja@example.com",
    phone: "9876543217",
    position: "UI/UX Designer",
    status: "Applied",
  },
  {
    id: 9,
    name: "Arjun Singh",
    email: "arjun@example.com",
    phone: "9876543218",
    position: "Full Stack Developer",
    status: "Rejected",
  },
  {
    id: 10,
    name: "Anjali Jain",
    email: "anjali@example.com",
    phone: "9876543219",
    position: "Data Analyst",
    status: "Shortlisted",
  },
  {
    id: 11,
    name: "Karan Patel",
    email: "karan@example.com",
    phone: "9876543220",
    position: "Frontend Developer",
    status: "Applied",
  },
  {
    id: 12,
    name: "Simran Kaur",
    email: "simran@example.com",
    phone: "9876543221",
    position: "UI/UX Designer",
    status: "Interview",
  },
  {
    id: 13,
    name: "Deepak Saini",
    email: "deepak@example.com",
    phone: "9876543222",
    position: "Backend Developer",
    status: "Hired",
  },
  {
    id: 14,
    name: "Riya Agarwal",
    email: "riya@example.com",
    phone: "9876543223",
    position: "Full Stack Developer",
    status: "Applied",
  },
  {
    id: 15,
    name: "Mohit Choudhary",
    email: "mohit@example.com",
    phone: "9876543224",
    position: "Data Analyst",
    status: "Rejected",
  },
  
  {
    id: 16,
    name: "Kavita Sharma",
    email: "kavita.sharma@example.com",
    phone: "9876543225",
    position: "Python Developer",
    status: "Shortlisted",
  },
  {
    id: 17,
    name: "Aakash Verma",
    email: "aakash.verma@example.com",
    phone: "9876543226",
    position: "DevOps Engineer",
    status: "Interview",
  },
  {
    id: 18,
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "9876543227",
    position: "Data Scientist",
    status: "Applied",
  },
  {
    id: 19,
    name: "Rajat Mehta",
    email: "rajat.mehta@example.com",
    phone: "9876543228",
    position: "Java Developer",
    status: "Shortlisted",
  },
  {
    id: 20,
    name: "Isha Kapoor",
    email: "isha.kapoor@example.com",
    phone: "9876543229",
    position: "Product Designer",
    status: "Interview",
  },
  {
    id: 21,
    name: "Nikhil Gupta",
    email: "nikhil.gupta@example.com",
    phone: "9876543230",
    position: "Cloud Engineer",
    status: "Applied",
  },
  {
    id: 22,
    name: "Divya Rathore",
    email: "divya.rathore@example.com",
    phone: "9876543231",
    position: "QA Engineer",
    status: "Hired",
  },
  {
    id: 23,
    name: "Saurabh Mishra",
    email: "saurabh.mishra@example.com",
    phone: "9876543232",
    position: "Machine Learning Engineer",
    status: "Shortlisted",
  },
  {
    id: 24,
    name: "Tanvi Agarwal",
    email: "tanvi.agarwal@example.com",
    phone: "9876543233",
    position: "Business Analyst",
    status: "Applied",
  },
  {
    id: 25,
    name: "Manish Yadav",
    email: "manish.yadav@example.com",
    phone: "9876543234",
    position: "Cybersecurity Analyst",
    status: "Interview",
  },
  {
    id: 26,
    name: "Pallavi Singh",
    email: "pallavi.singh@example.com",
    phone: "9876543235",
    position: "React Developer",
    status: "Applied",
  },
  {
    id: 27,
    name: "Aditya Jain",
    email: "aditya.jain@example.com",
    phone: "9876543236",
    position: "Software Engineer",
    status: "Hired",
  },
  {
    id: 28,
    name: "Nisha Kumari",
    email: "nisha.kumari@example.com",
    phone: "9876543237",
    position: "HR Executive",
    status: "Rejected",
  },
  {
    id: 29,
    name: "Varun Bansal",
    email: "varun.bansal@example.com",
    phone: "9876543238",
    position: "Database Administrator",
    status: "Shortlisted",
  },
  {
    id: 30,
    name: "Sakshi Choudhary",
    email: "sakshi.choudhary@example.com",
    phone: "9876543239",
    position: "Mobile App Developer",
    status: "Applied",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  status: "Applied",
};

const pageSx = {
  width: "100%",
  minHeight: "100%",
  p: { xs: 2, md: 3 },
  backgroundColor: "#f6f7fb",
  boxSizing: "border-box",
};

const Candidates = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const totalCandidates = candidates.length;
  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;
  const shortlistedCount = candidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;
  const hiredCount = candidates.filter(
    (candidate) => candidate.status === "Hired"
  ).length;

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      candidate.name.toLowerCase().includes(searchText) ||
      candidate.email.toLowerCase().includes(searchText) ||
      candidate.position.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setOpen(true);
  };

  const handleOpenEdit = (candidate) => {
    setEditingId(candidate.id);
    setForm({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      status: candidate.status,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.position.trim()
    ) {
      return;
    }

    if (editingId !== null) {
      setCandidates((previous) =>
        previous.map((candidate) =>
          candidate.id === editingId
            ? { ...candidate, ...form }
            : candidate
        )
      );
    } else {
      setCandidates((previous) => [
        {
          id: Date.now(),
          ...form,
        },
        ...previous,
      ]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (confirmed) {
      setCandidates((previous) =>
        previous.filter((candidate) => candidate.id !== id)
      );
    }
  };

  return (
    <Box sx={pageSx}>
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
            sx={{ fontWeight: 800, color: "#202544", mb: 0.5 }}
          >
            Candidates
          </Typography>
          <Typography sx={{ color: "#777f96" }}>
            Manage candidates and track their recruitment progress.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            alignSelf: { xs: "flex-start", sm: "center" },
            backgroundColor: "#4f46e5",
            borderRadius: 2,
            px: 2.5,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#4338ca" },
          }}
        >
          Add Candidate
        </Button>
      </Stack>

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
        {[
          {
            title: "Total Candidates",
            value: totalCandidates,
            color: "#4f46e5",
          },
          {
            title: "Interviews",
            value: interviewCount,
            color: "#d97706",
          },
          {
            title: "Shortlisted",
            value: shortlistedCount,
            color: "#0284c7",
          },
          {
            title: "Hired",
            value: hiredCount,
            color: "#059669",
          },
        ].map((item) => (
          <Card
            key={item.title}
            elevation={0}
            sx={{
              border: "1px solid #e8eaf2",
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Typography sx={{ color: "#777f96", fontSize: 14, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: item.color }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card
        elevation={0}
        sx={{
          border: "1px solid #e8eaf2",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              placeholder="Search by name, email, or position..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#8b91a7" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              size="small"
              label="Filter by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              sx={{ minWidth: { xs: "100%", md: 200 } }}
            >
              <MenuItem value="All">All statuses</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {filteredCandidates.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            textAlign: "center",
            py: 7,
            border: "1px solid #e8eaf2",
            borderRadius: 3,
          }}
        >
          <PersonSearchIcon sx={{ fontSize: 52, color: "#a5abc0", mb: 1 }} />
          <Typography variant="h6" sx={{ color: "#202544", fontWeight: 700 }}>
            No candidates found
          </Typography>
          <Typography sx={{ color: "#777f96", mt: 1 }}>
            Try another search or add a new candidate.
          </Typography>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              elevation={0}
              sx={{
                border: "1px solid #e8eaf2",
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#c7d2fe",
                  boxShadow: "0 8px 24px rgba(31, 41, 85, 0.07)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  spacing={1.5}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: 2.5,
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 19,
                      fontWeight: 800,
                    }}
                  >
                    {candidate.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "#202544",
                        fontWeight: 800,
                        fontSize: 17,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {candidate.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#777f96",
                        fontSize: 13,
                        mt: 0.5,
                      }}
                    >
                      Candidate ID: #{candidate.id}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={candidate.status}
                    color={statusColors[candidate.status] || "default"}
                    sx={{ fontWeight: 700 }}
                  />
                </Stack>

                <Stack spacing={1.5} sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <WorkIcon
                      sx={{ fontSize: 19, color: "#858ca3" }}
                    />
                    <Typography sx={{ color: "#454d66", fontSize: 14 }}>
                      {candidate.position}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <EmailIcon sx={{ fontSize: 19, color: "#858ca3" }} />
                    <Typography
                      sx={{
                        color: "#454d66",
                        fontSize: 14,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {candidate.email}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <PhoneOutlinedIcon
                      sx={{ fontSize: 19, color: "#858ca3" }}
                    />
                    <Typography sx={{ color: "#454d66", fontSize: 14 }}>
                      {candidate.phone || "Not provided"}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={1}
                  sx={{
                    mt: 3,
                    pt: 1.5,
                    borderTop: "1px solid #eef0f6",
                  }}
                >
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(candidate)}
                    sx={{
                      color: "#4f46e5",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(candidate.id)}
                    sx={{
                      color: "#dc2626",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 800, color: "#202544" }}>
            {editingId !== null ? "Edit Candidate" : "Add New Candidate"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.2} sx={{ pt: 1 }}>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Position Applied For"
                name="position"
                value={form.position}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                select
                label="Application Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#4f46e5",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#4338ca" },
              }}
            >
              {editingId !== null ? "Save Changes" : "Add Candidate"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Candidates;
