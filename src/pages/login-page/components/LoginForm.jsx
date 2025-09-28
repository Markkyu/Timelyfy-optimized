import { useState, forwardRef } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

// Slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginForm({ showLogin, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // const loggedInUser = await login(username, password);
      setShowLogin(false);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={showLogin}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setShowLogin(false)}
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
        <Typography
          variant="h5"
          component="span"
          align="center"
          display="block"
        >
          Login to Timelyfy
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleLoginSubmit} className="space-y-2 mt-2">
          {/* Username */}
          <label htmlFor="email">Username</label>
          <input
            id="email"
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          {/* Show password checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                size="small"
              />
            }
            label={<Typography variant="body2">Show Password</Typography>}
          />
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
            Log In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
