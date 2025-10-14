// React imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Layouts
import Layout from "@layout/Layout";

// Pages
import Login from "@pages/login-page/Login";
import PublicRoutes from "./routes/publicRoutes";
import LoadingComponent from "@components/LoadingComponent";
import ProtectedRoute from "@context/ProtectedRoute";
import MasterSchedulerRoutes from "@routes/MasterScheduler";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            {/* Private Routes */}
            <Route
              path="/*"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute
                    allowedRoles={[
                      "admin",
                      "master_scheduler",
                      "super_user",
                      "user",
                    ]}
                  >
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

// // react imports
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";
// // components
// import Layout from "@layout/Layout";
// import ProtectedRoute from "@context/ProtectedRoute";
// // routes
// import UnauthorizedPage from "@pages/unauthorized/UnauthorizedPage";
// import PageNotFound from "@pages/page-not-found/PageNotFound";
// import LoadingComponent from "@components/LoadingComponent";
// import Login from "@pages/login-page/Login";
// import PublicRoutes from "@routes/PublicRoutes";
// import UserRoutes from "@routes/UserRoutes";
// import SuperUserRoutes from "@routes/SuperUserRoutes";
// import MasterSchedulerRoutes from "@routes/MasterScheduler";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Publicly accessible */}
//         <Route path="/unauthorized" element={<UnauthorizedPage />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected area inside layout */}
//         <Route element={<Layout />}>
//           <Route
//             element={
//               <Suspense fallback={<LoadingComponent />}>
//                 <ProtectedRoute
//                   allowedRoles={[
//                     "admin",
//                     "master_scheduler",
//                     "super_user",
//                     "user",
//                   ]}
//                 >
//                   <UserRoutes />
//                 </ProtectedRoute>
//               </Suspense>
//             }
//           />
//           <Route
//             element={
//               <Suspense fallback={<LoadingComponent />}>
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <MasterSchedulerRoutes />
//                 </ProtectedRoute>
//               </Suspense>
//             }
//           />
//           <Route
//             element={
//               <Suspense fallback={<LoadingComponent />}>
//                 <ProtectedRoute allowedRoles={["admin", "master_scheduler"]}>
//                   <MasterSchedulerRoutes />
//                 </ProtectedRoute>
//               </Suspense>
//             }
//           />
//           <Route
//             element={
//               <Suspense fallback={<LoadingComponent />}>
//                 <ProtectedRoute
//                   allowedRoles={["admin", "master_scheduler", "super_user"]}
//                 >
//                   <SuperUserRoutes />
//                 </ProtectedRoute>
//               </Suspense>
//             }
//           />
//         </Route>

//         {/* Catch-all => 404 */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
