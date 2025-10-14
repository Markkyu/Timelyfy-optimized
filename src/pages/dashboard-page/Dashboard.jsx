import useAuthStore from "@stores/useAuthStore";
import GlobalDashboard from "./GlobalDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const { user } = useAuthStore();

  const currentUserRole = user?.role;
  const currentUserId = user?.id;

  if (currentUserRole === "user") {
    return <UserDashboard role={currentUserRole} userId={currentUserId} />;
  } else {
    return <GlobalDashboard role={currentUserRole} />;
  }
}
