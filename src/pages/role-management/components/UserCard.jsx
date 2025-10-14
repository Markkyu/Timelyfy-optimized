// Material Icons and Components
import { Button, Avatar, Chip } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
// Custom hook
import { useUpdateUserRole } from "@hooks/useUpdateUserRole";

// define role hierarchy
const ROLE_ORDER = ["user", "super_user", "master_scheduler"];

export default function UserCard({ user }) {
  const { mutate, isPending } = useUpdateUserRole();

  const currentIndex = ROLE_ORDER.indexOf(user.role); // get current role index

  const handlePromote = () => {
    if (currentIndex === ROLE_ORDER.length - 1) return; // Already at top
    const newRole = ROLE_ORDER[currentIndex + 1];

    if (confirm(`Promote ${user.username} to ${newRole}?`)) {
      mutate({ user_id: user.id, newRole });
    }
  };

  const handleDemote = () => {
    if (currentIndex === 0) return; // Already at lowest
    const newRole = ROLE_ORDER[currentIndex - 1];

    if (confirm(`Demote ${user.username} to ${newRole}?`)) {
      mutate({ user_id: user.id, newRole });
    }
  };

  return (
    <div className="group bg-white border border-gray-400 rounded-xl p-6 hover:shadow-md hover:border-red-800 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar
            sx={{
              backgroundImage: "linear-gradient(to bottom right, red, maroon)",
              fontWeight: 600,
            }}
          />

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-red-800 transition-colors truncate">
              {user.username}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Chip
                label={user.role}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleDemote}
            disabled={currentIndex === 0 || isPending}
            variant="contained"
            sx={{
              bgcolor: "maroon",
              fontWeight: 600,
              borderRadius: "20px",
            }}
            endIcon={<KeyboardDoubleArrowDownIcon />}
          >
            Demote
          </Button>
          <Button
            onClick={handlePromote}
            disabled={currentIndex === ROLE_ORDER.length - 1 || isPending}
            variant="contained"
            sx={{
              bgcolor: "#335c67",
              fontWeight: 600,
              borderRadius: "20px",
            }}
            endIcon={<KeyboardDoubleArrowUpIcon />}
          >
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
}

// // Material Icons and Components
// import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import Fab from "@mui/material/Fab";
// import Button from "@mui/material/Button";
// import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

// export default function UserCard({ user }) {
//   return (
//     <div
//       key={user.id}
//       className="group bg-white border border-gray-400 rounded-xl p-6 hover:shadow-md hover:border-red-800 transition-all duration-200"
//     >
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-center gap-3 sm:gap-4">
//           <Avatar
//             sx={{
//               backgroundImage: "linear-gradient(to bottom right, red, maroon)",
//               fontWeight: 600,
//             }}
//           />

//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-red-800 transition-colors truncate">
//               {user.username}
//             </h3>
//             <div className="flex flex-wrap items-center gap-2 mt-2">
//               <Chip
//                 label={user.role}
//                 size="small"
//                 variant="outlined"
//                 sx={{ fontSize: "0.75rem" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-2 justify-end ">
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "maroon", fontWeight: 600, borderRadius: "20px" }}
//             endIcon={<KeyboardDoubleArrowDownIcon />}
//           >
//             Demote
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "#335c67", fontWeight: 600, borderRadius: "20px" }}
//             endIcon={<KeyboardDoubleArrowUpIcon />}
//           >
//             Promote
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
