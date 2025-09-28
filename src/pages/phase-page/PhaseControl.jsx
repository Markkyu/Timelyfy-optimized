import { useState } from "react";
import { Crown, ShieldCheck, User, CheckCircle, Clock } from "lucide-react";

// Define phases
const PHASES = [
  {
    key: "master",
    label: "Master Scheduler",
    icon: Crown,
    desc: "The Master Scheduler is distributing General Education Schedules to all departments.",
  },
  {
    key: "super",
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

// Define year + semester order
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

export default function PhaseControl() {
  const [currentStep, setCurrentStep] = useState(0); // Year-Sem index
  const [currentPhase, setCurrentPhase] = useState(0); // Phase index

  const handleNext = () => {
    if (confirm("Are you sure you want to proceed to the next phase?")) {
      if (currentPhase < PHASES.length - 1) {
        setCurrentPhase((prev) => prev + 1);
      } else if (currentStep < STEPS.length - 1) {
        setCurrentPhase(0);
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      alert("Cancelled");
    }
  };

  const { year, sem } = STEPS[currentStep];

  return (
    <>
      <main className="container-fluid flex justify-center items-center h-full">
        {/* Header and Description */}
        <div className="p-6 max-w-5xl bg-white rounded-2xl">
          <h2 className="text-xl font-bold mb-4">
            Year {year} - Semester {sem}
          </h2>

          <p className="p-4 text-gray-800 font-medium">
            {PHASES[currentPhase].desc}
          </p>

          {/* Phase Control */}
          <section className="flex items-center justify-between gap-6">
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = idx === currentPhase;
              const isDone = idx < currentPhase;

              return (
                <div key={phase.key} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full border-2 transition
                  ${isDone ? "bg-green-100 border-green-500" : ""}
                  ${isActive ? "bg-blue-100 border-blue-500" : ""}
                  ${!isActive && !isDone ? "bg-gray-100 border-gray-300" : ""}
                `}
                  >
                    {isDone ? (
                      <CheckCircle className="text-green-600" size={28} />
                    ) : isActive ? (
                      <Icon className="text-blue-600" size={28} />
                    ) : (
                      <Clock className="text-gray-400" size={28} />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600"
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

          {/* Button */}
          <div className="flex gap-4 justify-center">
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow cursor-pointer"
              >
                {currentPhase < PHASES.length - 1
                  ? "Next Phase"
                  : currentStep < STEPS.length - 1
                  ? "Next Semester"
                  : "All Done"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
