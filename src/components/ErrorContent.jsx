import { lazy } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ErrorContent({ errorTitle, error }) {
  return (
    <div className="w-100 flex flex-col items-center justify-center h-64 bg-red-100 border border-red-200 text-red-700 p-8 rounded-2xl shadow-lg">
      <div className="bg-red-200 p-4 rounded-full mb-4">
        <WarningAmberIcon className="text-red-600" sx={{ fontSize: 32 }} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{errorTitle}</h3>
      <p className="text-red-600 text-center max-w-md">
        {error.message || "An error occurred"}
      </p>
    </div>
  );
}
