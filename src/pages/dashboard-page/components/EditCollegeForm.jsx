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

export default function EditCollegeForm({ open, onClose, college }) {
  const [collegeName, setCollegeName] = useState("");
  const [collegeMajor, setCollegeMajor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const collegeId = college?.college_id;

  useEffect(() => {
    setCollegeName(college?.college_name);
    setCollegeMajor(college?.college_major);
  }, []);

  const queryClient = useQueryClient();

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {
      college_name: collegeName,
      college_major: collegeMajor,
    };

    try {
      setLoading(true);
      await updateCollege(collegeId, updates);
      await queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
      onClose();
    } catch (err) {
      setError(err.message);
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
            Edit College Program
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="College Program Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="off"
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
    </>
  );
}
