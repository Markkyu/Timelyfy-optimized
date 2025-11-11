// React Dom Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

// Custom Hooks
import ErrorContent from "@components/ErrorContent";
import useCourses from "@hooks/useCourses";

// Material Components
import SemesterSection from "./components/SemesterSection";
import { Button, Fab } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import createCourseQueryById from "@hooks/createCourseQueryById";
import { useQuery } from "@tanstack/react-query";
import createCollegeQueryOptions, {
  useCollegeQueryById,
} from "@hooks/createCollegeQueryOptions";
import LoadingContent from "@components/LoadingContent";
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";
import EditCourseForm from "./components/EditCourseForm";
import AssignTeacherForm from "./components/AssignTeacherForm";

const uniqueYears = [1, 2, 3, 4];
const uniqueSemesters = [1, 2];

export default function CourseList() {
  const navigate = useNavigate();
  const { college_id } = useParams();

  const { data: collegeId } = useQuery(useCollegeQueryById(college_id));

  const {
    data: courses,
    isFetching: courses_loading,
    error: courses_error,
  } = useQuery(createCourseQueryById(college_id));

  // const groupedCourses = useMemo(() => {
  //   const groups = {};
  //   if (!courses) return groups;

  //   for (const course of courses) {
  //     const key = `${course?.course_year}-${course?.semester}`;
  //     if (!groups[key]) groups[key] = [];
  //     groups[key].push(course);
  //   }

  //   return groups;
  // }, [courses]);

  // const [selectedCourse, setSelectedCourse] = useState(null);
  // const [editOpen, setEditOpen] = useState(false);
  // const [assignOpen, setAssignOpen] = useState(false);
  // const [deleteOpen, setDeleteOpen] = useState(false);

  // const handleEdit = (course) => {
  //   setSelectedCourse(course);
  //   setEditOpen(true);
  // };

  // const handleAssign = (course) => {
  //   setSelectedCourse(course);
  //   setAssignOpen(true);
  // };

  // const handleDelete = (course) => {
  //   setSelectedCourse(course);
  //   setDeleteOpen(true);
  // };

  // Error Content Display
  if (courses_error)
    return (
      <div className="h-full flex justify-center items-center">
        <ErrorContent
          errorTitle={"Error loading course"}
          error={courses_error}
        />
      </div>
    );

  return (
    <main className="h-full flex flex-col p-5 font-sans max-w-7xl 2xl:max-w-[1600px]  mx-auto">
      <header className="flex items-center justify-between mb-6">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(`/college/${college_id}`)}
          sx={{
            borderRadius: "10px",
            color: "#800000",
            borderColor: "#800000",
            fontWeight: 600,
            borderWidth: 2,
          }}
        >
          Back to College Info
        </Button>

        {/* Title */}
        <div className="text-center flex flex-col">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {collegeId?.college_name || "Loading..."}
          </h1>

          {collegeId?.college_major && (
            <span className="text-sm text-gray-500 font-medium">
              {collegeId.college_major}
            </span>
          )}

          <p className="text-gray-700 text-lg font-semibold mt-1">
            Course List
          </p>
        </div>

        <div className="w-[200px]"></div>
      </header>

      {uniqueYears.map((year) => (
        <div
          key={year}
          className="mb-6 border border-gray-300 rounded-lg bg-gray-50 p-4 shadow-md"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Year {year}</h2>
          <div className="flex gap-4 justify-center">
            {uniqueSemesters?.map((sem) => (
              <SemesterSection
                key={sem}
                sem={sem}
                year={year}
                college_id={college_id}
                // courses={groupedCourses[`${year}-${sem}`] || []}
                courses={courses}
                loading={courses_loading}
                collegeName={collegeId?.college_name}
                collegeMajor={collegeId?.college_major}
                collegeCode={collegeId?.college_code}
                // onEdit={handleEdit}
                // onAssign={handleAssign}
                // onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
