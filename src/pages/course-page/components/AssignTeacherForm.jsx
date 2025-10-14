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
import Select from "react-select";
import useTeachers from "@hooks/useTeachers";
import { assignTeacherCourse } from "@api/getCoursesAPI";
import { useQueryClient } from "@tanstack/react-query";
import createCourseQueryOptions from "@hooks/createCourseQueryOptions";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AssignTeacherForm({ open, onClose, courseId }) {
  const [courseCode, setCourseCode] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all teachers using TanStack Query
  const { data: teachers, isLoading, isError } = useTeachers();

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeacher) {
      setError("Please select a teacher first!");
      return;
    }

    try {
      setLoading(true);
      await assignTeacherCourse({
        course_id: courseId,
        teacher_id: selectedTeacher.value,
      });
      queryClient.invalidateQueries({
        queryKey: createCourseQueryOptions.queryKey,
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      setError("");
      onClose();
      setSelectedTeacher(null);
    }
  };

  // Prepare teacher options for React Select
  const teacherOptions =
    teachers?.map((t) => ({
      value: t.teacher_id,
      label: `${t.first_name} ${t.last_name}`,
    })) || [];

  teacherOptions.unshift({ value: null, label: "None / Unassign" });

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
        sx={{ position: "absolute", right: 12, top: 12, color: "grey.500" }}
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
          Assign Teacher
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} className="h-95">
          {error && (
            <span className="flex py-1.5 rounded-xl text-red-500 text-lg justify-center bg-red-100">
              {error}
            </span>
          )}
          <div style={{ marginTop: "16px", marginBottom: "8px" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Select Teacher
            </Typography>
            <Select
              options={teacherOptions}
              isLoading={isLoading}
              value={selectedTeacher}
              onChange={(option) => setSelectedTeacher(option)}
              placeholder="Choose a teacher..."
              isClearable
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "maroon",
              marginTop: 2,
              fontWeight: 600,
              paddingY: 1.5,
            }}
          >
            Assign Teacher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
