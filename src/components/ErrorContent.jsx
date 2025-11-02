import { AlertTriangle, RefreshCcw, Home, Bug } from "lucide-react";
import { Button } from "@mui/material";

export default function ErrorContent({
  errorTitle,
  error,
  onRetry,
  showHomeButton = false,
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-64 p-8">
      {/* Animated Error Icon Container */}
      <div className="relative mb-6">
        {/* Pulsing Background Circle */}
        <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-75"></div>

        {/* Static Background Circle */}
        <div className="relative bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-full shadow-2xl">
          <AlertTriangle className="text-white" size={48} strokeWidth={2.5} />
        </div>

        {/* Floating Bug Icon */}
        <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full shadow-lg animate-pulse">
          <Bug className="text-white" size={16} />
        </div>
      </div>

      {/* Error Title with Gradient */}
      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
        {errorTitle || "Oops! Something Went Wrong"}
      </h3>

      {/* Error Message */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 max-w-md">
        <p className="text-red-700 text-center text-sm leading-relaxed">
          {error?.response?.data?.message ||
            error?.message ||
            "An unexpected error occurred. Please try again."}
        </p>
      </div>

      {/* Helpful Message */}
      <p className="text-gray-600 text-sm text-center mb-6 max-w-md">
        Don't worry! This happens sometimes. Try refreshing the page or contact
        support if the problem persists.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="contained"
          startIcon={<RefreshCcw size={18} />}
          onClick={handleRetry}
          sx={{
            bgcolor: "#dc2626",
            fontWeight: 600,
            borderRadius: "20px",
            px: 3,
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(220, 38, 38, 0.4)",
            "&:hover": {
              bgcolor: "#b91c1c",
              boxShadow: "0 6px 20px 0 rgba(220, 38, 38, 0.5)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Try Again
        </Button>

        {showHomeButton && (
          <Button
            variant="outlined"
            startIcon={<Home size={18} />}
            onClick={handleGoHome}
            sx={{
              borderColor: "#dc2626",
              color: "#dc2626",
              fontWeight: 600,
              borderRadius: "20px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              "&:hover": {
                borderColor: "#b91c1c",
                bgcolor: "rgba(220, 38, 38, 0.04)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Go Home
          </Button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
