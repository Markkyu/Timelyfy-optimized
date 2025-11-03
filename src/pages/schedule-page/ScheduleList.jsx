// React Dom imports
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Custom Hooks
import ErrorContent from "@components/ErrorContent";
import useCourses from "@hooks/useCourses";
// Components
import SemesterSection from "./components/SemesterSection";
// Material Icons
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ArrowLeft } from "lucide-react";

const uniqueYears = [1, 2, 3, 4];
const uniqueSemesters = [1, 2];

export default function ScheduleList() {
  const { college_id } = useParams();

  const navigate = useNavigate();

  // custom Hook fetch + caching
  const {
    data: courses,
    isFetching: courses_loading,
    error: courses_error,
  } = useCourses(college_id);

  // Error Content Display
  if (courses_error) {
    return (
      <div className="h-full flex justify-center items-center">
        <ErrorContent
          errorTitle={"Error loading course"}
          error={courses_error}
        />
      </div>
    );
  }

  return (
    <main className="h-full flex flex-col p-5 font-sans max-w-7xl 2xl:max-w-[1600px] mx-auto">
      <header className="relative text-4xl text-center font-bold mb-6">
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={18} />}
          sx={{
            mb: 2,
            borderRadius: "12px",
            fontWeight: 600,
            borderColor: "maroon",
            color: "maroon",
            borderWidth: 2,
            position: "absolute",
            left: 0,
          }}
        >
          back to home
        </Button>
        <h1>Scheduling Subjects list</h1>
      </header>
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
