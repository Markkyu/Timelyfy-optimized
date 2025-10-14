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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAddCourse } from "@hooks/useCourses";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourseForm({
  open,
  onClose,
  sem,
  college_id,
  year,
}) {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [hoursWeek, setHoursWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCourseMutation = useAddCourse();

  // Handle function add teacher in department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      addCourseMutation.mutate({
        course_code: courseCode,
        course_name: courseName,
        hours_week: hoursWeek,
        course_year: year,
        course_college: college_id,
        semester: sem,
      });
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setCourseName("");
      setCourseCode("");
      setHoursWeek(0);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
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
          Add Subject
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Subject Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Subject Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Hours/ Week"
            value={hoursWeek}
            onChange={(e) => setHoursWeek(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              min: 0,
              max: 10,
            }}
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
            Add Course
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
