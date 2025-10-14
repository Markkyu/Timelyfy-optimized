// Hooks import
import { useState } from "react";

// Material Components and Icons
import { Button, Box, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// Components
import CourseCard from "./CourseCard";
import CourseSkeletonLoader from "./CourseSkeletonLoader";

export default function SemesterSection({
  sem,
  courses,
  year,
  college_id,
  loading,
}) {
  // filter function to organize course's year and sem
  const filteredCourses = courses?.filter(
    (course) =>
      course.course_year === year &&
      course.semester === sem &&
      course.course_college == college_id
  );

  return (
    <section className="flex-1 bg-white border border-gray-300 rounded-md p-3 shadow-sm">
      <div className="relative flex items-center justify-between mb-2">
        <h3 className="font-semibold text-2xl text-center flex-1 m-0">
          {sem === 1 ? "First" : "Second"} Semester
        </h3>

        <Fab
          variant="extended"
          size="small"
          sx={{
            bgcolor: "#335c67",
            fontWeight: 600,
            position: "absolute",
            color: "white",
            right: 0,
            "&:hover": {
              backgroundColor: "#29535c",
            },
          }}
        >
          <AutoAwesomeIcon sx={{ mr: 0.8 }} />
          Auto-schedule
        </Fab>
      </div>

      {loading ? ( // Loading State
        <>
          <CourseSkeletonLoader />
        </>
      ) : filteredCourses == 0 ? ( // Empty State
        <CourseCard course={null} />
      ) : (
        filteredCourses.map(
          (
            course // Data Found State
          ) => <CourseCard key={course.course_id} course={course} />
        )
      )}
    </section>
  );
}
