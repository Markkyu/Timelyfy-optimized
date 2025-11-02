import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ShieldX, Home, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-200">
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6 border border-gray-200">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-maroon rounded-full p-6">
                <ShieldX className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Error code */}
          <div className="text-center">
            <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-maroon bg-clip-text text-transparent">
              403
            </p>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Access Denied
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              You don't have permission to access this page. Please contact
              admin if you believe this is a mistake.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              component={Link}
              to="/"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                bgcolor: "maroon",
                textTransform: "none",
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Additional info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Need help? Contact system administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
