import { Routes, Route } from "react-router-dom";
import PhaseControl from "@pages/phase-page/PhaseControl";
import RoleManagement from "@pages/role-management/RoleManagement";
import UserManagement from "@pages/user-management/UserManagement";
import UserAssignmentPage from "@pages/user-assignment/UserAssignmentPage";

export default function MasterSchedulerRoutes() {
  return (
    <Routes>
      <Route path="/phase-control" element={<PhaseControl />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/assign-user" element={<UserAssignmentPage />} />
    </Routes>
  );
}
