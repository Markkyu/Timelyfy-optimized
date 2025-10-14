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
import { Link } from "react-router-dom";

const TeacherCard = ({ teacher }) => {
  // Function to get initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      key={teacher.teacher_id}
      className="group bg-white border border-gray-400 rounded-xl py-1 px-4 2xl:p-6 hover:shadow-md hover:border-red-800 transition-all duration-200"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar
            sx={{
              backgroundImage: "linear-gradient(to bottom right, red, maroon)",
              fontWeight: 600,
            }}
          >
            {getInitials(teacher.first_name, teacher.last_name)}
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg lg:text-2xl font-semibold text-gray-800 group-hover:text-red-800 transition-colors truncate">
              {teacher.first_name} {teacher.last_name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <AccessTimeIcon sx={{ fontSize: 16 }} className="text-gray-400" />
              <Chip
                label={teacher.teacher_availability}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
              <Chip
                label={teacher.college_name}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            component={Link}
            to="/teacher-schedule/:teacher_id"
            variant="contained"
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: "maroon",
              color: "white",
              borderRadius: "20px",
            }}
          >
            <CalendarMonthIcon sx={{ mr: 1 }} />
            Teaching Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
