// React router import
import { Link } from "react-router-dom";

// Material Icons and Components
import { Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function PageHeader({ onClick }) {
  return (
    <header className="flex items-center justify-between">
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          bgcolor: "#335c67",
          fontWeight: 600,
          borderRadius: "20px",
        }}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>

      <div className="flex items-center gap-3">
        <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
          <Typography variant="body2" className="text-blue-700 font-medium">
            ℹ️ This page is for managing teachers under this specific department
          </Typography>
        </div>

        <Button
          variant="contained"
          endIcon={<PersonAddAlt1Icon />}
          onClick={onClick}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: "30px",
            bgcolor: "#950000",
          }}
        >
          Add Teacher
        </Button>
      </div>
    </header>
  );
}
