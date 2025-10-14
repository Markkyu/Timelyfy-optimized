// components/TeacherListHeader.jsx
import { Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function ContentHeader({ title, label, count }) {
  return (
    <section className="flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
        <PersonIcon className="text-gray-600" />
      </div>
      <div className="min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <Chip
          label={`${count} ${label}${count > 1 ? "s" : ""}`}
          size="small"
          sx={{
            bgcolor: "#800000",
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </div>
    </section>
  );
}
