import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import AboutPage from "@pages/about-page/AboutPage";
import Tutorial from "@pages/tutorial-page/Tutorial";
import AllTeachersPage from "@pages/all-teacher-page/AllTeachersPage";
import CollegePage from "@pages/dashboard-page/components/CollegePage";
import RoomPage from "@pages/room-page/RoomPage";
import PageNotFound from "@pages/page-not-found/PageNotFound";
import UnauthorizedPage from "@pages/unauthorized/UnauthorizedPage";
import GlobalDashboard from "@pages/dashboard-page/GlobalDashboard";

const CourseList = lazy(() => import("@pages/course-page/CourseList"));
const AccountPage = lazy(() => import("@pages/account-page/AccountPage"));

export default function CommonRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalDashboard />} />
      <Route path="/college/:college_id" element={<CollegePage />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/schedules/:college_id" element={<ScheduleList />} />
      <Route path="/room-page" element={<RoomPage />} />
      <Route path="/teachers" element={<AllTeachersPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
