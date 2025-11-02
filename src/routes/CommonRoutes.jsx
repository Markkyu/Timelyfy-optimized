import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "@pages/dashboard-page/Dashboard";
import AboutPage from "@pages/about-page/AboutPage";
import Tutorial from "@pages/tutorial-page/Tutorial";
import AllTeachersPage from "@pages/all-teacher-page/AllTeachersPage";
import TeacherTable from "@pages/all-teacher-page/TeacherTable";
import EditSchedule from "@pages/teacher-page/components/EditSchedule";
import CollegePage from "@pages/dashboard-page/components/CollegePage";
import RoomPage from "@pages/room-page/RoomPage";
import PageNotFound from "@pages/page-not-found/PageNotFound";
import UnauthorizedPage from "@pages/unauthorized/UnauthorizedPage";
import GlobalDashboard from "@pages/dashboard-page/GlobalDashboard";

const TeacherPage = lazy(() => import("@pages/teacher-page/TeacherPage"));
const CourseList = lazy(() => import("@pages/course-page/CourseList"));
const ScheduleList = lazy(() => import("@pages/schedule-page/ScheduleList"));
const AccountPage = lazy(() => import("@pages/account-page/AccountPage"));

export default function CommonRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalDashboard />} />
      <Route path="/college/:college_id" element={<CollegePage />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/teachers/:department" element={<TeacherPage />} />
      <Route path="/teacher/schedule/:department" element={<EditSchedule />} />
      <Route path="/schedules/:college_id" element={<ScheduleList />} />
      <Route path="/room-page" element={<RoomPage />} />
      <Route path="/teacher-schedule/:teacher_id" element={<TeacherTable />} />
      <Route path="/teachers" element={<AllTeachersPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
