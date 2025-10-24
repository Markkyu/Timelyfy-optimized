import { Card, CardContent, Stepper, Step, StepLabel } from "@mui/material";
import { CheckCircle } from "lucide-react";

export default function SemesterProgress({ steps, currentStep }) {
  return (
    <Card className="shadow-lg mb-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Academic Progress
        </h2>

        <Stepper
          activeStep={currentStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              marginTop: 1,
            },
            "& .MuiStepIcon-root": {
              fontSize: "2rem",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#7f1d1d",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#16a34a",
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={
                  index < currentStep
                    ? () => (
                        <CheckCircle
                          className="text-green-600"
                          size={32}
                          fill="currentColor"
                        />
                      )
                    : undefined
                }
              >
                <div className="text-xs sm:text-sm font-medium">
                  Year {step.year}
                </div>
                <div className="text-xs text-gray-600">Sem {step.sem}</div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-4 text-center text-sm text-gray-600">
          Completed {currentStep} of {steps.length} academic periods
        </div>
      </CardContent>
    </Card>
  );
}
