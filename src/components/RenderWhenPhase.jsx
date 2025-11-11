import useAuthStore from "@stores/useAuthStore";
import createPhaseQueryOptions from "@hooks/createPhaseQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RenderWhenPhase({
  phaseYear,
  phaseSem,
  currYear,
  currSem,
  children,
}) {
  const { user } = useAuthStore();

  useEffect(() => {
    const LoadPhase = async () => {
      const { data } = await API.get(`${API_URL}/api/phase`);

      const { phase_year, phase_sem, phase_supervisor } = data;
      console.log(phase_year);
    };

    LoadPhase();
  }, []);

  return <>{children}</>;
}
