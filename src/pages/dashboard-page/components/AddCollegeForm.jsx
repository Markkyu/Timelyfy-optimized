import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
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
import ToastNotification from "@components/ToastNotification";

export default function AddCollegeForm({ open, onClose, addToast }) {
  const [collegeName, setCollegeName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeMajor, setCollegeMajor] = useState("");
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);
  const [toastType, setToastType] = useState("error");

  const queryClient = useQueryClient();

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [open]);

  // Mutation function
  const { mutate, isPending: loading } = useMutation({
    mutationFn: (collegeData) => {
      // throw new Error("Error test"); // simulate error inside mutation
      createCollege(collegeData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
      setCollegeName("");
      setCollegeMajor("");
      setCollegeCode("");
      onClose();

      // setToastMessage("College Program Successfully Added!");
      // setToastType("success");
      // setToastTrigger((prev) => prev + 1);
      addToast("College Program Successfully Added!", "success");
    },

    onError: (error) => {
      console.error(error.message);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    },
  });

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    const collegeData = {
      college_code: collegeCode,
      college_name: collegeName,
      college_major: collegeMajor,
    };

    mutate(collegeData);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          setCollegeName("");
          setCollegeMajor("");
          setCollegeCode("");
          setError(null);
          onClose();
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
            Add College Program
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-2">
            <TextField
              label="College Code"
              value={collegeCode}
              onChange={(e) => {
                setError(null);
                setCollegeCode(e.target.value);
              }}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
              placeholder="BSEd-Math"
              helperText="Must be unique*"
              inputRef={firstInputRef}
            />

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
              placeholder="ex. Mathematics"
            />

            {/* <label htmlFor="">College Program Name</label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="border border-gray-400 p-3 w-full rounded "
              autoFocus
              placeholder="Secondary Education"
            />

            <label htmlFor="">Major (optional)</label>
            <input
              type="text"
              className="border border-gray-400 p-3 w-full rounded"
              value={collegeMajor}
              onChange={(e) => setCollegeMajor(e.target.value)}
              autoFocus
              placeholder="Major in Mathematics"
            /> */}

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
      {/* <ToastNotification
        message={toastMessage}
        trigger={toastTrigger}
        type={toastType}
      /> */}
    </>
  );
}
