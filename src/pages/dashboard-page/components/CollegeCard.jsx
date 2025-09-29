import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function CollegeCard({ college }) {
  return (
    <div className="relative flex flex-col justify-between group rounded-2xl bg-gray-100 shadow-lg transition transform hover:-translate-y-1 border border-gray-400">
      {/* Header */}
      <div className="p-6 flex-2 flex flex-col">
        <h3 className="text-lg 2xl:text-3xl font-bold text-gray-800 group-hover:text-red-800 transition">
          {college.college_name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage courses, teachers, and schedules
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="relative flex-1 flex items-center px-4 py-3 bg-gradient-to-br from-red-700 to-red-900 rounded-b-2xl gap-4">
        <Button
          variant="contained"
          color="inherit"
          sx={{ fontWeight: 600, borderRadius: "30px" }}
          component={Link}
          to={`/schedules/${college.college_id}`}
        >
          <span className="md:text-sm">Schedules</span>
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ fontWeight: 600, borderRadius: "30px" }}
          component={Link}
          to={`/course-list/${college.college_id}`}
        >
          <span className="md:text-sm">Courses</span>
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ fontWeight: 600, borderRadius: "30px" }}
          component={Link}
          to={`/teachers/${college.college_id}`}
        >
          <span className="md:text-sm">Teachers</span>
        </Button>
      </div>
    </div>
  );
}
