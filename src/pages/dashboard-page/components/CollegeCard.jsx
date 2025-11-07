// components/CollegeCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Chip } from "@mui/material";
import {
  MoreVertical,
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Trash2,
  Edit,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCollege } from "@api/collegesAPI";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import RenderWhenRole from "@components/RenderWhenRole";
import EditCollegeForm from "./EditCollegeForm";
import ConfirmDialog from "@components/ConfirmDialog";

export default function CollegeCard({ college }) {
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteCollege = async () => {
    await deleteCollege(college?.college_id);
    queryClient.invalidateQueries({
      queryKey: createCollegeQueryOptions().queryKey,
    });
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
    setAnchorEl(null);
  };

  const handleEditCollege = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const goToCollege = () => {
    navigate(`/college/${college?.college_id}`);
  };

  // Generate gradient based on college name
  const getGradient = (name) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-maroon transition-all duration-300 overflow-hidden hover:shadow-xl">
        {/* Gradient Header */}
        <div
          className="h-32 relative"
          style={{ background: getGradient(college?.college_name) }}
        >
          {/* Menu Button */}
          <RenderWhenRole role={["master_scheduler", "admin"]}>
            <div className="absolute top-3 right-3">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget);
                }}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  ".group:hover &": { opacity: 1 },
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
              >
                <MoreVertical size={20} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={(e) => {
                  e.stopPropagation();
                  setAnchorEl(null);
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCollege();
                  }}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Program
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
                  }}
                  sx={{ color: "error.main" }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </RenderWhenRole>

          {/* College Icon */}
          <div className="absolute -bottom-8 left-6">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-2xl shadow-md">
              <GraduationCap size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            goToCollege();
          }}
          className="pt-12 px-6 pb-6 cursor-pointer"
        >
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-maroon transition-colors line-clamp-2">
            {college?.college_name}
          </h3>

          {/* Department */}
          <Chip
            label={college?.college_major}
            size="small"
            sx={{
              bgcolor: `${college?.college_major ? "#f3f4f6" : "#fff"} `,
              color: "#374151",
              fontWeight: 600,
              fontSize: "0.75rem",
              mb: 3,
            }}
          />

          {/* Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen size={16} className="text-gray-400" />
                <span>Courses</span>
              </div>
              <span className="font-semibold text-gray-900">
                {college?.courses_count || 0}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} className="text-gray-400" />
                <span>Schedules</span>
              </div>
              <span className="font-semibold text-gray-900">
                {college?.schedules_count || 0}
              </span>
            </div>
          </div>

          {/* View Button */}
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 text-maroon font-semibold text-sm group-hover:gap-3 transition-all">
              <span>View Details</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <EditCollegeForm
          open={open}
          onClose={() => setOpen(false)}
          college={college}
        />
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteCollege}
        title="Delete College Program"
        message={`You are about to permanently delete "${college?.college_name}". This will remove all associated courses and schedules. This action cannot be undone.`}
        confirmText="delete college"
        confirmButtonText="Delete Program"
        cancelButtonText="Cancel"
      />
    </>
  );
}
