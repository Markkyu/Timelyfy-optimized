// components/CollegeListView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, Chip } from "@mui/material";
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Trash2,
  Edit,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCollege } from "@api/collegesAPI";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import RenderWhenRole from "@components/RenderWhenRole";
import EditCollegeForm from "./EditCollegeForm";

export default function CollegeListView({ college }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteCollege = async () => {
    if (confirm(`Are you sure you want to delete ${college?.college_name}?`)) {
      await deleteCollege(college?.college_id);
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
    }
  };

  const goToCollege = () => {
    navigate(`/college/${college?.college_id}`);
  };

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
    <div className="group bg-white border-2 border-gray-200 rounded-2xl hover:border-maroon hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex items-center gap-6 p-6">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: getGradient(college?.college_name) }}
        >
          <GraduationCap size={32} className="text-white" />
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3
              onClick={goToCollege}
              className="text-xl font-bold text-gray-900 group-hover:text-maroon transition-colors cursor-pointer"
            >
              {college?.college_name}
            </h3>
            <Chip
              label={college?.college_major}
              size="small"
              sx={{
                bgcolor: "#f3f4f6",
                color: "#374151",
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            />
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gray-400" />
              <span>
                <span className="font-semibold text-gray-900">
                  {college?.courses_count || 0}
                </span>{" "}
                Courses
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>
                <span className="font-semibold text-gray-900">
                  {college?.schedules_count || 0}
                </span>{" "}
                Schedules
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={goToCollege}
            endIcon={<ArrowRight size={16} />}
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
            View Program
          </Button>

          <RenderWhenRole role={["master_scheduler", "admin"]}>
            <IconButton onClick={() => setOpen(true)} sx={{ color: "gray" }}>
              <Edit size={20} />
            </IconButton>

            <IconButton
              onClick={handleDeleteCollege}
              sx={{
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.lighter",
                },
              }}
            >
              <Trash2 size={20} />
            </IconButton>
          </RenderWhenRole>

          <IconButton onClick={goToCollege} sx={{ color: "gray" }}>
            <ChevronRight size={20} />
          </IconButton>
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
