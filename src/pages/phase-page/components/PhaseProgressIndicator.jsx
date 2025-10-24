import { CheckCircle, Clock, ArrowRight } from "lucide-react";

export default function PhaseProgressIndicator({ phases, currentPhase }) {
  return (
    <div className="bg-white h-full rounded shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Phase Progress
      </h2>

      <div className="flex items-center justify-between gap-4">
        {phases.map((phase, idx) => {
          const Icon = phase.icon;
          const isActive = idx === currentPhase;
          const isDone = idx < currentPhase;
          const isPending = idx > currentPhase;

          return (
            <div key={phase.key} className="flex items-center flex-1">
              {/* Phase Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`relative size-20 flex items-center justify-center rounded-full border-4 transition-all duration-300 transform
                    ${isDone ? "bg-green-100 border-green-500 scale-100" : ""}
                    ${isActive ? "bg-red-100 border-red-800 scale-110 shadow-lg" : ""}
                    ${isPending ? "bg-gray-50 border-gray-300 scale-95" : ""}
                  `}
                >
                  {isDone ? (
                    <CheckCircle
                      className="text-green-600 animate-pulse"
                      size={40}
                    />
                  ) : isActive ? (
                    <Icon className="text-red-800" size={40} />
                  ) : (
                    <Clock className="text-gray-400" size={40} />
                  )}
                </div>

                <div className="mt-3 text-center">
                  <span
                    className={`block text-sm font-bold ${
                      isActive
                        ? "text-red-800"
                        : isDone
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    {phase.label}
                  </span>
                  {isActive && (
                    <span className="inline-block mt-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                      In Progress
                    </span>
                  )}
                  {isDone && (
                    <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow between phases */}
              {idx < phases.length - 1 && (
                <div className="flex items-center justify-center px-4">
                  <ArrowRight
                    className={`${
                      isDone ? "text-green-500" : "text-gray-300"
                    } transition-colors`}
                    size={32}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-600 to-red-800 h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentPhase + 1) / phases.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>
            Phase {currentPhase + 1} of {phases.length}
          </span>
          <span>
            {Math.round(((currentPhase + 1) / phases.length) * 100)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
