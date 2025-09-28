// Material Icons and Components
import { Avatar, Chip, IconButton, Tooltip, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom Hooks Query
import { useDeleteTeachersDepartment } from "@hooks/useTeachersDepartment";
import { useState } from "react";

// Components
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";
import EditTeacherForm from "./EditTeacherForm";

export default function TeacherCard({ teacher }) {
  const deleteTeacherMutation = useDeleteTeachersDepartment();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    deleteTeacherMutation.mutate(teacher.teacher_id);
  };

  // Function to get initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      key={teacher.teacher_id}
      className="group bg-white border border-gray-400 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
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
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
              {teacher.first_name} {teacher.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <AccessTimeIcon sx={{ fontSize: 18 }} className="text-gray-400" />
              <Chip
                label={teacher.teacher_availability}
                size="small"
                variant="outlined"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <Tooltip title="Edit Teacher">
            <IconButton
              sx={{
                bgcolor: "#3b82f6",
                color: "white",
                ":hover": { bgcolor: "#2563eb" },
              }}
              onClick={() => setEditOpen(true)}
            >
              <EditIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Teacher">
            <IconButton
              onClick={() => setDeleteOpen(true)}
              sx={{
                bgcolor: "#ef4444",
                color: "white",
                ":hover": { bgcolor: "#dc2626" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
          <Button
            variant="contained"
            onClick={() => setEditOpen(true)}
            sx={{ bgcolor: "#335c67", borderRadius: "20px", fontWeight: 600 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeleteOpen(true)}
            sx={{ bgcolor: "#9e2a2b", borderRadius: "20px", fontWeight: 600 }}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={"Delete Confirmation"}
        desc={"Are you sure you want to delete this teacher?"}
        handleDelete={handleDelete}
      />

      <EditTeacherForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        teacher={teacher}
      />
    </div>
  );
}
