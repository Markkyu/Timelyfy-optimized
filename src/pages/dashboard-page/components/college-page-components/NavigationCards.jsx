import { Card, CardContent, Chip, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, Lock } from "lucide-react";
import createPhaseQueryOptions from "@hooks/createPhaseQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import useAuthStore from "@stores/useAuthStore";

export default function NavigationCards({
  college,
  collegeId,
  currentUserRole, // optional prop if you track roles
}) {
  const navigate = useNavigate();
  const college_group = college?.college_code;

  const { user } = useAuthStore();

  const currUserRole = user.role;

  console.log(college);

  const {
    data: phases,
    isPending: phase_loading,
    isError: phase_error,
  } = useQuery(createPhaseQueryOptions());

  // Safety check
  if (phase_loading) return <p>Loading phases...</p>;
  if (phase_error) return <p>Failed to load phase information.</p>;

  // Extract the current phase
  const currentPhase = phases?.[0] || {};
  const currentSemester = currentPhase.phase_sem ?? 1;
  const currentYear = currentPhase.phase_year ?? 1;
  const currentSupervisor = currentPhase.phase_supervisor ?? "user";

  // For debug
  // console.log("Current Phase:", currentPhase);

  const semesters = [
    {
      sem: 1,
      label: "1st Semester",
      color: "from-purple-500 to-purple-700",
      disabledColor: "from-gray-400 to-gray-500",
      years: [
        { year: 1, label: "1st Year" },
        { year: 2, label: "2nd Year" },
        { year: 3, label: "3rd Year" },
        { year: 4, label: "4th Year" },
      ],
    },
    {
      sem: 2,
      label: "2nd Semester",
      color: "from-indigo-500 to-indigo-700",
      disabledColor: "from-gray-400 to-gray-500",
      years: [
        { year: 1, label: "1st Year" },
        { year: 2, label: "2nd Year" },
        { year: 3, label: "3rd Year" },
        { year: 4, label: "4th Year" },
      ],
    },
  ];

  const handleNavigateToCourses = () => {
    navigate(`/course-list/${collegeId}`);
  };

  const handleNavigateToSchedule = (year, sem) => {
    const collegeGroup = college_group + year;
    navigate(`/${collegeGroup}/schedule/${collegeId}?year=${year}&sem=${sem}`);
  };

  return (
    <div className="space-y-6">
      {/* Courses Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Courses</h2>
        <Card
          className="cursor-pointer group transition-all"
          onClick={handleNavigateToCourses}
        >
          <CardContent className="p-6 hover:-translate-y-1 duration-200 ease-out">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-md">
                <BookOpen className="text-white" size={40} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl flex items-center font-bold text-gray-800 mb-1 group-hover:text-red-800">
                  Course List
                  <ChevronRight className="ml-1" />
                </h3>
                <p className="text-gray-600">
                  View and manage all courses and subjects for this program
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedules</h2>

        <div className="flex items-center gap-2 mb-4">
          <Chip
            color="primary"
            label={`Current Phase: Year ${currentYear}, Semester ${currentSemester}`}
          />
          <Chip
            color="secondary"
            label={`Role in-charge: ${currentSupervisor.replace("_", " ")}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {semesters.map((semesterData) => {
            const isActiveSemester = semesterData.sem === currentSemester;

            return (
              <Card
                key={semesterData.sem}
                className={`${
                  isActiveSemester
                    ? "shadow-lg hover:shadow-xl transition-all"
                    : "shadow-md opacity-60 cursor-not-allowed"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-gradient-to-br ${
                          isActiveSemester
                            ? semesterData.color
                            : semesterData.disabledColor
                        } p-3 rounded-lg shadow-md`}
                      >
                        {isActiveSemester ? (
                          <Calendar className="text-white" size={32} />
                        ) : (
                          <Lock className="text-white" size={32} />
                        )}
                      </div>
                      <h3
                        className={`text-2xl font-bold ${
                          isActiveSemester ? "text-gray-800" : "text-gray-500"
                        }`}
                      >
                        {semesterData.label}
                      </h3>
                    </div>
                    {!isActiveSemester && (
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {semesterData.years.map((year) => {
                      const isActiveYear =
                        isActiveSemester && year.year === currentYear;
                      const isActiveUser = currUserRole === currentSupervisor;

                      // Determine if card should be unlocked
                      const isUnlocked =
                        currUserRole === "admin" || // Admins can access everything
                        (isActiveSemester &&
                          isActiveUser &&
                          year.year <= currentYear); // Active users can access current and previous years in current semester

                      return (
                        <Tooltip
                          key={year.year}
                          title={
                            isUnlocked
                              ? isActiveYear
                                ? "Open schedule (Current Phase)"
                                : "Open schedule"
                              : "Inactive — not in current phase"
                          }
                        >
                          <span>
                            <button
                              onClick={() =>
                                isUnlocked &&
                                handleNavigateToSchedule(
                                  year.year,
                                  semesterData.sem
                                )
                              }
                              disabled={!isUnlocked}
                              className={`p-4 rounded-lg border-2 w-full transition-all ${
                                isUnlocked
                                  ? `bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 border-gray-200 hover:border-red-800 cursor-pointer group ${
                                      isActiveYear
                                        ? "ring-2 ring-red-500 ring-opacity-50"
                                        : ""
                                    }`
                                  : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-50"
                              }`}
                            >
                              <div className="text-center">
                                <p
                                  className={`text-lg font-bold transition-colors ${
                                    isUnlocked
                                      ? "text-gray-700 group-hover:text-red-800"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {year.label}
                                </p>
                                {isActiveYear && isUnlocked && (
                                  <span className="text-xs text-red-600 font-semibold mt-1 block">
                                    Current
                                  </span>
                                )}
                              </div>
                            </button>
                          </span>
                        </Tooltip>
                      );
                    })}
                  </div>

                  {!isActiveSemester && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
                      <p className="text-sm text-gray-600 text-center">
                        This semester is currently inactive. Complete the phase
                        transition to access these schedules.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
