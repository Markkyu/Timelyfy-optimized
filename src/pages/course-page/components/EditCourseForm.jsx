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
import { useEditTeachersDepartment } from "@hooks/useTeachersDepartment";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCourseForm({ open, onClose, course }) {
  const [courseName, setCourseName] = useState(course?.course_name);
  const [hoursWeek, setHoursWeek] = useState(course?.hours_week);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editTeacherMutation = useEditTeachersDepartment(); // pass the function to the variable to allow mutation

  // Handle function add teacher in department
  const handleEdit = (e) => {
    // e.preventDefault();
    // try {
    //   setLoading(true);
    //   editTeacherMutation.mutate({
    //     teacherId: teacher.teacher_id,
    //     updates: {
    //       first_name: firstName,
    //       last_name: lastName,
    //     },
    //   });
    // } catch (err) {
    //   setError({ message: `Error: ${err.message}` });
    // } finally {
    //   setLoading(false);
    //   onClose();
    // }
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
          Edit Teacher
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleEdit}>
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
