import { useState, forwardRef, useEffect } from "react";
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
import { updateCollege } from "@api/collegesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastNotification from "@components/ToastNotification";

export default function EditCollegeForm({ open, onClose, college, onToast }) {
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeMajor, setCollegeMajor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);
  const [toastType, setToastType] = useState("error");

  const collegeId = college?.college_id;

  useEffect(() => {
    setCollegeCode(college?.college_code);
    setCollegeName(college?.college_name);
    setCollegeMajor(college?.college_major);
  }, []);

  const queryClient = useQueryClient();

  // const { mutate: updateCollegeMutation, isPending } = useMutation({
  //   mutationFn: (collegeId, updates) => {
  //     updateCollege(collegeId, updates);
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: createCollegeQueryOptions().queryKey,
  //     });

  //     onClose();
  // setToastMessage("College Program Successfully Added!");
  // setToastType("success");
  // setToastTrigger((prev) => prev + 1);
  //   },

  //   onError: (error) => {
  //     console.error(error.message);
  // setError(
  //   error.response?.data?.message ||
  //     error.message ||
  //     "Something went wrong."
  // );
  //   },
  // });

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {
      college_code: collegeCode,
      college_name: collegeName,
      college_major: collegeMajor,
    };

    // updateCollegeMutation(collegeId, updates);

    try {
      setLoading(true);

      // throw new Error("error");
      await updateCollege(collegeId, updates);
      await queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });

      // setToastMessage("College Edited Succesfully!");
      // setToastType("success");
      // setToastTrigger((prev) => prev + 1);

      onToast("College Edited Successfully", "success");

      onClose();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError("An error has occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          onClose();
          setError(null);
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
          >
            Edit College Program
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="College Code"
              value={collegeCode}
              onChange={(e) => setCollegeCode(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
              disabled
            />

            <TextField
              label="College Program Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
              disabled
            />

            <TextField
              label="Major (optional)"
              value={collegeMajor}
              onChange={(e) => setCollegeMajor(e.target.value)}
              fullWidth
              margin="normal"
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
              Edit College
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
