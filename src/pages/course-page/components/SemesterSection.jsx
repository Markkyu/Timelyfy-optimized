// // Hooks import
// import { useState } from "react";

// // Material Components and Icons
// import { Button, Box, Fab, Tooltip } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";

// // Components
// import CourseCard from "./CourseCard";
// import CourseSkeletonLoader from "./CourseSkeletonLoader";
// import AddCourseForm from "./AddCourseForm";

// export default function SemesterSection({
//   sem,
//   courses,
//   year,
//   college_id,
//   loading,
// }) {
//   const [addOpen, setAddOpen] = useState(false);

//   // filter function to organize course's year and sem
//   const filteredCourses = courses?.filter(
//     (course) =>
//       course.course_year === year &&
//       course.semester === sem &&
//       course.course_college == college_id
//   );

//   console.log(filteredCourses);

//   return (
//     <section className="flex-1 bg-white border border-gray-300 rounded-md p-3 shadow-sm">
//       <div className="relative flex items-center justify-between mb-2">
//         <h3 className="font-semibold text-2xl text-center flex-1 m-0">
//           {sem === 1 ? "First" : "Second"} Semester
//         </h3>

//         <Fab
//           variant="extended"
//           size="small"
//           onClick={() => setAddOpen(true)}
//           sx={{
//             fontWeight: 600,
//             bgcolor: "#800000",
//             position: "absolute",
//             color: "white",
//             right: 0,
//             "&:hover": { backgroundColor: "#700000" },
//           }}
//         >
//           <AssignmentAddIcon sx={{ mr: 0.8 }} />
//           Add Subject
//         </Fab>
//       </div>

//       {loading ? ( // Loading State
//         <CourseSkeletonLoader />
//       ) : filteredCourses.length === 0 ? ( // Empty State
//         <CourseCard course={null} />
//       ) : (
//         filteredCourses.map(
//           // Data Found State
//           (course) => <CourseCard key={course.course_id} course={course} />
//         )
//       )}

//       <AddCourseForm
//         open={addOpen}
//         onClose={() => setAddOpen(false)}
//         sem={sem}
//         college_id={college_id}
//         year={year}
//       />
//     </section>
//   );
// }

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Fab } from "@mui/material";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import CourseCard from "./CourseCard";
import CourseSkeletonLoader from "./CourseSkeletonLoader";
import AddCourseForm from "./AddCourseForm";
import { CalendarIcon } from "lucide-react";

export default function SemesterSection({
  sem,
  courses,
  year,
  college_id,
  loading,
}) {
  const [addOpen, setAddOpen] = useState(false);

  const navigate = useNavigate();

  // Memoize filtered courses to avoid re-filtering every render
  const filteredCourses = useMemo(() => {
    return (
      courses?.filter(
        (course) =>
          course.course_year === year &&
          course.semester === sem &&
          course.course_college == college_id
      ) || []
    );
  }, [courses, year, sem, college_id]);

  // UI helper content
  const renderContent = () => {
    if (loading) return <CourseSkeletonLoader />;

    if (filteredCourses.length === 0) return <CourseCard course={null} />;

    return filteredCourses.map((course) => (
      <CourseCard key={course.course_id} course={course} />
    ));
  };

  return (
    <section className="flex-1 bg-white border border-gray-300 rounded-md p-3 shadow-sm">
      <div className="relative flex items-center justify-between mb-2">
        <h3 className="font-bold text-2xl ml-4">
          {sem === 1 ? "First" : "Second"} Semester
        </h3>

        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="contained"
            sx={{
              background: "#7f1d1d",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
            }}
            startIcon={<CalendarIcon />}
            onClick={() => navigate(`/schedule/${college_id}`)}
          >
            Schedule
          </Button>

          <Button
            variant="contained"
            sx={{
              background: "#800000",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
            }}
            startIcon={<AssignmentAddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add Subject
          </Button>
        </div>
      </div>

      {renderContent()}

      <AddCourseForm
        open={addOpen}
        onClose={() => setAddOpen(false)}
        sem={sem}
        college_id={college_id}
        year={year}
      />
    </section>
  );
}
