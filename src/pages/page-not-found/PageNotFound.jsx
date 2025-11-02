import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

export default function PageNotFound() {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Large 404 Number */}
        <div className="relative">
          <h1 className="text-[180px] md:text-[220px] font-bold text-gray-300 select-none leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            disableElevation
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              bgcolor: "#800000",
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
            }}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Popular pages:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/" className="text-maroon hover:underline">
              Dashboard
            </Link>
            <Link to="/account" className="text-maroon hover:underline">
              Account
            </Link>
            <Link to="/settings" className="text-maroon hover:underline">
              Settings
            </Link>
            <Link to="/help" className="text-maroon hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
