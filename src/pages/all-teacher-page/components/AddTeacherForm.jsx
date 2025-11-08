import { useState, forwardRef, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Typography,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAddTeachersDepartment } from "@hooks/useTeachersDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "@api/teachersAPI";
import createTeacherQueryOptions from "@hooks/createTeacherQueryOptions";
import ToastNotification from "@components/ToastNotification";

export default function TeacherForm({ open, onClose, department, teacher }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [openSchedule, setOpenSchedule] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);
  const [toastType, setToastType] = useState("error");

  const addTeacherMutation = useAddTeachersDepartment();

  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (teacherData) => createTeacher(teacherData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createTeacherQueryOptions().queryKey,
      });
      setToastTrigger((prev) => prev + 1);
      setToastMessage("Teacher Added Successfully!");
      setToastType("success");

      setFirstName("");
      setLastName("");
      onClose();
    },

    onError: (error) => {
      console.error(error.message);
      setError("Error");
    },
  });

  // Handle function add teacher in department
  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherData = {
      first_name: firstName,
      last_name: lastName,
      teacher_availability: "full",
    };

    mutate(teacherData);
  };

  const lastNameRef = useRef(null);

  // Focus username when dialog opens
  useEffect(() => {
    if (lastNameRef.current) {
      lastNameRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          onClose();
          setFirstName("");
          setLastName("");
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
            align="center"
            display="block"
            fontWeight="bold"
            component="span"
          >
            Add Teacher
          </Typography>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={lastNameRef}
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
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
                marginTop: 2,
                fontWeight: 600,
                paddingY: 1.5,
              }}
            >
              Add Teacher
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <ToastNotification
        trigger={toastTrigger}
        message={toastMessage}
        type={toastType}
      />
    </>
  );
}
