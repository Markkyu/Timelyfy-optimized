// components/PageHeader.jsx
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PageHeader() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <Link
        to="/"
        className="py-2 px-4 bg-red-800 rounded-full font-bold text-white shadow-md flex items-center justify-center sm:justify-start w-full sm:w-auto"
      >
        <ArrowBackIcon className="mr-2" />
        Go Back
      </Link>

      <div className="flex items-center justify-center sm:justify-end">
        <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <Typography variant="body2" className="text-amber-700 font-medium text-sm sm:text-base">
            ⚠️ Changes require manual refresh for now.
          </Typography>
        </div>
      </div>
    </header>
  );
}
