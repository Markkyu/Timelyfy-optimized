import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@context/ProtectedRoute";
import { ROLES } from "./roles";

// const UserDashboard = lazy(() => import("@pages/dashboard-page/UserDashboard"));

export default function SuperUserRoutes() {
  return (
    <Routes>
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER]}>
            {/* <UserDashboard /> */}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
