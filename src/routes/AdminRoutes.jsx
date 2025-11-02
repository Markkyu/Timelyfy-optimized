import { Routes, Route } from "react-router-dom";
import UserManagement from "@pages/user-management/UserManagement";
import AccountPage from "@pages/account-page/AccountPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/account" element={<AccountPage />} />
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  );
}
