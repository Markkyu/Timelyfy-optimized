// components/PageHeader.jsx
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

export default function PageHeader({ description }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <Button
        component={Link}
        variant="extended"
        size="small"
        to={"/"}
        sx={{
          borderRadius: "30px",
          fontWeight: 600,
          bgcolor: "maroon",
          color: "white",
        }}
      >
        <ChevronLeftRoundedIcon />
        Go Back
      </Button>

      <div className="flex items-center justify-center sm:justify-end">
        <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <Typography
            variant="body2"
            className="text-amber-700 font-medium text-sm sm:text-base"
          >
            💡 {description || "Insert description."}
          </Typography>
        </div>
      </div>
    </header>
  );
}
