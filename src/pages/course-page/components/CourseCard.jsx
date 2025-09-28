import { useState } from "react";

// Material Icons and Components
import { IconButton, Tooltip, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export default function CourseCard({ course }) {
  const [openPopup, setOpenPopup] = useState(false);

  const handleEdit = () => {
    setOpenPopup(true);
  };

  const handleDelete = async () => {
    const confirmDeletion = confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDeletion) {
      console.log("Course Deleted");
    }
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
          <IconButton onClick={handleEdit}>
            <EditSquareIcon color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assign Teacher">
          <IconButton onClick={handleTeacher}>
            <AssignmentIndIcon color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Course">
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
}
