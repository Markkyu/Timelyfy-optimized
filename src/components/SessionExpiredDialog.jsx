import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import useSessionStore from "@stores/useSessionStore";
import { useNavigate } from "react-router-dom";

export default function SessionExpiredDialog() {
  const { sessionExpired, setSessionExpired } = useSessionStore();
  const navigate = useNavigate();

  const handleClose = () => {
    setSessionExpired(false);
    navigate("/login");
  };

  return (
    <Dialog open={sessionExpired} onClose={handleClose}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        Your session has expired. Please log in again to continue.
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ borderRadius: "10px", fontWeight: 600 }}
          disableElevation
          fullWidth
          onClick={handleClose}
          color="error"
          variant="contained"
        >
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
