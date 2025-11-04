// React Dom Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

const uniqueYears = [1, 2, 3, 4];
const uniqueSemesters = [1, 2];

export default function CourseList() {
  const navigate = useNavigate();
  const { college_id } = useParams();

  // custom Hook fetch + cache
  // const {
  //   data: courses,
  //   isFetching: courses_loading,
  //   error: courses_error,
  // } = useCourses(college_id);

  const { data: collegeId } = useCollegeQueryById(college_id);
  const { data: collegeList } = useQuery(createCollegeQueryOptions());

  // const { college_name: collegeName, college_major: collegeMajor } = collegeId;

  // console.log(collegeName, collegeMajor);

  // const collegeName = collegeId?.college_name;
  // const collegeMajor = collegeId?.college_major;

  // console.log(collegeId?.college_name);

  const {
    data: courses,
    isFetching: courses_loading,
    error: courses_error,
  } = useQuery(createCourseQueryById(college_id));

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
    <main className="h-full flex flex-col p-5 font-sans max-w-7xl 2xl:max-w-[1600px] mx-auto">
      <header className="flex items-center justify-between mb-6">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: "10px",
            color: "#800000",
            borderColor: "#800000",
            fontWeight: 600,
            borderWidth: 2,
            textTransform: "none",
          }}
        >
          Back to College Info
        </Button>

        {/* Title */}
        <div className="text-center flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight">
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

        {/* Course Navigation */}
        <div className="flex flex-col text-sm">
          <label
            htmlFor="course-colleges"
            className="text-gray-600 mb-1 font-medium"
          >
            Jump to Course
          </label>
          <select
            id="course-colleges"
            className="w-50 border border-gray-300 rounded-lg p-2 bg-white text-gray-800 outline-0 focus:ring-2 focus:ring-red-800"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) navigate(`/course-list/${e.target.value}`);
            }}
          >
            <option value="" disabled>
              Select a College
            </option>
            {collegeList?.map((c) => (
              <option key={c.college_id} value={c.college_id}>
                {c.college_name} {c.college_major}
              </option>
            ))}
          </select>
        </div>
      </header>

      {uniqueYears.map(
        (
          year // Chop up by year level
        ) => (
          <div
            key={year}
            className="mb-6 border border-gray-300 rounded-lg bg-gray-50 p-4 shadow-md"
          >
            <h2 className="text-3xl font-bold text-center mb-2">Year {year}</h2>
            <div className="flex gap-4 justify-center">
              {uniqueSemesters.map(
                (
                  sem // List by semester
                ) => (
                  <SemesterSection
                    key={sem}
                    sem={sem}
                    year={year}
                    college_id={college_id}
                    courses={courses}
                    loading={courses_loading}
                    collegeName={collegeId?.college_name}
                    collegeMajor={collegeId?.college_major}
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </main>
  );
}
