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

// components
import EditCourseForm from "./EditCourseForm";
import AssignTeacherForm from "./AssignTeacherForm";

// hooks
import { useDeleteCourse } from "@hooks/useCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "@api/coursesAPI";
import createCourseQueryOptions from "@hooks/createCourseQueryOptions";
import createCourseQueryById from "@hooks/createCourseQueryById";

export default function CourseCard({ course, collegeName, collegeMajor }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [teacherAssign, setTeacherAssign] = useState(false);

  // console.log(course?.course_college);

  const { college_id } = useParams();

  // const deleteCourseMutation = useDeleteCourse();

  const assignedTeacher = `${course?.first_name} ${course?.last_name}`;

  const isPlotted = !!course?.is_plotted; // translate to boolean

  const queryClient = useQueryClient();

  const { mutate: courseDeleteMutation, isPending: loading } = useMutation({
    mutationFn: (courseId) => deleteCourse(courseId),

    onSuccess: (data, courseId) => {
      // queryClient.setQueryData(["course", course.course_college], (old) => {
      //   if (!old) return [];
      //   return old.filter((c) => c.course_id !== courseId);
      // });

      // queryClient.invalidateQueries({
      //   queryKey: ["course"],
      // });

      // console.log(course);
      // console.log(courseId);

      queryClient.setQueryData(["course", college_id], (old) => {
        if (!old) return [];

        return old.filter((c) => c.course_id != data.id);

        // if (!old) return [];
        // return old.filter((c) => data.id != course.course_id);
      });

      setDeleteOpen(false);
    },

    onError: (error) => {
      console.error(error.message);
      // setError(error.message);
    },
  });

  const handleDelete = () => {
    // deleteCourseMutation.mutate(course.course_id);
    courseDeleteMutation(course.course_id);
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
      className="p-2 border-b border-gray-200 flex justify-between items-center"
    >
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
              color={course?.first_name ? "primary" : "error"}
              label={course?.first_name ? assignedTeacher : "TBA"}
            />
            <span>➜</span>
            <Chip
              size="small"
              color={course?.room_name ? "secondary" : "error"}
              label={course?.room_name ? course?.room_name : "TBA"}
            />
          </span>
        </span>
      </div>

      {/* Course Actions */}
      {/* Course Actions */}
      <Stack direction="row" className="bg-gray-100 shadow-md rounded-xl">
        {isPlotted && (
          <Tooltip title="This course is scheduled. Remove it from the timetable first.">
            <Chip
              size="small"
              color="warning"
              label="Plotted"
              icon={<LockIcon sx={{ fontSize: 18 }} />}
              className="mr-2"
            />
          </Tooltip>
        )}

        <Tooltip
          title={isPlotted ? "Remove from scheduler first" : "Assign Teacher"}
        >
          <span>
            <IconButton
              onClick={() => !isPlotted && setTeacherAssign(true)}
              disabled={isPlotted}
            >
              <AssignmentIndIcon color={isPlotted ? "disabled" : "success"} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={isPlotted ? "Remove from scheduler first" : "Edit Course"}
        >
          <span>
            <IconButton
              onClick={() => !isPlotted && setEditOpen(true)}
              disabled={isPlotted}
            >
              <EditSquareIcon color={isPlotted ? "disabled" : "info"} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={isPlotted ? "Remove from scheduler first" : "Delete Course"}
        >
          <span>
            <IconButton
              onClick={() => !isPlotted && setDeleteOpen(true)}
              disabled={isPlotted}
            >
              <DeleteIcon color={isPlotted ? "disabled" : "error"} />
            </IconButton>
          </span>
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
        collegeName={collegeName}
        collegeMajor={collegeMajor}
      />

      <AssignTeacherForm
        open={teacherAssign}
        onClose={() => setTeacherAssign(false)}
        courseId={course.course_id}
      />
    </div>
  );
}
