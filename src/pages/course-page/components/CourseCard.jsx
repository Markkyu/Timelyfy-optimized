// React
import { useState } from "react";
import { useParams } from "react-router-dom";

// Material Icons and Components
import { IconButton, Tooltip, Stack, Chip, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteConfirmDialog from "@components/DeleteConfirmDialog";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ShareIcon from "@mui/icons-material/Share";

// components
import EditCourseForm from "./EditCourseForm";
import AssignTeacherForm from "./AssignTeacherForm";

// hooks
import { useDeleteCourse } from "@hooks/useCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "@api/coursesAPI";
import createCourseQueryOptions from "@hooks/createCourseQueryOptions";
import createCourseQueryById from "@hooks/createCourseQueryById";
import RenderOnUser from "@components/RenderOnUser";
import MergeCourse from "./MergeCourseForm";
import MergeCourseDialog from "./MergeCourseDialog";
import RenderWhenRole from "@components/RenderWhenRole";
import ToastNotification from "@components/ToastNotification";

export default function CourseCard({
  course,
  collegeName,
  collegeMajor,
  openMerge,
  collegeCode,
  // onEdit,
  // onAssign,
  onDelete,
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [teacherAssign, setTeacherAssign] = useState(false);

  const assignedTeacher = `${course?.first_name} ${course?.last_name}`; // concat teacher name
  const isPlotted = !!course?.is_plotted; // translate to boolean
  const isMerged = course?.merge_colleges; // if there is merge (truthy)

  const { college_id } = useParams();

  const queryClient = useQueryClient();

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);

  const { mutate: courseDeleteMutation, isPending: loading } = useMutation({
    mutationFn: (courseId) => deleteCourse(courseId),

    onSuccess: (data, courseId) => {
      queryClient.setQueryData(["course", college_id], (old) => {
        if (!old) return [];

        return old.filter((c) => c.course_id != data.id);
      });

      setToastMessage("Subject Deleted");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);

      setDeleteOpen(false);
    },

    onError: (error) => {
      setToastMessage("Error deleting subject");
      setToastType("error");
      setToastTrigger((prev) => prev + 1);
      console.error(error.message);
    },
  });

  const handleDelete = () => {
    courseDeleteMutation(course.course_id);
  };

  const handleToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastTrigger((prev) => prev + 1);
  };

  if (!course) {
    return (
      <div className="mb-3 p-4 border-2 border-dashed border-gray-300 rounded-md text-center italic text-gray-400">
        No subjects available
      </div>
    );
  }

  return (
    <div
      key={course.course_id}
      className={`relative p-2 
        ${isMerged ? "rounded-md border-yellow-500 border-2 bg-amber-50" : "border-b"}  
    border-gray-200 flex justify-between items-center`}
    >
      {isMerged ? (
        <div className="absolute -top-3 left-2 rounded-xl text-sm font-semibold text-gray-900 bg-amber-50 px-2 border-yellow-500 border-2">
          Merged with {isMerged}
        </div>
      ) : (
        ""
      )}
      {/* Course Details */}
      <div>
        <p className="m-1 font-semibold">
          {course.course_code}: {course.course_name}
        </p>
        <span className="m-1">
          <b>{course.hours_week}</b> Hrs/wk
          <span className="ml-2 space-x-2">
            <Chip
              size="small"
              color={course?.first_name ? "success" : "error"}
              label={course?.first_name ? assignedTeacher : "TBA"}
            />
            <span>➜</span>
            <Chip
              size="small"
              color={course?.room_name ? "info" : "error"}
              label={course?.room_name ? course?.room_name : "TBA"}
            />
          </span>
        </span>
      </div>

      {/* Course Actions */}

      <Stack
        direction="row"
        className="bg-gray-50 border-1 border-gray-300 shadow-md rounded-xl"
      >
        {isPlotted && (
          <Tooltip title="Locked — remove from scheduler first">
            <Chip
              size="small"
              color="warning"
              label="Plotted"
              icon={<LockIcon sx={{ fontSize: 18 }} />}
            />
          </Tooltip>
        )}
        <RenderOnUser createdBy={course.created_by}>
          {/* Merging Check */}
          <RenderWhenRole role={["admin", "master_scheduler"]}>
            <Tooltip
              title={
                isPlotted
                  ? "Remove from scheduler first"
                  : "Merge with Another College"
              }
            >
              <span>
                <IconButton
                  // onClick={() => !isPlotted && setMergeOpen(true)}
                  onClick={() => !isPlotted && openMerge(course)}
                  disabled={isPlotted}
                >
                  <ShareIcon color={isPlotted ? "disabled" : "warning"} />
                </IconButton>
              </span>
            </Tooltip>
          </RenderWhenRole>

          {/* Edit Course Button */}
          <Tooltip title={isPlotted ? "Remove from scheduler first" : "Edit"}>
            <span>
              <IconButton
                onClick={() => !isPlotted && setEditOpen(true)}
                // onClick={() => !isPlotted && onEdit(course)}
                disabled={isPlotted}
              >
                <EditSquareIcon color={isPlotted ? "disabled" : "info"} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Assign Teacher and Room Button */}
          <Tooltip title={isPlotted ? "Remove from scheduler first" : "Assign"}>
            <span>
              <IconButton
                onClick={() => !isPlotted && setTeacherAssign(true)}
                // onClick={() => !isPlotted && onAssign(course)}
                disabled={isPlotted}
              >
                <AssignmentIndIcon color={isPlotted ? "disabled" : "success"} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Delete Course Button */}
          <Tooltip title={isPlotted ? "Remove from scheduler first" : "Delete"}>
            <span>
              <IconButton
                onClick={() => !isPlotted && setDeleteOpen(true)}
                // onClick={() => !isPlotted && onDelete(course)}
                disabled={isPlotted}
              >
                <DeleteIcon color={isPlotted ? "disabled" : "error"} />
              </IconButton>
            </span>
          </Tooltip>
        </RenderOnUser>
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
        collegeName={collegeName}
        collegeMajor={collegeMajor}
        collegeCode={collegeCode}
        editToast={handleToast}
      />

      <AssignTeacherForm
        open={teacherAssign}
        onClose={() => setTeacherAssign(false)}
        courseId={course.course_id}
        onToast={handleToast}
      />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        trigger={toastTrigger}
      />
    </div>
  );
}
