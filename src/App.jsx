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
import { Suspense, lazy } from "react";

// Layouts
import Layout from "@layout/Layout";

// Pages
import Login from "@pages/login-page/Login";
import LoadingComponent from "@components/LoadingComponent";
import SessionExpiredDialog from "@components/SessionExpiredDialog";

// Route Components
import { ROLES } from "@routes/roles";
import ProtectedRoute from "@context/ProtectedRoute";
import GlobalDashboard from "@pages/dashboard-page/GlobalDashboard";
import CollegePage from "@pages/dashboard-page/components/CollegePage";
import UserDetails from "@pages/user-page/UserDetails";
import AboutPage from "@pages/about-page/AboutPage";
import Tutorial from "@pages/tutorial-page/Tutorial";
import UnauthorizedPage from "@pages/unauthorized/UnauthorizedPage";
import PageNotFound from "@pages/page-not-found/PageNotFound";
import SkeletonLoaderManage from "@components/loader/SkeletonLoaderManage";
import PhaseControlSkeleton from "@components/loader/PhaseControlSkeleton";
import AccountPage from "@pages/account-page/AccountPage";
import CourseList from "@pages/course-page/CourseList";
// import UserPage from "@pages/user-page/UserPage";
// import PhaseControl from "@pages/phase-page/PhaseControl";
// import RoomPage from "@pages/room-page/RoomPage";
// import AllTeachersPage from "@pages/all-teacher-page/AllTeachersPage";

const UserPage = lazy(() => import("@pages/user-page/UserPage"));
const PhaseControl = lazy(() => import("@pages/phase-page/PhaseControl"));
const RoomPage = lazy(() => import("@pages/room-page/RoomPage"));
const AllTeachersPage = lazy(
  () => import("@pages/all-teacher-page/AllTeachersPage")
);
const SchedulerApp = lazy(() => import("@pages/scheduler/App"));
const RoomSchedule = lazy(() => import("@pages/room-page/RoomSchedule"));
const TeacherSchedule = lazy(
  () => import("@pages/all-teacher-page/TeacherSchedule")
);

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
              path="/"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                  <GlobalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/college/:college_id"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <CollegePage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/course-list/:college_id"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                  <CourseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:class_group/schedule/:college"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <SchedulerApp />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <AccountPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/rooms"
              element={
                <Suspense fallback={<SkeletonLoaderManage />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <RoomPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/rooms/:room_id/schedule"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <RoomSchedule />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/phase-control"
              element={
                <Suspense fallback={<PhaseControlSkeleton />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <PhaseControl />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/teachers/:teacher_id/schedule"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <TeacherSchedule />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/teachers"
              element={
                <Suspense fallback={<SkeletonLoaderManage />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <AllTeachersPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/user-page"
              element={
                <Suspense fallback={<SkeletonLoaderManage />}>
                  <ProtectedRoute allowedRoles={[ROLES.MASTER, ROLES.ADMIN]}>
                    <UserPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/user-page/:userId"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.MASTER, ROLES.ADMIN]}>
                    <UserDetails />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <AboutPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/tutorial"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                    <Tutorial />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                  <UnauthorizedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ALL]}>
                  <PageNotFound />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
// // // React imports
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { Suspense, lazy } from "react";

// // // Layouts
// // import Layout from "@layout/Layout";

// // // Pages
// // import Login from "@pages/login-page/Login";
// // import PublicRoutes from "@routes/PublicRoutes";
// // import LoadingComponent from "@components/LoadingComponent";
// // import ProtectedRoute from "@context/ProtectedRoute";
// // import MasterSchedulerRoutes from "@routes/MasterSchedulerRoutes";
// // import SessionExpiredDialog from "@components/SessionExpiredDialog";
// // import Dashboard from "@pages/dashboard-page/Dashboard";

// // // export
// // const ROLES = {
// //   ADMIN: "admin",
// //   SUPER: "super_user",
// //   USER: "user",
// //   SCHEDULER: "master_scheduler",
// //   ALL: "*",
// // };

// // export default function App() {
// //   return (
// //     <>
// //       <BrowserRouter>
// //         <SessionExpiredDialog />
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route element={<Layout />}>
// //             {/* Private Routes */}
// //             <Route
// //               path="/*"
// //               element={
// //                 <Suspense fallback={<LoadingComponent />}>
// //                   <ProtectedRoute allowedRoles={["*"]}>
// //                     <PublicRoutes />
// //                   </ProtectedRoute>
// //                 </Suspense>
// //               }
// //             />
// //           </Route>
// //         </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // }

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense } from "react";

// // Layouts
// import Layout from "@layout/Layout";

// // Pages
// import Login from "@pages/login-page/Login";
// import LoadingComponent from "@components/LoadingComponent";
// import SessionExpiredDialog from "@components/SessionExpiredDialog";

// // Route Components
// import CommonRoutes from "@routes/CommonRoutes";
// import MasterSchedulerRoutes from "@routes/MasterSchedulerRoutes";
// import AdminRoutes from "@routes/AdminRoutes";
// import SuperUserRoutes from "@routes/SuperUserRoutes";
// import ProtectedRoute from "@context/ProtectedRoute";
// import { ROLES } from "@routes/roles";
// import PublicRoutes from "@routes/PublicRoutes";
// import SkeletonGlobalDashboard from "@components/loader/SkeletonGlobalDashboard";
// import GlobalDashboard from "@pages/dashboard-page/GlobalDashboard";

// export default function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <SessionExpiredDialog />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route element={<Layout />}>
//             {/* Common Routes - All authenticated users */}
//             <Route
//               path="/"
//               element={
//                 <Suspense fallback={<LoadingComponent />}>
//                   <ProtectedRoute allowedRoles={[ROLES.ALL]}>
//                     {/* <CommonRoutes /> */}
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
