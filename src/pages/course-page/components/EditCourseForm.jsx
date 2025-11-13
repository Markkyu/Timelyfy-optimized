import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Slide,
  Typography,
  Grow,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEditCourse } from "@hooks/useCourses";
import { formatCode2 } from "./formatCode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@api/coursesAPI";
import createCourseQueryById from "@hooks/createCourseQueryById";
import { useParams } from "react-router-dom";

export default function EditCourseForm({
  open,
  onClose,
  course,
  collegeName,
  collegeMajor,
  collegeCode,
  editToast,
}) {
  const [courseCode, setCourseCode] = useState(course?.course_code || "");
  const [courseName, setCourseName] = useState(course?.course_name || "");
  const [hoursWeek, setHoursWeek] = useState(course?.hours_week || "");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState("error");

  const { college_id } = useParams();

  const newCourseId = formatCode2(collegeCode, courseCode);

  const queryClient = useQueryClient();

  const { mutate: updateCourseMutation, isPending: loading } = useMutation({
    mutationFn: () => {
      updateCourse;
    },

    onSuccess: () => {
      queryClient.setQueryData(["course", college_id], (oldData) => {
        return oldData.map((course) =>
          course.course_id === newCourseId
            ? {
                ...course,
                course_name: courseName,
                hours_week: hoursWeek,
              }
            : course
        );
      });

      // console.log(course.course_id, newCourseId)

      editToast("Updated Successfully!", "success");

      onClose();
    },

    onError: (error) => {
      console.error(error.message);
      setError(error.message);
      setErrorType("error");
    },
  });

  // Handle function edit course
  const handleEdit = (e) => {
    e.preventDefault();

    updateCourseMutation({
      courseId: course?.course_id,
      updates: {
        course_code: courseCode,
        course_name: courseName,
        hours_week: hoursWeek,
        course_year: course?.course_year,
        semester: course?.semester,
        course_college: course?.course_college,
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          onClose();
          setError(null);
        }}
        fullWidth
        maxWidth="xs"
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>
          <Typography
            variant="h5"
            component="span"
            align="center"
            display="block"
            fontWeight={600}
          >
            Edit Course
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity={errorType}>{error}</Alert>}

          <form onSubmit={handleEdit}>
            <TextField
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled
              helperText="cannot edit"
            />

            <TextField
              label="Course Name"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                setError(null);
              }}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Hours week"
              value={hoursWeek}
              onChange={(e) => setHoursWeek(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ min: 1, max: 8 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              loading={loading}
              loadingPosition="end"
              fullWidth
              sx={{
                bgcolor: "maroon",
                marginTop: 1,
                fontWeight: 600,
                paddingY: 1.5,
              }}
            >
              Edit Course
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
