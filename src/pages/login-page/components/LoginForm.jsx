import { useState, forwardRef, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Slide,
  Typography,
  Zoom,
  Grow,
  TextField,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@stores/useAuthStore";

// import Zoom from "@mui/material/Zoom";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  // return <Slide direction="up" ref={ref} {...props} />;
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginForm({ showLogin, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  // Ref for the username input
  const usernameRef = useRef(null);

  // Focus username when dialog opens
  useEffect(() => {
    setAlertMessage("");
    if (showLogin) {
      if (usernameRef.current) {
        setTimeout(() => {
          usernameRef.current.focus();
        }, 100);
      }
    }
  }, [showLogin]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(username, password);

      setAlertType("success");
      setAlertMessage("Login Successful");

      setTimeout(() => {
        setShowLogin(false);
        setUsername("");
        setPassword("");
        navigate("/");
        setLoading(false);
      }, 700);
    } catch (err) {
      setAlertMessage(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={showLogin}
      TransitionComponent={Grow}
      keepMounted
      onClose={() => {
        setShowLogin(false);
        setPassword("");
        setUsername("");
      }}
      fullWidth
      maxWidth="xs"
    >
      {/* Close button */}
      <IconButton
        onClick={() => setShowLogin(false)}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ pb: 1 }}>
        <p className="text-2xl font-semibold text-center">Login to Timelyfy</p>
      </DialogTitle>
      <DialogContent>
        {alertMessage && (
          <Alert severity={`${alertType}`} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleLoginSubmit} className="space-y-4 mt-2">
          {/* Username */}
          {/* <label htmlFor="usernameInput">Username</label>
          <input
            id="usernameInput"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            required
          /> */}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            autoComplete="off"
            inputRef={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password */}
          {/* <label htmlFor="passwordInput">Password</label>
          <input
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            autoComplete="off"
            required
          /> */}

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            required
          />

          <div>
            <input
              id="showPassword"
              type="checkbox"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="text-gray-600" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "maroon",
              py: 1.2,
              fontWeight: "bold",
            }}
            loading={loading}
            loadingPosition="end"
          >
            Log in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
