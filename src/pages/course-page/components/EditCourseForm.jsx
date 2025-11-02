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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEditCourse } from "@hooks/useCourses";

export default function EditCourseForm({ open, onClose, course }) {
  const [courseCode, setCourseCode] = useState(course?.course_code);
  const [courseName, setCourseName] = useState(course?.course_name);
  const [hoursWeek, setHoursWeek] = useState(course?.hours_week);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editCourseMutation = useEditCourse();

  // Handle function edit course
  const handleEdit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      editCourseMutation.mutate({
        updates: {
          course_id: course?.course_id,
          course_code: courseCode,
          course_name: courseName,
          hours_week: hoursWeek,
          course_year: course?.course_year,
          semester: course?.semester,
          course_college: course?.course_college,
        },
      });
    } catch (err) {
      setError({ message: `Error: ${err.message}` });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Grow}
      keepMounted
      onClose={onClose}
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
        >
          Edit Teacher
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleEdit}>
          <TextField
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            fullWidth
            margin="normal"
            required
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
            inputProps={{ min: 0, max: 10 }}
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
  );
}
