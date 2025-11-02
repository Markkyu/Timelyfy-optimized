import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Background gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-800 opacity-40 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-10 w-40 h-40 bg-red-800 opacity-40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-red-800 opacity-40 rounded-full blur-3xl" />

        {/* Wrapper */}
        <div className="max-w-6xl w-full grid lg:grid-cols-2 grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:px-16 ">
          {/* Left: Text */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">
              Automate Scheduling with{" "}
              <span className="text-red-800">Timelyfy</span> for MSEUF-CI
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-lg mx-auto lg:mx-0">
              Save time and reduce conflicts. Add your courses, assign teachers
              and rooms, and let Timelyfy generate the schedules.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => setShowLogin(true)}
                size="large"
                variant="contained"
                sx={{
                  fontWeight: 600,
                  borderRadius: "6px",
                  backgroundColor: "#800000",
                  paddingX: 4,
                }}
              >
                Log In
              </Button>

              <span className="text-gray-500 text-md flex items-center gap-2">
                <LockIcon className="size-5" /> Secure access for department
                heads
              </span>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:block">
            <img
              src="/5295176.webp"
              alt="Scheduling Illustration"
              className="w-full max-w-md drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Login Form */}
      <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
}
