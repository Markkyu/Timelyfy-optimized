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
import Select from "react-select";
import useTeachers from "@hooks/useTeachers";
import { assignTeacherCourse } from "@api/coursesAPI";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import createCourseQueryOptions from "@hooks/createCourseQueryOptions";
import createTeacherQueryOptions from "@hooks/createTeacherQueryOptions";

import createRoomQueryOptions from "@hooks/createRoomQueryOptions";
import createCourseQueryById from "@hooks/createCourseQueryById";

export default function AssignTeacherForm({ open, onClose, courseId }) {
  const [courseCode, setCourseCode] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch all teachers using TanStack Query
  // const { data: teachers, isLoading, isError } = useTeachers();
  const {
    data: teachers,
    isLoading,
    isError,
  } = useQuery(createTeacherQueryOptions());

  const queryClient = useQueryClient();

  // Fetch rooms when teacher selected
  const teacherId = selectedTeacher?.value;

  const {
    data: rooms,
    isLoading: roomsLoading,
    isError: roomsError,
  } = useQuery(createRoomQueryOptions(teacherId));

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
        room_id: selectedRoom.value,
      });
      queryClient.invalidateQueries({
        queryKey: createCourseQueryById.queryKey,
      });
      onClose();
      setError("");
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      setSelectedTeacher(null);
      setSelectedRoom(null);
    }
  };

  // Prepare teacher options for React Select
  const teacherOptions =
    teachers?.map((t) => ({
      value: t.teacher_id,
      label: `${t.first_name} ${t.last_name}`,
    })) || [];

  teacherOptions.unshift({ value: 0, label: "TBA" });

  // Convert rooms to select options
  const roomOptions =
    rooms?.map((r) => ({
      value: r.room_id,
      label: r.room_name,
    })) || [];

  roomOptions.unshift({ value: 0, label: "TBA" });

  return (
    <Dialog
      open={open}
      TransitionComponent={Grow}
      keepMounted
      onClose={() => {
        setSelectedTeacher(null);
        setSelectedRoom(null);
        setError(null);
        onClose();
      }}
      fullWidth
      maxWidth="sm"
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
          Assign Teacher + Room
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          {/* {error && (
            <span className="flex py-1.5 rounded-xl text-red-500 text-lg justify-center bg-red-100">
              {error}
            </span>
          )} */}
          <section className="flex gap-6 w-full">
            <div className="mt-6 flex-1">
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
                menuPosition="fixed"
                menuShouldScrollIntoView={false}
                styles={{
                  control: (base) => ({ ...base, zIndex: 100, height: "60px" }),
                }}
              />
            </div>

            <div className="mt-6 flex-1">
              <Typography variant="h6" sx={{ mb: 1 }}>
                Select Room
              </Typography>

              <Select
                options={roomOptions}
                isLoading={roomsLoading}
                value={selectedRoom}
                onChange={(option) => setSelectedRoom(option)}
                placeholder={
                  !selectedTeacher
                    ? "Select teacher first..."
                    : "Choose a room..."
                }
                isDisabled={!selectedTeacher}
                isClearable
                menuPosition="fixed"
                menuShouldScrollIntoView={false}
                styles={{
                  control: (base) => ({ ...base, zIndex: 1, height: "60px" }),
                }}
              />
            </div>
          </section>

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
