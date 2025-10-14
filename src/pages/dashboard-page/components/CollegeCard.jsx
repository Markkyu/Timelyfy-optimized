// react router
import { Link } from "react-router-dom";
// material components and icons
import { Fab, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// api and hooks
import { deleteCollege } from "@api/getCollegesAPI";
import { useQueryClient } from "@tanstack/react-query";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import useAuthStore from "@stores/useAuthStore";
import RenderWhenRole from "@components/RenderWhenRole";

export default function CollegeCard({ college }) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const handleDeleteCollege = async () => {
    if (confirm("Are you sure you want to delete this college?")) {
      await deleteCollege(college.college_id);
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-between group rounded-2xl p-2 bg-gray-200 shadow-lg transition transform border border-gray-400">
      {/* Header */}
      <div className="p-6 flex-2 flex flex-col">
        <h3 className="2xl:text-2xl font-bold text-gray-800 group-hover:text-red-800 transition">
          {college.college_name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage courses, teachers, and schedules
        </p>
      </div>

      {/* Render only when specific role */}
      <RenderWhenRole role={["master_scheduler", "admin"]}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 36, color: "gray" }}
          // onClick={handleDeleteCollege}
        >
          <EditIcon />
        </IconButton>
      </RenderWhenRole>
      <RenderWhenRole role={["master_scheduler", "admin"]}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "gray" }}
          onClick={handleDeleteCollege}
        >
          <DeleteIcon />
        </IconButton>
      </RenderWhenRole>

      {/* Footer / Actions */}
      <div className="relative flex-1 flex justify-center items-center px-4 py-3 bg-gradient-to-br from-red-700 to-red-900 rounded-lg gap-4">
        <Fab
          variant="extended"
          size="medium"
          color="inherit"
          sx={{ fontWeight: 600, width: "100%", borderRadius: "30px" }}
          component={Link}
          to={`/schedules/${college.college_id}`}
        >
          <span className="text-xs 2xl:text-sm">Schedules</span>
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="inherit"
          sx={{ fontWeight: 600, width: "100%", borderRadius: "30px" }}
          component={Link}
          to={`/course-list/${college.college_id}`}
        >
          <span className="text-xs 2xl:text-sm">Subjects</span>
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="inherit"
          sx={{ fontWeight: 600, width: "100%", borderRadius: "30px" }}
          component={Link}
          to={`/teachers/${college.college_id}`}
        >
          <span className="text-xs 2xl:text-sm">Teachers</span>
        </Fab>
      </div>
    </div>
  );
}
