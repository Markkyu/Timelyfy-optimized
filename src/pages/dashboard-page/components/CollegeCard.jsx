// react router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// material components and icons
import { Fab, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// api and hooks
import { deleteCollege } from "@api/collegesAPI";
import { useQueryClient } from "@tanstack/react-query";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import useAuthStore from "@stores/useAuthStore";
import RenderWhenRole from "@components/RenderWhenRole";
import EditCollegeForm from "./EditCollegeForm";

export default function CollegeCard({ college }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const handleDeleteCollege = async () => {
    if (confirm("Are you sure you want to delete this college?")) {
      await deleteCollege(college?.college_id);
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
    }
  };

  const handleEditCollege = async () => {
    setOpen(true);
  };

  const goToCollege = () => {
    navigate(`/college/${college?.college_id}`);
  };

  return (
    <div className="relative group flex cursor-pointer rounded-lg p-2 bg-gray-50 hover:shadow-lg transition transform hover:-translate-y-2 border border-gray-400">
      {/* Header */}
      <div
        onClick={goToCollege}
        className="p-6 flex flex-1 flex-col justify-center items-center"
      >
        <h3 className="text-xl 2xl:text-3xl font-bold text-gray-800">
          {college?.college_name}
        </h3>
        <p className="text-md font-medium text-gray-500 mt-1">
          {college?.college_major}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Manage subjects and schedules
        </p>
      </div>

      {/* Render only when specific role */}
      <RenderWhenRole role={["master_scheduler", "admin"]}>
        <div className="hidden group-hover:block ">
          <IconButton
            sx={{ position: "absolute", top: 4, right: 42, color: "#B8B8B8" }}
            onClick={handleEditCollege}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ position: "absolute", top: 4, right: 4, color: "#B8B8B8" }}
            onClick={handleDeleteCollege}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </RenderWhenRole>

      <EditCollegeForm
        open={open}
        onClose={() => setOpen(false)}
        college={college}
      />
    </div>
  );
}
