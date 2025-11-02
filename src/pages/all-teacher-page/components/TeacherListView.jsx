// components/TeacherListView.jsx
import { Avatar, Chip, IconButton, Button } from "@mui/material";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  Trash2,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "@api/teachersAPI";
import createTeacherQueryOptions from "@hooks/createTeacherQueryOptions";

export default function TeacherListView({ teacher }) {
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
  };

  const isAvailable = teacher.teacher_availability === "Available";

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-maroon hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Avatar with Status */}
        <div className="relative flex-shrink-0">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundImage:
                "linear-gradient(135deg, #800000 0%, #ff0000 100%)",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            {getInitials(teacher.first_name, teacher.last_name)}
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              isAvailable ? "bg-green-500" : "bg-amber-500"
            }`}
          ></div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon transition-colors">
              {teacher.first_name} {teacher.last_name}
            </h3>
            <Chip
              label={teacher.teacher_availability}
              size="small"
              icon={<Clock size={14} />}
              sx={{
                bgcolor: isAvailable ? "#dcfce7" : "#fef3c7",
                color: isAvailable ? "#166534" : "#92400e",
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <span>{teacher.email || "No email"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span>{teacher.phone || "No phone"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>ID: {teacher.teacher_id}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="contained"
            startIcon={<Settings size={16} />}
            sx={{
              bgcolor: "maroon",
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#600000",
              },
            }}
          >
            Configure
          </Button>

          <IconButton
            onClick={handleDeleteTeacher}
            sx={{
              color: "error.main",
            }}
          >
            <Trash2 size={20} />
          </IconButton>

          <IconButton
            sx={{
              color: "gray",
            }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
