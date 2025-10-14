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
import EditSchedule from "./EditSchedule";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TeacherForm({ open, onClose, department, teacher }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [openSchedule, setOpenSchedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTeacherMutation = useAddTeachersDepartment();

  // Handle function add teacher in department
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      addTeacherMutation.mutate({
        department: department,
        teacher: {
          first_name: firstName,
          last_name: lastName,
        },
      });
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setFirstName("");
      setLastName("");
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
            Add Teacher
          </Typography>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            {/* <Button
              type="button"
              variant="contained"
              fullWidth
              color="inherit"
              startIcon={<AccessTimeIcon />}
              onClick={() => setOpenSchedule(true)}
              sx={{
                marginTop: 1,
                fontWeight: 600,
                paddingY: 1.5,
              }}
            >
              Set Schedule Availability
            </Button> */}

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
      {/* <EditSchedule
        openSchedule={openSchedule}
        onClose={() => setOpenSchedule(false)}
      /> */}
    </>
  );
}
