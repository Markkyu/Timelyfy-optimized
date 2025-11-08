// // React imports
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

// // Layouts
// import Layout from "@layout/Layout";

// // Pages
// import Login from "@pages/login-page/Login";
// import PublicRoutes from "@routes/PublicRoutes";
// import LoadingComponent from "@components/LoadingComponent";
// import ProtectedRoute from "@context/ProtectedRoute";
// import MasterSchedulerRoutes from "@routes/MasterSchedulerRoutes";
// import SessionExpiredDialog from "@components/SessionExpiredDialog";
// import Dashboard from "@pages/dashboard-page/Dashboard";

// // export
// const ROLES = {
//   ADMIN: "admin",
//   SUPER: "super_user",
//   USER: "user",
//   SCHEDULER: "master_scheduler",
//   ALL: "*",
// };

// export default function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <SessionExpiredDialog />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route element={<Layout />}>
//             {/* Private Routes */}
//             <Route
//               path="/*"
//               element={
//                 <Suspense fallback={<LoadingComponent />}>
//                   <ProtectedRoute allowedRoles={["*"]}>
//                     <PublicRoutes />
//                   </ProtectedRoute>
//                 </Suspense>
//               }
//             />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Layouts
import Layout from "@layout/Layout";

// Pages
import Login from "@pages/login-page/Login";
import LoadingComponent from "@components/LoadingComponent";
import SessionExpiredDialog from "@components/SessionExpiredDialog";

// Route Components
import CommonRoutes from "@routes/CommonRoutes";
import MasterSchedulerRoutes from "@routes/MasterSchedulerRoutes";
import AdminRoutes from "@routes/AdminRoutes";
import SuperUserRoutes from "@routes/SuperUserRoutes";
import ProtectedRoute from "@context/ProtectedRoute";
import { ROLES } from "@routes/roles";
import PublicRoutes from "@routes/PublicRoutes";
import SkeletonGlobalDashboard from "@components/loader/SkeletonGlobalDashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <SessionExpiredDialog />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            {/* Common Routes - All authenticated users */}
            <Route
              path="/*"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    {/* <CommonRoutes /> */}
                    <PublicRoutes />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
