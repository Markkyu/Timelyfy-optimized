import useAuthStore from "@stores/useAuthStore";

export default function RenderWhenRole({ role, children }) {
  const { user } = useAuthStore();

  return <>{role.includes(user.role) && children}</>;
}
