// React Dom Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Custom Hooks
import ErrorContent from "@components/ErrorContent";
import useCourses from "@hooks/useCourses";

// Components
import SemesterSection from "./components/SemesterSection";

const uniqueYears = [1, 2, 3, 4];
const uniqueSemesters = [1, 2];

export default function CourseList() {
  const navigate = useNavigate();
  const { college_id } = useParams();

  // custom Hook fetch + cache
  const {
    data: courses,
    isFetching: courses_loading,
    error: courses_error,
  } = useCourses(college_id);

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

  console.log(courses);

  return (
    <main className="h-full flex flex-col p-5 bg-gray-200 font-sans">
      <h1 className="text-4xl text-center font-bold mb-3">Course list</h1>
      {uniqueYears.map(
        (
          year // Chop up by year leve
        ) => (
          <div
            key={year}
            className="mb-6 border border-gray-300 rounded-lg bg-gray-50 p-4 shadow-md"
          >
            <h2 className="text-2xl font-bold text-center mb-2">Year {year}</h2>
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
