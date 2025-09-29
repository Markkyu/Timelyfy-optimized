import { useState } from "react";

// Material Icons and Components
import { IconButton, Tooltip, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";
import EditCourseForm from "./EditCourseForm";
import { useDeleteCourse } from "@hooks/useCourses";

export default function CourseCard({ course }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteCourseMutation = useDeleteCourse();

  const handleDelete = () => {
    console.log("first");
    deleteCourseMutation.mutate(course.course_id);
    console.log("first");
  };

  const handleTeacher = () => {
    alert("Editing assigned teacher (🚧 working on it 🚧)");
  };

  if (!course) {
    return (
      <div className="mb-3 p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-400">
        No courses available
      </div>
    );
  }

  return (
    <div className="p-2 border-b border-gray-200 flex justify-between items-center">
      {/* Course Details */}
      <div>
        <p className="m-1 font-semibold">{course.course_name}</p>
        <p className="m-1">
          <span>Hrs/week:</span> {course.hours_week}
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
          <IconButton onClick={handleTeacher}>
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
    </div>
  );
}
