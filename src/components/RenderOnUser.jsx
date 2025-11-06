import useAuthStore from "@stores/useAuthStore";

export default function RenderOnUser({ createdBy, children }) {
  const { user } = useAuthStore();

  if (!user || !createdBy) {
    return null;
  }

  return user.id === createdBy ? <>{children}</> : null;
}
