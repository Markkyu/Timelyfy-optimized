import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import useAuthStore from "@stores/useAuthStore";
import useSessionStore from "@stores/useSessionStore";
import { useNavigate } from "react-router-dom";

export default function SessionExpiredDialog() {
  const { logout } = useAuthStore();
  const { sessionExpired, setSessionExpired } = useSessionStore();
  const navigate = useNavigate();

  // const handleClose = () => {
  //   logout();
  //   setSessionExpired(false);
  //   navigate("/login");
  // };

  return (
    <Dialog open={sessionExpired}>
      <DialogTitle>Token Expired</DialogTitle>
      <DialogContent>
        Your token has expired. Please log in again to continue.
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ borderRadius: "10px", fontWeight: 600 }}
          disableElevation
          fullWidth
          // onClick={handleClose}
          onClick={() => {
            logout();
            setSessionExpired(false);
            navigate("/login");
          }}
          color="error"
          variant="contained"
        >
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
