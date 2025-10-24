// React import
import { useState } from "react";
// Material Icons and Components
import { IconButton, Tooltip, Stack, Chip } from "@mui/material";
import { useDeleteCourse } from "@hooks/useCourses";

export default function CourseCard({ course }) {
  const teacherAvailable = course?.first_name;
  const fullName = `${course?.first_name} ${course?.last_name}`;

  if (!course) {
    return (
      <div className="mb-3 p-4 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-400">
        No courses available
      </div>
    );
  }

  return (
    <div className="p-2 border-b border-gray-200 flex justify-between items-center">
      {/* Course Details */}
      <div>
        <p className="m-1 font-semibold">{course.course_name}</p>
        <span className="m-1">
          <b>{course.hours_week}</b>
          <span>Hrs/week:</span>

          {/* <span
            className={`ml-2 rounded-full border px-2 ${course?.first_name ? `text-blue-600` : `text-red-600`}`}
          >
            {course?.first_name ? fullName : "Unassigned"}
          </span> */}
        </span>
        <Chip
          className="ml-2"
          label={teacherAvailable ? fullName : "Unassigned / TBA"}
          size="small"
          color={teacherAvailable ? "info" : "error"}
        />
      </div>
    </div>
  );
}

{
  /* <span
  className={`ml-2 rounded-full border px-2 ${course?.first_name ? `text-blue-600` : `text-red-600`}`}
>
  {course?.first_name ? assignedTeacher : "Unassigned"}
</span>; */
}
