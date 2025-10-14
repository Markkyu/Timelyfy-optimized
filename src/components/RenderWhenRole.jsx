import useAuthStore from "@stores/useAuthStore";
import React from "react";

export default function RenderWhenRole({ role, children }) {
  const { user } = useAuthStore();

  return <>{role.includes(user.role) && children}</>;
}
