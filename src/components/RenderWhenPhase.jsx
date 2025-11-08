import useAuthStore from "@stores/useAuthStore";
import createPhaseQueryOptions from "@hooks/createPhaseQueryOptions";
import { useQuery } from "@tanstack/react-query";

export default function RenderWhenPhase({ year, sem, children }) {
  const { user } = useAuthStore();

  const { data: phase, isPending: loadingPhase } = useQuery(
    createPhaseQueryOptions()
  );

  const supervisor = phase?.supervisor;
  const userIsSupervisor = user.role === supervisor;

  console.log(supervisor, userIsSupervisor);

  const { phase_year, phase_sem } = phase || {};

  const currentPhase = user.role === phase?.supervisor;

  console.log(currentPhase);

  if (!currentPhase) return null;

  // if (
  //   (phase?.phase_sem == sem &&
  //     phase?.phase_year == year &&
  //     phase?.supervisor == user.role) ||
  //   user.role === "admin"
  // ) {
  // }
  return <>{children}</>;
}
