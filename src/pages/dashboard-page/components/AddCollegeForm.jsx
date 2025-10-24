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
import { useAddTeachersDepartment } from "@hooks/useTeachersDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import { createCollege } from "@api/collegesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCollegeForm({ open, onClose }) {
  const [collegeName, setCollegeName] = useState("");
  const [collegeMajor, setCollegeMajor] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  // Mutation function
  const { mutate, isPending: loading } = useMutation({
    mutationFn: (collegeData) => createCollege(collegeData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
      setCollegeName("");
      setCollegeMajor("");
      onClose();
    },

    onError: (error) => {
      console.error(error.message);
      setError("Error");
    },
  });

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    const collegeData = {
      college_name: collegeName,
      college_major: collegeMajor,
    };

    mutate(collegeData);
  };

  return (
    <>
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
            Add College Program
          </Typography>
        </DialogTitle>

        {error && (
          <div className="flex">
            <span className="p-2 bg-red-100 border-2 border-red-300 text-red-500 text-center w-full mx-2">
              {error}
            </span>
          </div>
        )}

        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-2 mt-2">
            <TextField
              label="College Program Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
              placeholder="ex. Secondary Education"
            />

            <TextField
              label="Major (optional)"
              value={collegeMajor}
              onChange={(e) => setCollegeMajor(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="off"
              placeholder="ex. Major in Mathematics"
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
              Add College
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
