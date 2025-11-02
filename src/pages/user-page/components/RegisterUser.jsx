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

export default function RegisterUser({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  // Mutation function
  const { mutate, isPending: loading } = useMutation({
    mutationFn: (userData) => registerUser(userData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["username"],
      });
      setUsername("");
      setPassword("");
      onClose();
    },

    onError: (error, variables, context) => {
      console.error(error.message);
      console.log(error);
      console.log(variables);
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
          {error && (
            <Alert severity="error">
              {/* <span className="p-2 bg-red-100 border-2 border-red-300 text-red-500 text-center w-full mx-2"> */}
              {error}
              {/* </span> */}
            </Alert>
          )}
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
              Register User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
