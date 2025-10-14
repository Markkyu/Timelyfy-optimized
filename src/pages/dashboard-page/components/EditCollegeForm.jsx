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
import { createCollege } from "@api/getCollegesAPI";
import { useQueryClient } from "@tanstack/react-query";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCollegeForm({ open, onClose }) {
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  // handle function add college
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createCollege({ college_name: collegeName });
      queryClient.invalidateQueries({
        queryKey: createCollegeQueryOptions().queryKey,
      });
    } catch (err) {
      setError({ message: `Error: ${err.message}` });
    } finally {
      setLoading(false);
      setCollegeName("");
      onClose();
    }
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

        <DialogContent>
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
