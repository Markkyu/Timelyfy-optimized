import { Button } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

export default function UserCard({ user }) {
  return (
    <div
      key={user.user_id}
      className="bg-white shadow-sm rounded-xl border p-6 flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
        <p className="text-sm text-gray-500">
          {user.college_name || "No program assigned"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          startIcon={<AssignmentIndIcon />}
          variant="contained"
          sx={{ borderRadius: "20px", fontWeight: 600 }}
        >
          Assign Department
        </Button>
      </div>
    </div>
  );
}
