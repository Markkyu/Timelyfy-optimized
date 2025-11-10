import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes("*")) {
    return children;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// import { Navigate, Outlet } from "react-router-dom";
// import useAuthStore from "@stores/useAuthStore";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
