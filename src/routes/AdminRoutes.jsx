import { Routes, Route } from "react-router-dom";
import AccountPage from "@pages/account-page/AccountPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}
