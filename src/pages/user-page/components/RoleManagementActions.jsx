import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RenderWhenRole from "@components/RenderWhenRole";
import { useUpdateUserRole } from "@hooks/useUpdateUserRole";

const ROLE_ORDER = ["user", "super_user", "master_scheduler"];

export default function RoleManagementActions({ user, isDeletingUser }) {
  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateUserRole();
  const currentIndex = ROLE_ORDER.indexOf(user?.role);

  const handlePromote = () => {
    if (currentIndex === ROLE_ORDER.length - 1) return;
    const newRole = ROLE_ORDER[currentIndex + 1];

    if (confirm(`Promote ${user.username} to ${newRole}?`)) {
      updateRole({ user_id: user.id, newRole });
    }
  };

  const handleDemote = () => {
    if (currentIndex === 0) return;
    const newRole = ROLE_ORDER[currentIndex - 1];

    if (confirm(`Demote ${user.username} to ${newRole}?`)) {
      updateRole({ user_id: user.id, newRole });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <RenderWhenRole role={["master_scheduler", "admin"]}>
        <Button
          onClick={handlePromote}
          disabled={
            currentIndex === ROLE_ORDER.length - 1 ||
            isUpdatingRole ||
            isDeletingUser
          }
          variant="contained"
          sx={{
            bgcolor: "#335c67",
            fontWeight: 600,
            borderRadius: "20px",
            "&:hover": { bgcolor: "#264653" },
          }}
          endIcon={<KeyboardDoubleArrowUpIcon />}
        >
          Promote
        </Button>
        <Button
          onClick={handleDemote}
          disabled={currentIndex === 0 || isUpdatingRole || isDeletingUser}
          variant="contained"
          sx={{
            bgcolor: "maroon",
            fontWeight: 600,
            borderRadius: "20px",
            "&:hover": { bgcolor: "#8b0000" },
          }}
          endIcon={<KeyboardDoubleArrowDownIcon />}
        >
          Demote
        </Button>
      </RenderWhenRole>
    </div>
  );
}
