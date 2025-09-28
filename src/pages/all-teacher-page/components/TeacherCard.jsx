// Material Icons and Components
import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

// Custom Hooks Query
import { useDeleteTeachersDepartment } from "@hooks/useTeachersDepartment";
import { useState } from "react";

// Components
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";

const TeacherCard = ({ teacher }) => {
  // Function to get initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      key={teacher.teacher_id}
      className="group bg-white border border-gray-400 rounded-xl p-6 hover:shadow-md hover:border-red-800 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            sx={{
              bgcolor: "#950000",
              fontWeight: 600,
              width: 56,
              height: 56,
            }}
          >
            {/* Creates avatar with Initials */}
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
          <Fab
            variant="extended"
            size="small"
            sx={{ fontWeight: 600, bgcolor: "#800000", color: "white" }}
          >
            <CalendarMonthIcon sx={{ mr: 0.8 }} />
            Teaching Assignment
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
