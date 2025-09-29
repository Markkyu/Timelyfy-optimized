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
      className="group bg-white border border-gray-400 rounded-xl py-1 px-4 2xl:p-6 hover:shadow-md hover:border-red-600 hover:bg-red-100 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            sx={{
              backgroundImage: "linear-gradient(to bottom right,red, maroon)",
              fontWeight: 600,
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
          <Button
            variant="contained"
            onClick={() => setEditOpen(true)}
            sx={{ bgcolor: "#335c67", borderRadius: "20px", fontWeight: 600 }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeleteOpen(true)}
            sx={{ bgcolor: "#9e2a2b", borderRadius: "20px", fontWeight: 600 }}
            startIcon={<DeleteIcon />}
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

      {/* Edit form */}
      <EditTeacherForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        teacher={teacher}
      />
    </div>
  );
}
