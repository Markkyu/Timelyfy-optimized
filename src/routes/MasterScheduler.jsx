import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const RoleManagement = lazy(
  () => import("@pages/role-management/RoleManagement")
);
const PhaseControl = lazy(() => import("@pages/phase-page/PhaseControl"));
const UserAssignmentPage = lazy(
  () => import("@pages/user-assignment/UserAssignmentPage")
);

export default function MasterSchedulerRoutes() {
  return (
    <Routes>
      <Route path="/phase-control" element={<PhaseControl />} />
      <Route path="/assign-user" element={<UserAssignmentPage />} />
      <Route path="/role-management" element={<RoleManagement />} />
    </Routes>
  );
}
