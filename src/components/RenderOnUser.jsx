import useAuthStore from "@stores/useAuthStore";

export default function RenderOnUser({ createdBy, children }) {
  const { user } = useAuthStore();

  if (!user || !createdBy) {
    return null;
  }

  return user.id === createdBy ? (
    <>{children}</>
  ) : (
    <div className="px-2 text-gray-500 text-sm italic">
      Created by user Id {createdBy}
    </div>
  );
}
