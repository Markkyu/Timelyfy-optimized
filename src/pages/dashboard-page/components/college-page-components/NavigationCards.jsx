import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, Lock } from "lucide-react";

export default function NavigationCards({
  college,
  collegeId,
  currentSemester = 1,
}) {
  const navigate = useNavigate();

  const college_group = college?.college_code;

  console.log(college_group);

  // Group schedules by semester
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
    // Only navigate if semester is active
    const collegeGroup = college_group + year;

    console.log(collegeGroup);

    if (sem === currentSemester) {
      navigate(
        `/${collegeGroup}/schedule/${collegeId}?year=${year}&sem=${sem}`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Courses Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Courses</h2>
        <Card
          className="shadow-lg hover:shadow-2xl cursor-pointer group transition-all"
          onClick={handleNavigateToCourses}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-md">
                <BookOpen className="text-white" size={40} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-red-800 transition-colors">
                  Course List
                </h3>
                <p className="text-gray-600">
                  View and manage all courses and subjects for this program
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedules Section - Grouped by Semester */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedules</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {semesters.map((semesterData) => {
            const isActive = semesterData.sem === currentSemester;
            const cardClasses = isActive
              ? "shadow-lg hover:shadow-xl transition-all"
              : "shadow-md opacity-60 cursor-not-allowed";

            return (
              <Card key={semesterData.sem} className={cardClasses}>
                <CardContent className="p-6">
                  {/* Semester Header */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-gradient-to-br ${
                          isActive
                            ? semesterData.color
                            : semesterData.disabledColor
                        } p-3 rounded-lg shadow-md`}
                      >
                        {isActive ? (
                          <Calendar className="text-white" size={32} />
                        ) : (
                          <Lock className="text-white" size={32} />
                        )}
                      </div>
                      <h3
                        className={`text-2xl font-bold ${
                          isActive ? "text-gray-800" : "text-gray-500"
                        }`}
                      >
                        {semesterData.label}
                      </h3>
                    </div>
                    {!isActive && (
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Inactive
                      </span>
                    )}
                  </div>

                  {/* Year Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {semesterData.years.map((year) => (
                      <button
                        key={year.year}
                        onClick={() =>
                          handleNavigateToSchedule(year.year, semesterData.sem)
                        }
                        disabled={!isActive}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 border-gray-200 hover:border-red-800 cursor-pointer group"
                            : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-50"
                        }`}
                      >
                        <div className="text-center">
                          <p
                            className={`text-lg font-bold transition-colors ${
                              isActive
                                ? "text-gray-700 group-hover:text-red-800"
                                : "text-gray-500"
                            }`}
                          >
                            {year.label}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Inactive Message */}
                  {!isActive && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
                      <p className="text-sm text-gray-600 text-center">
                        This semester is currently inactive. Complete the
                        semester transition to access these schedules.
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
