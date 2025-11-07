import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RenderWhenRole from "@components/RenderWhenRole";
import { useUpdateUserRole } from "@hooks/useUpdateUserRole";
import useAuthStore from "@stores/useAuthStore";
import { useState } from "react";

const ROLE_ORDER = ["user", "super_user", "master_scheduler", "admin"];

export default function RoleManagementActions({ user, isDeletingUser }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [targetRole, setTargetRole] = useState(null);

  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateUserRole();
  const currentIndex = ROLE_ORDER.indexOf(user?.role);
  const { user: getUserStore } = useAuthStore();
  const { role } = getUserStore;

  const handlePromote = () => {
    if (currentIndex === ROLE_ORDER.length - 1) return;
    const newRole = ROLE_ORDER[currentIndex + 1];

    if (newRole === "admin" && role !== "admin") {
      alert("Only an admin can promote someone to admin.");
      return;
    }

    setTitle(`Promote ${user.username}?`);
    setDesc(`Are you sure you want to promote ${user.username} to ${newRole}?`);
    setTargetRole(newRole);
    setOpen(true);
  };

  const handleDemote = () => {
    if (currentIndex === 0) return;
    const newRole = ROLE_ORDER[currentIndex - 1];

    if (newRole === "master_scheduler" && role !== "admin") {
      alert("Only an admin can demote someone to master scheduler.");
      return;
    }

    setTitle(`Demote ${user.username}?`);
    setDesc(`Are you sure you want to demote ${user.username} to ${newRole}?`);
    setTargetRole(newRole);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (!targetRole) return;
    updateRole({ user_id: user.id, newRole: targetRole });
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <RenderWhenRole role={["master_scheduler", "admin"]}>
        <Button
          onClick={handlePromote}
          disabled={
            currentIndex === ROLE_ORDER.length - 1 ||
            isUpdatingRole ||
            isDeletingUser ||
            (ROLE_ORDER[currentIndex + 1] === "admin" && role !== "admin")
          }
          variant="contained"
          sx={{
            bgcolor: "#335c67",
            fontWeight: 600,
            borderRadius: "12px",
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
            borderRadius: "12px",
          }}
          endIcon={<KeyboardDoubleArrowDownIcon />}
        >
          Demote
        </Button>
      </RenderWhenRole>

      {/* Custom confirmation dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{desc}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            disabled={isUpdatingRole}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
