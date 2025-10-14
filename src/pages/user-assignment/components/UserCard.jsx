import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignCollegeForm from "./AssignCollegeForm";
import useAssignedColleges from "@hooks/useAssignedColleges";

export default function UserCard({ user }) {
  const [open, setOpen] = useState(false);

  const {
    data: assignedColleges,
    isLoading,
    isError,
  } = useAssignedColleges(user.id);

  return (
    <div className="bg-white shadow-md rounded-xl border p-6 flex items-center justify-between hover:border-red-500 transition">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {user.username}
        </h3>

        {/* Display Assigned Colleges */}
        {isLoading ? (
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <CircularProgress size={14} /> Loading...
          </p>
        ) : isError ? (
          <p className="text-red-500 text-sm mt-1">Error loading colleges</p>
        ) : assignedColleges?.length > 0 ? (
          <p className="text-sm text-gray-600 mt-1">
            Assigned to:{" "}
            <span className="font-medium text-gray-800">
              {assignedColleges.map((c) => c.college_name).join(", ")}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-1 italic">
            No colleges assigned
          </p>
        )}
      </div>

      <Button
        startIcon={<AssignmentIndIcon />}
        variant="contained"
        sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
        onClick={() => setOpen(true)}
      >
        Assign Department
      </Button>

      <AssignCollegeForm
        open={open}
        onClose={() => setOpen(false)}
        userId={user.id}
      />
    </div>
  );
}

// import { Button } from "@mui/material";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import useAssignedColleges from "@hooks/useAssignedColleges";

// export default function UserCard({ user }) {
//   const {
//     data: assignedColleges,
//     isPending: assignedColleges_loading,
//     error: assignedColleges_error,
//   } = useAssignedColleges(user.id);

//   const handleAssignDepartment = () => {
//     console.log(assignedColleges);
//   };

//   return (
//     <div
//       key={user.id}
//       className="bg-white shadow-md rounded-xl border p-6 flex items-center justify-between hover:border-red-500 transition"
//     >
//       <div>
//         <h3 className="text-2xl font-semibold text-gray-800">
//           {user.username}
//         </h3>
//         <p>
//           <span className="px-1 border rounded-full text-gray-500">
//             {user.role || "No Role Assigned"}
//           </span>
//         </p>
//       </div>
//       <div className="flex items-center gap-2">
//         <Button
//           startIcon={<AssignmentIndIcon />}
//           variant="contained"
//           sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
//           onClick={handleAssignDepartment}
//         >
//           Assign Department
//         </Button>
//       </div>
//     </div>
//   );
// }
