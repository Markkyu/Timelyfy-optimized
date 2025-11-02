import React from "react";
import { Loader2, Clock, Sparkles } from "lucide-react";

export default function LoadingContent({
  loadingTitle,
  loadingDesc,
  variant = "default",
}) {
  // Different loading variants
  if (variant === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          {/* Spinning outer ring */}
          <div className="w-20 h-20 border-4 border-red-200 rounded-full animate-spin border-t-red-800"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-full animate-pulse"></div>
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="text-red-800 animate-spin" size={24} />
          </div>
        </div>

        {loadingTitle && (
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            {loadingTitle}
          </h3>
        )}
        {loadingDesc && (
          <p className="text-gray-500 text-center max-w-md">{loadingDesc}</p>
        )}
      </div>
    );
  }

  // Default variant with enhanced animations
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated Icon Container */}
      <div className="relative mb-6">
        {/* Rotating gradient circle */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-600 to-red-400 rounded-full animate-spin opacity-20 blur-sm"></div>

        {/* Main loading icon container */}
        <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-5 rounded-full shadow-xl">
          <Clock
            className="text-white animate-pulse"
            size={40}
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Title with shimmer effect */}
      {loadingTitle && (
        <h3 className="text-2xl font-bold text-gray-800 mb-2 relative">
          <span className="relative inline-block">
            {loadingTitle}
            {/* <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer"></span> */}
          </span>
        </h3>
      )}

      {/* Description */}
      {loadingDesc && (
        <p className="text-gray-600 text-center max-w-md mb-6">{loadingDesc}</p>
      )}

      {/* Animated dots */}
      <section className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-800 rounded-full animate-bounce shadow-lg" />
        <div
          className="w-3 h-3 bg-red-700 rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="w-3 h-3 bg-red-600 rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.2s" }}
        />
      </section>
    </div>
  );
}
