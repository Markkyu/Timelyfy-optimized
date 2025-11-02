// components/TeacherCard.jsx
import {
  Avatar,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Clock,
  Trash2,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "@api/teachersAPI";
import createTeacherQueryOptions from "@hooks/createTeacherQueryOptions";

export default function TeacherCard({ teacher }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  const handleDeleteTeacher = async () => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      await deleteTeacher(teacher.teacher_id);
      queryClient.invalidateQueries({
        queryKey: createTeacherQueryOptions().queryKey,
      });
    }
    setAnchorEl(null);
  };

  const isAvailable = teacher.teacher_availability === "Available";

  return (
    <div className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-maroon transition-all duration-300 overflow-hidden hover:shadow-xl">
      {/* Status Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon to-red-600"></div>

      <div className="p-6">
        {/* Header with Menu */}
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <Avatar
              sx={{
                width: 72,
                height: 72,
                backgroundImage:
                  "linear-gradient(135deg, #800000 0%, #ff0000 100%)",
                fontSize: "1.5rem",
                fontWeight: 700,
                border: "3px solid white",
                boxShadow: "0 4px 12px rgba(128, 0, 0, 0.2)",
              }}
            >
              {getInitials(teacher.first_name, teacher.last_name)}
            </Avatar>
            {/* Status Badge */}
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${
                isAvailable ? "bg-green-500" : "bg-amber-500"
              }`}
            ></div>
          </div>

          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              opacity: 0,
              transition: "opacity 0.2s",
              ".group:hover &": { opacity: 1 },
            }}
          >
            <MoreVertical size={20} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Settings size={16} className="mr-2" />
              Configure
            </MenuItem>
            <MenuItem
              onClick={handleDeleteTeacher}
              sx={{ color: "error.main" }}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </MenuItem>
          </Menu>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-maroon transition-colors">
          {teacher.first_name} {teacher.last_name}
        </h3>

        {/* Status Chip */}
        <Chip
          label={teacher.teacher_availability}
          size="small"
          icon={<Clock size={14} />}
          sx={{
            bgcolor: isAvailable ? "#dcfce7" : "#fef3c7",
            color: isAvailable ? "#166534" : "#92400e",
            fontWeight: 600,
            fontSize: "0.75rem",
            mb: 3,
          }}
        />

        {/* Info Section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="text-gray-400" />
            <span>{teacher.email || "No email"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="text-gray-400" />
            <span>{teacher.phone || "No phone"}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Settings size={18} />}
          sx={{
            bgcolor: "maroon",
            borderRadius: "12px",
            fontWeight: 600,
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#600000",
            },
          }}
        >
          Configure Teacher
        </Button>
      </div>
    </div>
  );
}
