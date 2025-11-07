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
import { formatCode } from "./formatCode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@api/coursesAPI";
import createCourseQueryById from "@hooks/createCourseQueryById";

export default function EditCourseForm({
  open,
  onClose,
  course,
  collegeName,
  collegeMajor,
}) {
  const [courseCode, setCourseCode] = useState(course?.course_code);
  const [courseName, setCourseName] = useState(course?.course_name);
  const [hoursWeek, setHoursWeek] = useState(course?.hours_week);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState("error");

  const queryClient = useQueryClient();

  const { mutate: updateCourseMutation, isPending: loading } = useMutation({
    mutationFn: updateCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createCourseQueryById.queryKey,
      });

      setErrorType("success");
      setError("Updated successfully!");

      onClose();
    },

    onError: (error) => {
      console.error(error.message);
      setErrorType("error");
      setError(error.message);
    },
  });

  // Handle function edit course
  const handleEdit = (e) => {
    e.preventDefault();

    const newCourseId = formatCode(collegeName, collegeMajor, courseCode);

    // console.log("Course: ", course);
    console.log(newCourseId);

    updateCourseMutation({
      // courseId: course.course_surrogate_id,
      courseId: newCourseId,
      updates: {
        // course_id: newCourseId,
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
          {error && <Alert severity="success">{error}</Alert>}

          <form onSubmit={handleEdit}>
            <TextField
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled
            />

            <TextField
              label="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
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
