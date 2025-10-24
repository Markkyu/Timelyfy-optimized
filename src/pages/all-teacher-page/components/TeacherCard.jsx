// Material Icons and Components
import { Avatar, Chip, IconButton, Tooltip, Button, Fab } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom Hooks Query
import { useDeleteTeachersDepartment } from "@hooks/useTeachersDepartment";
import { useState } from "react";

// Components
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";

export default function TeacherCard({ teacher }) {
  // Function to get initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      key={teacher.teacher_id}
      className="group max-h-40 bg-white border border-gray-400 rounded-xl p-6 hover:shadow-md hover:border-red-800 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            sx={{
              backgroundImage: "linear-gradient(to bottom right, red, maroon)",
              fontWeight: 600,
              maxWidth: 56,
              maxHeight: 56,
            }}
          >
            {getInitials(teacher.first_name, teacher.last_name)}
          </Avatar>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-red-800 transition-colors">
              {teacher.first_name} {teacher.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <AccessTimeIcon sx={{ fontSize: 18 }} className="text-gray-400" />
              <Chip
                label={teacher.teacher_availability}
                size="small"
                variant="outlined"
              />
              <Chip
                label={teacher.college_name}
                size="small"
                variant="outlined"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              bgcolor: "gray",
              color: "white",
              borderRadius: "40px",
              boxShadow: 2,
            }}
          >
            <AccessTimeIcon sx={{ mr: 0.8 }} />
            Availability
          </Button>
          <Button
            variant="contained"
            sx={{
              fontWeight: 600,
              bgcolor: "#800000",
              color: "white",
              borderRadius: "40px",
              boxShadow: 2,
            }}
          >
            <CalendarMonthIcon sx={{ mr: 0.8 }} />
            Teaching Assignment
          </Button>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
