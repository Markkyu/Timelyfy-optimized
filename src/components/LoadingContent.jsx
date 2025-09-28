import React from "react";

export default function LoadingContent({ loadingTitle, loadingDesc }) {
  return (
    <>
      <section className="flex space-x-2 mb-4 ">
        <div className="w-3 h-3 bg-red-800 rounded-full animate-bounce" />
        <div
          className="w-3 h-3 bg-red-800 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="w-3 h-3 bg-red-800 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
      </section>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Loading {loadingTitle}
      </h3>
      <p className="text-gray-500">{loadingDesc}</p>
    </>
  );
}
