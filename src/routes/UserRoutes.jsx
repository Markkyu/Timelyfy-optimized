import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy imports
const UserDashboard = lazy(() => import("@pages/dashboard-page/UserDashboard"));
const TeacherPage = lazy(() => import("@pages/teacher-page/TeacherPage"));
const CourseList = lazy(() => import("@pages/course-page/CourseList"));
const AboutPage = lazy(() => import("@pages/about-page/AboutPage"));
const Tutorial = lazy(() => import("@pages/tutorial-page/Tutorial"));
const ScheduleList = lazy(() => import("@pages/schedule-page/ScheduleList"));
const AllTeachersPage = lazy(
  () => import("@pages/all-teacher-page/AllTeachersPage")
);

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/teachers" element={<AllTeachersPage />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/schedules/:college_id" element={<ScheduleList />} />
    </Routes>
  );
}
