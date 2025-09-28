// components/TeacherListHeader.jsx
import { Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function TeacherListHeader({ count }) {
  return (
    <section className="flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-lg">
        <PersonIcon className="text-gray-600" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          All Teaching Staff
        </h2>
        <Chip
          label={`${count} Teacher${count !== 1 ? "s" : ""}`}
          size="small"
          sx={{
            bgcolor: "#800000",
            color: "white",
            fontWeight: 600,
          }}
        />
      </div>
    </section>
  );
}
