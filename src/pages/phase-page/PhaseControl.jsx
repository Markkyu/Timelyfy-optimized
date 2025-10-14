import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Crown, ShieldCheck, User, CheckCircle, Clock } from "lucide-react";

// ======= Constants =======
const PHASES = [
  {
    key: "master_scheduler",
    label: "Master Scheduler",
    icon: Crown,
    desc: "The Master Scheduler is distributing General Education Schedules to all departments.",
  },
  {
    key: "super_user",
    label: "Super User",
    icon: ShieldCheck,
    desc: "The Super-Users are distributing department-specific GE subjects to other departments.",
  },
  {
    key: "user",
    label: "Regular User",
    icon: User,
    desc: "Regular users are filling up their department schedules with courses.",
  },
];

const STEPS = [
  { year: 1, sem: 1 },
  { year: 2, sem: 1 },
  { year: 3, sem: 1 },
  { year: 4, sem: 1 },
  { year: 1, sem: 2 },
  { year: 2, sem: 2 },
  { year: 3, sem: 2 },
  { year: 4, sem: 2 },
];

// ======= API Helpers =======
const API_URL = import.meta.env.VITE_API_URL;

const getPhase = async () => {
  const { data } = await axios.get(`${API_URL}/api/phase`);
  return data[0];
};

const updatePhase = async ({
  phase_id,
  phase_year,
  phase_sem,
  phase_supervisor,
}) => {
  const { data } = await axios.put(`${API_URL}/api/phase/${phase_id}`, {
    phase_year,
    phase_sem,
    phase_supervisor,
  });
  return data;
};

// ======= Component =======
export default function PhaseControl() {
  const queryClient = useQueryClient();

  const { data: phaseData, isLoading } = useQuery({
    queryKey: ["phase_control"],
    queryFn: getPhase,
  });

  const mutation = useMutation({
    mutationFn: updatePhase,
    onSuccess: () => {
      queryClient.invalidateQueries(["phase_control"]);
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    if (phaseData) {
      const stepIndex = STEPS.findIndex(
        (s) => s.year === phaseData.phase_year && s.sem === phaseData.phase_sem
      );
      const phaseIndex = PHASES.findIndex(
        (p) => p.key === phaseData.phase_supervisor
      );

      setCurrentStep(stepIndex !== -1 ? stepIndex : 0);
      setCurrentPhase(phaseIndex !== -1 ? phaseIndex : 0);
    }
  }, [phaseData]);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  const { year, sem } = STEPS[currentStep];

  const handleNext = async () => {
    if (!phaseData) return;

    // Regular confirmation
    if (!confirm("Are you sure you want to proceed to the next phase?")) {
      alert("Cancelled");
      return;
    }

    let nextPhase = currentPhase;
    let nextStep = currentStep;

    if (currentPhase < PHASES.length - 1) {
      // Move within same semester
      nextPhase += 1;
    } else if (currentStep < STEPS.length - 1) {
      // Preparing to move to the next semester or year
      const currentSem = STEPS[currentStep].sem;
      const nextSem = STEPS[currentStep + 1].sem;

      // STOP POINT: before switching semesters
      if (currentSem !== nextSem) {
        const message =
          currentSem === 1
            ? `All departments completed Semester 1.\nProceed to Semester 2?`
            : `All departments completed Semester 2.\nProceed to next School Year?`;

        if (!confirm(message)) {
          alert("Phase transition paused.");
          return;
        }
      }

      nextPhase = 0;
      nextStep += 1;
    } else {
      // 🎉 All phases completed
      const shouldReset = confirm(
        "🎉 All phases completed!\n\nDo you want to reset to Year 1 - Semester 1?"
      );

      if (!shouldReset) {
        alert("Process completed. System will remain at the final phase.");
        return;
      }

      // ✅ Reset to beginning
      mutation.mutate({
        phase_id: phaseData.phase_id,
        phase_year: 1,
        phase_sem: 1,
        phase_supervisor: PHASES[0].key, // Master Scheduler
      });

      return;
    }

    const nextSupervisor = PHASES[nextPhase].key;
    const nextYear = STEPS[nextStep].year;
    const nextSem = STEPS[nextStep].sem;

    mutation.mutate({
      phase_id: phaseData.phase_id,
      phase_year: nextYear,
      phase_sem: nextSem,
      phase_supervisor: nextSupervisor,
    });
  };

  return (
    <main className="flex justify-center p-8 items-center h-full">
      <div className="flex flex-col justify-center items-center p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-5xl font-bold mb-4">
          Year {year} — Semester {sem}
        </h2>

        <p className="p-4 text-xl text-gray-800">{PHASES[currentPhase].desc}</p>

        <section className="flex items-center justify-evenly gap-6">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = idx === currentPhase;
            const isDone = idx < currentPhase;

            return (
              <div key={phase.key} className="flex flex-col items-center">
                <div
                  className={`size-18 flex items-center justify-center rounded-full border-2 transition
                    ${isDone ? "bg-green-100 border-green-500" : ""}
                    ${isActive ? "bg-red-100 border-red-500" : ""}
                    ${!isActive && !isDone ? "bg-gray-100 border-gray-300" : ""}
                  `}
                >
                  {isDone ? (
                    <CheckCircle className="text-green-600" size={34} />
                  ) : isActive ? (
                    <Icon className="text-red-800" size={34} />
                  ) : (
                    <Clock className="text-gray-400" size={34} />
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive
                      ? "text-red-600"
                      : isDone
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            );
          })}
        </section>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            disabled={mutation.isPending}
            className="px-4 py-2 bg-red-800 text-white rounded-full font-semibold shadow cursor-pointer"
          >
            {mutation.isPending
              ? "Updating..."
              : currentPhase < PHASES.length - 1
                ? "Next Phase"
                : currentStep < STEPS.length - 1
                  ? "Next Semester"
                  : "All Done"}
          </button>
        </div>
      </div>
    </main>
  );
}
