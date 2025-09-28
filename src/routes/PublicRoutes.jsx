import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import LoadingComponent from "@components/LoadingComponent";
import PageNotFound from "@pages/page-not-found/PageNotFound";
const GlobalDashboard = lazy(
  () => import("@pages/dashboard-page/GlobalDashboard")
);
const UserDashboard = lazy(() => import("@pages/dashboard-page/UserDashboard"));
const TeacherPage = lazy(() => import("@pages/teacher-page/TeacherPage"));
const CourseList = lazy(() => import("@pages/course-page/CourseList"));
const AboutPage = lazy(() => import("@pages/about-page/AboutPage"));
const Tutorial = lazy(() => import("@pages/tutorial-page/Tutorial"));
const PhaseControl = lazy(() => import("@pages/phase-page/PhaseControl"));
const UserAssignmentPage = lazy(
  () => import("@pages/user-assignment/UserAssignmentPage")
);
const AllTeachersPage = lazy(
  () => import("@pages/all-teacher-page/AllTeachersPage")
);

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalDashboard />} />
      <Route path="/" element={<UserDashboard />} />
      <Route path="/teachers/:department" element={<TeacherPage />} />
      <Route path="/phase-control" element={<PhaseControl />} />
      <Route path="/teachers" element={<AllTeachersPage />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/assign-user" element={<UserAssignmentPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
