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

export default function CollegeCard({ college }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteCollege = async () => {
    if (confirm(`Are you sure you want to delete ${college?.college_name}?`)) {
      await deleteCollege(college?.college_id);
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
    }
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
    <div
      className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-maroon transition-all duration-300 overflow-hidden hover:shadow-xl cursor-pointer"
      onClick={goToCollege}
    >
      {/* Gradient Header */}
      <div
        className="h-32 relative"
        style={{ background: getGradient(college?.college_name) }}
      >
        {/* <div className="absolute inset-0 bg-red-800 bg-opacity-10"></div> */}

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
                  handleDeleteCollege();
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
      <div className="pt-12 px-6 pb-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-maroon transition-colors line-clamp-2">
          {college?.college_name}
        </h3>

        {/* Department */}
        <Chip
          label={college?.college_major}
          size="small"
          sx={{
            bgcolor: "#f3f4f6",
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
  );
}

// // react router
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// // material components and icons
// import { Fab, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// // api and hooks
// import { deleteCollege } from "@api/collegesAPI";
// import { useQueryClient } from "@tanstack/react-query";
// import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
// import useAuthStore from "@stores/useAuthStore";
// import RenderWhenRole from "@components/RenderWhenRole";
// import EditCollegeForm from "./EditCollegeForm";

// export default function CollegeCard({ college }) {
//   const [open, setOpen] = useState(false);

//   const queryClient = useQueryClient();
//   const { user } = useAuthStore();

//   const navigate = useNavigate();

//   const handleDeleteCollege = async () => {
//     if (confirm("Are you sure you want to delete this college?")) {
//       await deleteCollege(college?.college_id);
//       queryClient.invalidateQueries({
//         queryKey: createCollegeQueryOptions().queryKey,
//       });
//     }
//   };

//   const handleEditCollege = async () => {
//     setOpen(true);
//   };

//   const goToCollege = () => {
//     navigate(`/college/${college?.college_id}`);
//   };

//   return (
//     <div className="relative group flex cursor-pointer rounded-lg p-2 bg-gray-50 hover:shadow-lg transition transform hover:-translate-y-2 border border-gray-400">
//       {/* Header */}
//       <div
//         onClick={goToCollege}
//         className="p-6 flex flex-1 flex-col justify-center items-center"
//       >
//         <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-800">
//           {college?.college_name}
//         </h3>
//         <p className="text-md font-medium text-gray-500 mt-1">
//           {college?.college_major}
//         </p>
//         <p className="text-sm text-gray-400 mt-1">
//           Manage subjects and schedules
//         </p>
//       </div>

//       {/* Render only when specific role */}
//       <RenderWhenRole role={["master_scheduler", "admin"]}>
//         <div className="hidden group-hover:block ">
//           <IconButton
//             sx={{ position: "absolute", top: 4, right: 42, color: "#B8B8B8" }}
//             onClick={handleEditCollege}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             sx={{ position: "absolute", top: 4, right: 4, color: "#B8B8B8" }}
//             onClick={handleDeleteCollege}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       </RenderWhenRole>

//       <EditCollegeForm
//         open={open}
//         onClose={() => setOpen(false)}
//         college={college}
//       />
//     </div>
//   );
// }
