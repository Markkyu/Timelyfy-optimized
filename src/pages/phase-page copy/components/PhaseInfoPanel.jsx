import { Card, CardContent } from "@mui/material";
import { Info, Users, Calendar, Target } from "lucide-react";

export default function PhaseInfoPanel({ phases, currentPhase }) {
  const phase = phases[currentPhase];

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-red-800" size={24} />
          <h2 className="text-xl font-bold text-gray-800">
            Phase Information
          </h2>
        </div>

        <div className="space-y-4">
          {/* Current Phase */}
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-800">
            <div className="flex items-start gap-3">
              <Target className="text-red-800 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  Current Phase
                </h3>
                <p className="text-gray-700 font-medium">{phase.label}</p>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <Users className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  Responsibilities
                </h3>
                <p className="text-gray-700 text-sm">{phase.desc}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <Calendar
                className="text-green-600 mt-1 flex-shrink-0"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  Next Steps
                </h3>
                <p className="text-gray-700 text-sm">
                  {currentPhase < phases.length - 1
                    ? `After completion, system will advance to ${phases[currentPhase + 1].label} phase.`
                    : "After completion, system will advance to the next semester or year."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
