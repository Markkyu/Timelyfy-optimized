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
import { useAddTeachersDepartment } from "@hooks/useTeachersDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import { createCollege } from "@api/collegesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@api/registerUser";
import useUsers from "@hooks/useUsers";
import ToastNotification from "@components/ToastNotification";

export default function RegisterUser({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);

  const queryClient = useQueryClient();

  // Mutation function
  const { mutate, isPending: loading } = useMutation({
    mutationFn: (userData) => registerUser(userData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setToastMessage("New user created successfully!");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);

      setUsername("");
      setPassword("");
      onClose();
    },

    onError: (error, variables, context) => {
      console.error(error.message);
      console.log(error);
      setError(error?.message);
    },
  });

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    mutate(userData);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          onClose();
          setUsername("");
          setPassword("");
          setError("");
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
            Register a User
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography variant="p" component="span" color="gray">
            Note: This is for initial login only. We suggest the user requests
            for a password change after their credentials are given.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-2 mt-2">
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
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
              Create New User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <ToastNotification
        message={toastMessage}
        trigger={toastTrigger}
        type={toastType}
      />
    </>
  );
}
