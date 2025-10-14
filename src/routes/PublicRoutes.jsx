import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Dashboard from "@pages/dashboard-page/Dashboard";
import AboutPage from "@pages/about-page/AboutPage";
import Tutorial from "@pages/tutorial-page/Tutorial";
import RoleManagement from "@pages/role-management/RoleManagement";
import UserManagement from "@pages/user-management/UserManagement";
import UserAssignmentPage from "@pages/user-assignment/UserAssignmentPage";
import AllTeachersPage from "@pages/all-teacher-page/AllTeachersPage";
import TeacherTable from "@pages/all-teacher-page/TeacherTable";
import EditSchedule from "@pages/teacher-page/components/EditSchedule";

const UserDashboard = lazy(() => import("@pages/dashboard-page/UserDashboard"));
const TeacherPage = lazy(() => import("@pages/teacher-page/TeacherPage"));
const CourseList = lazy(() => import("@pages/course-page/CourseList"));
const PhaseControl = lazy(() => import("@pages/phase-page/PhaseControl"));
const ScheduleList = lazy(() => import("@pages/schedule-page/ScheduleList"));

// public routes no auth - login
// routes with auth - dashboard, all teachers, not found, schedule list, course list, teacher page, about, tutorial
// private routes (super_user) - dashboard (all users)
// private routes (master_scheduler) - phase-control, role-management, user-management, assign-user
// private routes (admin) - register user

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/teachers/:department" element={<TeacherPage />} />
      <Route path="/teacher/schedule/:department" element={<EditSchedule />} />
      <Route path="/schedules/:college_id" element={<ScheduleList />} />
      <Route path="/teacher-schedule/:teacher_id" element={<TeacherTable />} />
      <Route path="/teachers" element={<AllTeachersPage />} />
      <Route path="/phase-control" element={<PhaseControl />} />
      <Route path="/assign-user" element={<UserAssignmentPage />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorial" element={<Tutorial />} />
    </Routes>
  );
}
