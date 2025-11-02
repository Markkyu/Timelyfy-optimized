import { Routes, Route } from "react-router-dom";
import Dashboard from "@pages/dashboard-page/Dashboard";
import CollegePage from "@pages/dashboard-page/components/CollegePage";
import CourseList from "@pages/course-page/CourseList";
import TeacherPage from "@pages/teacher-page/TeacherPage";
import AboutPage from "@pages/about-page/AboutPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/college/:college_id" element={<CollegePage />} />
      <Route path="/course-list/:college_id" element={<CourseList />} />
      <Route path="/teachers/:department" element={<TeacherPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
