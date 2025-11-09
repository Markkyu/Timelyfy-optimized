import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Stack,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ScheduleDetailsDialog({ open, onClose, schedule }) {
  if (!schedule) return null;

  return (
    <Dialog
      TransitionComponent={Grow}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {schedule?.course_name || "Schedule Details"}
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Stack spacing={1.5} mt={1}>
          <Typography variant="body1">
            <strong>Course Code:</strong> {schedule?.course_id}
          </Typography>
          <Typography variant="body1">
            <strong>Class:</strong> {schedule?.class_id}
          </Typography>
          <Typography variant="body1">
            <strong>Teacher:</strong> {schedule?.teacher_name || "Unassigned"}
          </Typography>
          <Typography variant="body1">
            <strong>Room:</strong> {schedule?.room_name || "Not Set"}
          </Typography>
          <Typography variant="body1">
            <strong>Day:</strong> {schedule?.day_name}
          </Typography>
          <Typography variant="body1">
            <strong>Time:</strong> {schedule?.start_time} - {schedule?.end_time}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          onClick={onClose}
          variant="contained"
          color="inherit"
          sx={{ fontWeight: 600 }}
          disableElevation
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
