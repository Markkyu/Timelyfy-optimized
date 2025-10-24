import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Alert } from "@mui/material";

// Components
import PhaseHeader from "./components/PhaseHeader";
import PhaseProgressIndicator from "./components/PhaseProgressIndicator";
import SemesterProgress from "./components/SemesterProgress";
import PhaseActionButtons from "./components/PhaseActionButtons";
import PhaseInfoPanel from "./components/PhaseInfoPanel";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";

// Utils
import { PHASES, STEPS } from "./components/phaseConstants";
import { getPhase, updatePhase } from "./components/phaseApi";

export default function PhaseControl() {
  const queryClient = useQueryClient();

  const { data: phaseData, isLoading, error } = useQuery({
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

  const handleNext = async () => {
    if (!phaseData) return;

    let nextPhase = currentPhase;
    let nextStep = currentStep;

    if (currentPhase < PHASES.length - 1) {
      // Move within same semester
      nextPhase += 1;
    } else if (currentStep < STEPS.length - 1) {
      // Move to next semester/year
      nextPhase = 0;
      nextStep += 1;
    } else {
      // Reset to beginning
      mutation.mutate({
        phase_id: phaseData.phase_id,
        phase_year: 1,
        phase_sem: 1,
        phase_supervisor: PHASES[0].key,
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

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingContent message="Loading phase control..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent message="Failed to load phase control data" />
      </div>
    );
  }

  const { year, sem } = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <Container maxWidth="xl">
        {/* Success Alert */}
        {mutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => {}}>
            Phase updated successfully!
          </Alert>
        )}

        {/* Error Alert */}
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to update phase. Please try again.
          </Alert>
        )}

        {/* Header */}
        <PhaseHeader
          year={year}
          sem={sem}
          currentPhaseDesc={PHASES[currentPhase].desc}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Progress Indicators */}
          <div className="lg:col-span-2 space-y-6">
            <PhaseProgressIndicator
              phases={PHASES}
              currentPhase={currentPhase}
            />
            <SemesterProgress steps={STEPS} currentStep={currentStep} />
          </div>

          {/* Right Column - Info Panel */}
          <div className="lg:col-span-1">
            <PhaseInfoPanel phases={PHASES} currentPhase={currentPhase} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <PhaseActionButtons
            currentPhase={currentPhase}
            currentStep={currentStep}
            phases={PHASES}
            steps={STEPS}
            onNext={handleNext}
            isPending={mutation.isPending}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            System Status: {mutation.isPending ? "Updating..." : "Ready"} •
            Last Updated: {new Date().toLocaleString()}
          </p>
        </div>
      </Container>
    </div>
  );
}
