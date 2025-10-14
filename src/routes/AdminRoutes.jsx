import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const UserManagement = lazy(
  () => import("@pages/user-management/UserManagement")
);

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  );
}
