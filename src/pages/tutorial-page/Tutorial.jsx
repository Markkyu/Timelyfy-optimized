import { useState } from "react";
import TutorialCard from "./TutorialCard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grow,
} from "@mui/material";

export default function Tutorial() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (title, description) => {
    setSelected({ title, description });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="flex-1 overflow-auto min-h-0">
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Getting Started with{" "}
              <span className="text-red-700">Timelyfy</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn how to navigate, schedule, and manage your account with
              these quick guides.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TutorialCard
              title="User Privileges"
              description="Understand the roles of Master Scheduler, Super User, and Regular User."
              onClick={() =>
                handleOpen(
                  "User Privileges",
                  "Detailed explanation of user levels and permissions in the system."
                )
              }
            />
            <TutorialCard
              title="How to Use the Scheduler"
              description="Learn how to add courses, assign teachers, and generate timetables."
              onClick={() =>
                handleOpen(
                  "How to Use the Scheduler",
                  "Step-by-step guide on course creation, assigning teachers, and generating conflict-free schedules."
                )
              }
            />
            <TutorialCard
              title="Account Management"
              description="Manage your account settings, update details, and handle access."
              onClick={() =>
                handleOpen(
                  "Account Management",
                  "Information on updating your profile, changing roles, and managing access."
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Expanded Card Dialog with Grow Animation */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Grow}
        PaperProps={{
          className: "rounded-2xl shadow-xl",
        }}
      >
        <DialogTitle className="text-xl font-bold text-gray-800">
          {selected?.title}
        </DialogTitle>
        <DialogContent>
          <p className="text-gray-700">{selected?.description}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
