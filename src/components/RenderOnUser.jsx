import useAuthStore from "@stores/useAuthStore";

export default function RenderOnUser({ createdBy, children }) {
  const { user } = useAuthStore();

  if (!user || !createdBy) {
    return null;
  }

  return user.id === createdBy ? (
    <>{children}</>
  ) : (
    <div className="px-2 text-gray-400 text-md italic">
      by user id {createdBy}
    </div>
  );
}
