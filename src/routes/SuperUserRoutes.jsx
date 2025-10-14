import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const GlobalDashboard = lazy(
  () => import("@pages/dashboard-page/GlobalDashboard")
);

export default function SuperUserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalDashboard />} />
    </Routes>
  );
}
