// React imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Layouts
import Layout from "@layout/Layout";

// Pages
import Login from "@pages/login-page/Login";
import PublicRoutes from "./routes/publicRoutes";
import LoadingComponent from "@components/LoadingComponent";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/*"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <PublicRoutes />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
