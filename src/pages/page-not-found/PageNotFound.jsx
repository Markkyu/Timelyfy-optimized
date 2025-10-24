import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function PageNotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className=" text-center space-y-6">
        <h1 className="text-7xl font-bold text-gray-800 animate-pulse">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 my-4 text-2xl md:text-xl ">
          The page you're looking for doesn't exist.
        </p>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
