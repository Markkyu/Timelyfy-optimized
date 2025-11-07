import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAuthStore from "@stores/useAuthStore";

export default function CourseList({
  courses,
  courses_error,
  courses_loading,
  selectedCourse,
  setSelectedCourse,
  selectedCourseOriginalHours,
  setSelectedCourseOriginalHours,
  setToastMessage,
  children,
}) {
  const handleSelect = (course) => {
    setSelectedCourse((prev) => {
      if (prev?.course_id == course.course_id) {
        setSelectedCourseOriginalHours(null);
        return null;
      } else {
        setSelectedCourseOriginalHours(course);
        return course;
      }
    });
  };

  const checkOriginalCourse = selectedCourse === selectedCourseOriginalHours;

  if (courses_error) {
    return (
      <section className="w-full h-full border-t-6 border-t-red-800 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Available Courses
        </h2>
        <div className="py-4">{children}</div>
        <div className="w-full bg-white rounded-xl p-2 border border-red-600 text-center">
          <h1 className="text-red-600 text-xl font-bold">
            Error Loading Courses
          </h1>
          <span className="text-gray-700 underline">
            {courses_error?.message}
          </span>
        </div>
      </section>
    );
  }

  if (courses_loading) {
    const repeatCards = Array.from({ length: 6 }, (x, i) => i);

    return (
      <section className="w-full h-full border-t-6 border-t-red-800 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Available Courses
        </h2>
        <div className="py-4">{children}</div>
        <div className="grid grid-cols-1 gap-4">
          {repeatCards.map((x, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (courses?.length === 0)
    return (
      <section className="h-full p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Available Courses
        </h2>

        <h5 className="text-gray-500 text-lg text-center italic">
          No courses found. Add a course in the courses page.
        </h5>
        <div className="mt-8">{children}</div>
      </section>
    );

  return (
    <section className="h-full p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-red-800 mb-4">
        Available Courses
      </h2>

      <div className="py-4">{children}</div>

      <div className="grid grid-cols-4 2xl:flex 2xl:flex-col gap-4">
        {courses?.map((course) => {
          const isSelected = selectedCourse?.course_id === course.course_id;
          const isPlotted = course.is_plotted;

          return isPlotted ? (
            <LockCourseCard key={course.course_id} course={course} />
          ) : (
            <CourseCard
              key={course.course_id}
              course={course}
              isSelected={isSelected}
              onClick={() => {
                if (
                  !selectedCourse ||
                  selectedCourse.hours_week === 0 ||
                  checkOriginalCourse
                ) {
                  handleSelect(course);
                } else {
                  setToastMessage(""); // set toast message callback function
                }
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

// LOCKED COURSE CARD
const LockCourseCard = ({ course }) => {
  const teacherFullName = course.first_name
    ? `${course.first_name} ${course.last_name}`
    : null;

  const assignedRoom = course.room_name;

  return (
    <div className="p-5 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md relative select-none">
      {/* Lock Badge */}
      <div className="absolute -top-3 -right-3 bg-amber-500 text-white rounded-full p-2 shadow-lg">
        <LockIcon className="text-lg" />
      </div>

      <div className="flex flex-col gap-3">
        {/* Course Info */}
        <div>
          <p className="font-bold text-lg text-gray-900 mb-1">
            {course.course_code}
          </p>
          <p className="text-sm text-gray-700 leading-tight">
            {course.course_name}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <AccessTimeIcon fontSize="small" className="text-amber-600" />
            <span className="font-medium">{course.hours_week} hrs/week</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <CoPresentIcon fontSize="small" className="text-amber-600" />
            <span
              className={`font-medium ${teacherFullName ? "" : "text-red-600"}`}
            >
              {teacherFullName || "No Teacher"}
            </span>
            <span
              className={`font-medium ${assignedRoom ? "" : "text-red-600"}`}
            >
              {assignedRoom || "No Room"}
            </span>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mt-2 pt-3 border-t border-amber-300">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            🔒 Already Plotted
          </p>
        </div>
      </div>
    </div>
  );
};

// UNLOCKED COURSE CARD
const CourseCard = ({ course, isSelected, onClick }) => {
  const teacherFullName = course.first_name
    ? `${course.first_name} ${course.last_name}`
    : null;

  const { user } = useAuthStore();

  const assignedRoom = course.room_name;

  const nRNTA = !assignedRoom && !teacherFullName;

  const createdBy = course.created_by == user.id;

  return (
    <div
      onClick={onClick}
      className={`relative group p-5 rounded-2xl border-2 shadow-md transition-all duration-200 
        ${nRNTA ? "pointer-events-none cursor-not-allowed border-red-300 bg-red-50/50" : ""}
        ${
          !createdBy
            ? "pointer-events-none cursor-not-allowed border-gray-300 bg-gray-50/70 opacity-60"
            : "cursor-pointer hover:shadow-xl hover:-translate-y-1"
        }
        ${
          isSelected
            ? "border-red-700 bg-gradient-to-br from-red-50 to-pink-50 ring-2 ring-red-600 shadow-lg"
            : createdBy
              ? "border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 hover:border-blue-400"
              : ""
        }`}
    >
      {/* Status Badges */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          SELECTED
        </div>
      )}
      {!createdBy && (
        <div className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          NOT YOURS
        </div>
      )}

      {/* Course Info */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-bold text-lg text-gray-900 mb-1">
            {course.course_code}
          </p>
          <p className="text-sm text-gray-700 leading-tight">
            {course.course_name}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2">
            <AccessTimeIcon
              fontSize="small"
              className={isSelected ? "text-red-600" : "text-blue-600"}
            />
            <span className="font-semibold text-gray-800">
              {course.hours_week} hrs/week
            </span>
          </div>

          {nRNTA ? (
            <div className="flex items-start gap-2 bg-red-100 border border-red-300 rounded-lg p-2">
              <span className="text-red-700 font-semibold text-xs leading-tight">
                ⚠️ Missing: Either a teacher or room must be assigned
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <CoPresentIcon
                  fontSize="small"
                  className={
                    teacherFullName
                      ? isSelected
                        ? "text-red-600"
                        : "text-blue-600"
                      : "text-rose-600"
                  }
                />
                <span
                  className={`font-semibold ${
                    teacherFullName
                      ? isSelected
                        ? "text-red-700"
                        : "text-blue-700"
                      : "text-red-600"
                  }`}
                >
                  {teacherFullName || "⚠️ No Teacher"}
                </span>
                <span
                  className={`font-semibold ${
                    teacherFullName
                      ? isSelected
                        ? "text-red-700"
                        : "text-blue-700"
                      : "text-red-600"
                  }`}
                >
                  ⇆
                </span>
                <span
                  className={`font-semibold ${
                    assignedRoom
                      ? isSelected
                        ? "text-red-700"
                        : "text-blue-700"
                      : "text-red-600"
                  }`}
                >
                  {assignedRoom || "⚠️ No Room"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Owner Indicator */}
        {createdBy && (
          <div className="pt-3 border-t border-blue-200">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Your Course
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// LOADING COURSE CARD (Skeleton)
const LoadingCard = () => {
  return (
    <div className="relative p-5 rounded-2xl border-2 border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2 flex-1">
          <div className="h-5 w-28 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
