
import { useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import Jobs from "./pages/Jobs";
import "./App.css";

const drawerWidth = 250;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Jobs", icon: <WorkIcon /> },
  { label: "Candidates", icon: <GroupsIcon /> },
  { label: "Applications", icon: <AssignmentOutlinedIcon /> },
  { label: "Settings", icon: <SettingsOutlinedIcon /> },
];

const stats = [
  {
    label: "Active Jobs",
    value: "12",
    detail: "Currently hiring",
  },
  {
    label: "Total Candidates",
    value: "248",
    detail: "Across all jobs",
  },
  {
    label: "Applications",
    value: "86",
    detail: "24 awaiting review",
  },
  {
    label: "Interviews",
    value: "14",
    detail: "5 scheduled today",
  },
];

const candidates = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    score: 94,
    status: "Interview",
  },
  {
    name: "Priya Singh",
    role: "Backend Developer",
    score: 88,
    status: "Applied",
  },
  {
    name: "Aman Verma",
    role: "Full Stack Developer",
    score: 82,
    status: "Shortlisted",
  },
  {
    name: "Neha Gupta",
    role: "UI/UX Designer",
    score: 76,
    status: "Applied",
  },
];

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <Box className="app-shell">
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#ffffff",
            borderRight: 0,
          },
        }}
      >
        <Box className="brand">
          <Box className="brand-icon">
            <SmartToyOutlinedIcon />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              HireAI
            </Typography>

            <Typography variant="caption" color="#9CA3AF">
              Applicant Tracking System
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#293244" }} />

        <Typography className="menu-heading">
          WORKSPACE
        </Typography>

        <List sx={{ px: 1.5 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              selected={activePage === item.label}
              onClick={() => setActivePage(item.label)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: "#D1D5DB",

                "& .MuiListItemIcon-root": {
                  color: "inherit",
                  minWidth: 40,
                },

                "&.Mui-selected": {
                  backgroundColor: "#4F46E5",
                  color: "#ffffff",
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "#4338CA",
                },

                "&:hover": {
                  backgroundColor: "#293244",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Box className="sidebar-footer">
          <Avatar sx={{ bgcolor: "#4F46E5" }}>A</Avatar>

          <Box>
            <Typography fontSize={14} fontWeight={600}>
              Admin User
            </Typography>

            <Typography fontSize={12} color="#9CA3AF">
              Recruiter
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" className="main-area">
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
            color: "#111827",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Toolbar className="topbar">
            <Typography fontWeight={600}>
              {activePage}
            </Typography>

            <IconButton
              aria-label="Notifications"
              sx={{ color: "#374151" }}
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box className="page-content">
          {/* Page heading */}
          <Box className="welcome-row">
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {activePage === "Dashboard"
                  ? "Recruitment Dashboard"
                  : activePage}
              </Typography>

              <Typography color="text.secondary" mt={0.5}>
                Manage your recruitment process in one place.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setActivePage("Jobs")}
              sx={{
                backgroundColor: "#4F46E5",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#4338CA",
                },
              }}
            >
              Create Job
            </Button>
          </Box>

          {/* Dashboard page */}
          {activePage === "Dashboard" && (
            <>
              <Box className="stats-grid">
                {stats.map((stat) => (
                  <Card key={stat.label} className="stat-card">
                    <CardContent>
                      <Typography
                        color="text.secondary"
                        fontSize={14}
                      >
                        {stat.label}
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={700}
                        my={1}
                      >
                        {stat.value}
                      </Typography>

                      <Typography
                        fontSize={12}
                        color="text.secondary"
                      >
                        {stat.detail}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Recent candidates */}
              <Card className="candidate-card">
                <CardContent>
                  <Box className="section-heading">
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Recent Candidates
                      </Typography>

                      <Typography
                        color="text.secondary"
                        fontSize={13}
                      >
                        Review your latest applicants
                      </Typography>
                    </Box>

                    <Button
                      onClick={() => setActivePage("Candidates")}
                      sx={{ textTransform: "none" }}
                    >
                      View all
                    </Button>
                  </Box>

                  <Box className="candidate-table">
                    <Box className="table-row table-header">
                      <Typography>Candidate</Typography>
                      <Typography>Position</Typography>
                      <Typography>AI Match</Typography>
                      <Typography>Status</Typography>
                    </Box>

                    {candidates.map((candidate) => (
                      <Box
                        className="table-row"
                        key={candidate.name}
                      >
                        <Typography fontWeight={600}>
                          {candidate.name}
                        </Typography>

                        <Typography color="text.secondary">
                          {candidate.role}
                        </Typography>

                        <Typography
                          fontWeight={700}
                          color="success.main"
                        >
                          {candidate.score}%
                        </Typography>

                        <Box>
                          <Chip
                            size="small"
                            label={candidate.status}
                            color={
                              candidate.status === "Interview"
                                ? "success"
                                : candidate.status === "Shortlisted"
                                  ? "info"
                                  : "default"
                            }
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </>
          )}

          {/* Actual Jobs page */}
          {activePage === "Jobs" && <Jobs />}

          {/* Other placeholder pages */}
          {["Candidates", "Applications", "Settings"].includes(
            activePage
          ) && (
            <Card sx={{ mt: 3, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700}>
                  {activePage}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  This page is under development.
                </Typography>

                <Button
                  sx={{ mt: 2, textTransform: "none" }}
                  onClick={() => setActivePage("Dashboard")}
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}
