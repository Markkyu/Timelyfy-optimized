import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useAuthStore from "@stores/useAuthStore";

export default function UnauthorizedPage() {
  const { logout } = useAuthStore();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 text-center space-y-6 p-8 rounded-2xl shadow-md">
        <h1 className="text-7xl font-bold text-gray-800 animate-pulse">
          Sorry!
        </h1>
        <p className="text-gray-600 my-4 text-2xl md:text-xl ">
          You are not authorized to access
        </p>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
        >
          Back to Dashboard
        </Button>{" "}
        <Button
          component={Link}
          to="/login" // navigate back to login page
          variant="contained"
          sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
          onClick={logout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
