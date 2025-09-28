import { useState } from "react";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import LoginForm from "./components/LoginForm";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Fullscreen Landing */}
      <div className="relative min-h-screen flex justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Background gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-800 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-130 h-130 bg-red-800 opacity-20 blur-3xl animate-pulse delay-300" />

        {/* Wrapper */}
        <div className="max-w-6xl w-full grid grid-cols-2 items-center px-12">
          {/* Left: Text*/}
          <div className="space-y-6">
            <h1 className="text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">
              Automate Scheduling with{" "}
              <span className="text-red-800">Timelyfy</span> for MSEUF-CI
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Save time and reduce conflicts. Add your courses, assign teachers,
              and let Timelyfy generate the schedules — effortlessly.
            </p>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowLogin(true)}
                size="large"
                variant="contained"
                sx={{
                  fontWeight: 600,
                  borderRadius: 10,
                  backgroundColor: "#800000",
                  paddingX: 4,
                }}
              >
                Log In
              </Button>

              <span className="text-gray-500 text-md">
                <LockIcon /> Secure access for department heads and admins
              </span>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex justify-center relative">
            <img
              // src="https://cdni.iconscout.com/illustration/premium/thumb/scheduling-timetable-illustration-download-in-svg-png-gif-file-formats--task-management-time-business-planning-schedule-effective-artistry-pack-people-illustrations-5295176.png?f=webp"
              src="/5295176.webp"
              alt="Scheduling Illustration"
              className="w-full max-w-md drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Login Form */}
      <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />

      {/* Small animation for the image */}
      <style jsx="true" global="true">{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
