// React
import { useState } from "react";
// Material Icons and Components
import { IconButton, Tooltip, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";
// components
import EditCourseForm from "./EditCourseForm";
import AssignTeacherForm from "./AssignTeacherForm";
// hooks
import { useDeleteCourse } from "@hooks/useCourses";

export default function CourseCard({ course }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [teacherAssign, setTeacherAssign] = useState(false);

  const deleteCourseMutation = useDeleteCourse();

  const assignedTeacher = `${course?.first_name} ${course?.last_name}`;

  const handleDelete = () => {
    console.log("first");
    deleteCourseMutation.mutate(course.course_id);
    console.log("first");
  };

  if (!course) {
    return (
      <div className="mb-3 p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-400">
        No subjects available
      </div>
    );
  }

  return (
    <div className="p-2 border-b border-gray-200 flex justify-between items-center">
      {/* Course Details */}
      <div>
        <p className="m-1 font-semibold">
          {course.course_code}: {course.course_name}
        </p>
        <p className="m-1">
          <b>{course.hours_week}</b> Hrs/wk
          <span
            className={`ml-2 rounded-full border px-2 ${course?.first_name ? `text-blue-600` : `text-red-600`}`}
          >
            {course?.first_name ? assignedTeacher : "Unassigned"}
          </span>
        </p>
      </div>

      {/* Course Actions */}
      <Stack direction="row" className="bg-gray-100 shadow-md rounded-xl">
        <Tooltip title="Edit Course">
          <IconButton onClick={() => setEditOpen(true)}>
            <EditSquareIcon color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assign Teacher">
          <IconButton onClick={() => setTeacherAssign(true)}>
            <AssignmentIndIcon color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Course">
          <IconButton onClick={() => setDeleteOpen(true)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </Stack>

      <DeleteConfirmDialog
        onClose={() => setDeleteOpen(false)}
        open={deleteOpen}
        handleDelete={handleDelete}
        title={"Delete Course"}
        desc={"Are you sure you want to delete this course?"}
      />

      <EditCourseForm
        key={course.id}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        course={course}
      />

      <AssignTeacherForm
        open={teacherAssign}
        onClose={() => setTeacherAssign(false)}
        courseId={course.course_id}
      />
    </div>
  );
}
