import { useState } from "react";
import TutorialCard from "./TutorialCard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grow,
  IconButton,
  Alert,
} from "@mui/material";
import { X, BookOpen, Sparkles } from "lucide-react";

export default function Tutorial() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (tutorial) => {
    setSelected(tutorial);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const tutorials = [
    {
      title: "User Privileges",
      description:
        "Understand the roles of Master Scheduler, Super User, and Regular User.",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      content: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Role Overview</h3>
          
          <div class="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h4 class="font-bold text-purple-900 mb-2">🔑 Master Scheduler</h4>
            <p class="text-gray-700 text-sm">Comes <b>first</b> in the scheduling process. Full system access with the ability to manage the backbone schedules. Has the ability to create college programs, teachers, and rooms.</p>
          </div>

          <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
            <h4 class="font-bold text-indigo-900 mb-2">⚡ Super User</h4>
            <p class="text-gray-700 text-sm">Comes <b>second</b> in the scheduling process. Can manage schedules globally. If you believe that your room or teacher is missing, contact a master scheduler or admin.</p>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 class="font-bold text-blue-900 mb-2">👤 Regular User</h4>
            <p class="text-gray-700 text-sm">Comes <b>last</b> in the scheduling process. Can manage schedules within their assigned college department. If you believe that your room or teacher is missing, contact a master scheduler or admin.</p>
          </div>

          <div class="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p class="text-sm text-amber-800">
              <strong>💡 Tip:</strong> Contact your system administrator if you need different access permissions.
            </p>
          </div>
        </div>
      `,
    },
    {
      title: "How to Use the Scheduler",
      description:
        "Learn how to add courses, assign teachers, and generate timetables.",
      icon: "📅",
      color: "from-red-500 to-red-600",
      content: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Scheduling Guide</h3>
          
          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 class="font-semibold text-gray-800">Navigate to a College Schedule</h4>
                <p class="text-sm text-gray-600">Select your college from the dashboard and choose the appropriate year level and semester.</p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 class="font-semibold text-gray-800">Add Course</h4>
                <p class="text-sm text-gray-600">Click "Add Course/ Subject" to create new courses for that college program. Assign a teacher and a room and go to schedules tab. (If available)</p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 class="font-semibold text-gray-800">The Auto Allocate Button</h4>
                <p class="text-sm text-gray-600">The queued schedule is detected by the system. By clicking the auto-allocate button it automagically plots the schedules for you in a "greedy" manner.</p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 class="font-semibold text-gray-800">Always double check</h4>
                <p class="text-sm text-gray-600">Always double check before locking in your schedule.</p>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-sm text-green-800">
              <strong>✅ Pro Tip:</strong> The user can adjust the schedules to their liking even after the auto-allocation process.
            </p>
          </div>
        </div>
      `,
    },
    {
      title: "Account Management",
      description:
        "Manage your account settings, update details, and handle access.",
      icon: "⚙️",
      color: "from-green-500 to-green-600",
      content: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Managing Your Account</h3>
          
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 class="font-bold text-gray-900 mb-2">🔐 Security Settings</h4>
            <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Request for change password on initial login</li>
            </ul>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 class="font-bold text-gray-900 mb-2">👤 Profile Information</h4>
            <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Editing profile is not available</li>
            </ul>
          </div>

          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>ℹ️ Note:</strong> Contact support if you need to request role changes or report account issues.
            </p>
          </div>
        </div>
      `,
    },
    {
      title: "Phase Management",
      description:
        "Learn how to transition between academic phases and semesters.",
      icon: "🔄",
      color: "from-purple-500 to-purple-600",
      content: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Academic Phase System</h3>
          
          <div class="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h4 class="font-bold text-purple-900 mb-2">📚 What are Phases?</h4>
            <p class="text-gray-700 text-sm">Phases represent the current active period for scheduling. Only schedules within the active phase can be edited by authorized users.</p>
          </div>

          <div class="space-y-2 text-sm">
            <p class="text-gray-700"><strong>Current Phase Includes:</strong></p>
            <ul class="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li>Active semester (1st or 2nd)</li>
              <li>Current year level (1st through 4th year)</li>
              <li>Assigned role to create schedule</li>
            </ul>
          </div>

          <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 class="font-bold text-amber-900 mb-2">⚠️ Phase Transitions</h4>
            <p class="text-gray-700 text-sm">Transitioning to a new phase requires typing "proceed" to confirm. This prevents accidental changes to the academic calendar.</p>
          </div>

          <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">
              <strong>🚨 Important:</strong> Only Master Schedulers can perform phase transitions. All previous schedules after transition are wiped out after the transition.
            </p>
          </div>
        </div>
      `,
    },
    {
      title: "Troubleshooting",
      description:
        "Common issues and solutions to help you resolve problems quickly.",
      icon: "🔧",
      color: "from-orange-500 to-orange-600",
      content: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Common Issues & Solutions</h3>
          
          <div class="space-y-3">
            <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-1">❌ Schedule Conflicts Not Resolving</h4>
              <p class="text-sm text-gray-600 mb-2">When conflicts persist after editing:</p>
              <ul class="text-sm text-gray-600 list-disc list-inside ml-2">
                <li>Refresh the page to reload data</li>
                <li>Check for overlapping time slots</li>
                <li>Verify teacher availability</li>
              </ul>
            </div>

            <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-1">🔒 Cannot Edit Schedule</h4>
              <p class="text-sm text-gray-600 mb-2">If you can't modify a schedule:</p>
              <ul class="text-sm text-gray-600 list-disc list-inside ml-2">
                <li>Verify you're in the current active phase</li>
                <li>Check your user role permissions</li>
                <li>Ensure you're assigned as the supervisor</li>
              </ul>
            </div>

            <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500 shadow-sm">
              <h4 class="font-bold text-gray-900 mb-1">💾 Changes Not Saving</h4>
              <p class="text-sm text-gray-600 mb-2">When edits don't persist:</p>
              <ul class="text-sm text-gray-600 list-disc list-inside ml-2">
                <li>Check your internet connection</li>
                <li>Look for error messages in red</li>
              </ul>
            </div>
          </div>

          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>📞 Still Need Help?</strong> Contact technical support or your system administrator for assistance.
            </p>
          </div>
        </div>
      `,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex-1 overflow-auto min-h-0">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              <BookOpen size={16} />
              <span>Knowledge Base</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900">
              Getting Started with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Timelyfy
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need to know about scheduling, managing users, and
              optimizing your academic timetables. Click any card to learn more.
            </p>
            <Alert severity="warning" className="md:w-[50%] mx-auto">
              Disclaimer: Timelyfy scheduler is not perfect and does not fully
              replicate the process of scheduling in Enverga Candelaria.
              Timelyfy does not replace the actual process of scheduling. It
              simply works alongside with how the department heads create
              schedules.
            </Alert>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <TutorialCard
                key={index}
                {...tutorial}
                onClick={() => handleOpen(tutorial)}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Quick Tips Section */}
          <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quick Heads Up
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>
                      Always check for conflicts before finalizing schedules
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>
                      Coordinate with department heads for teacher assignments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>
                      The scheduler does not save schedules after every
                      semester. So watch out for that!
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>
                      Timelyfy does not replace the actual process of
                      scheduling. It simply works with how the department heads
                      create schedules.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        TransitionComponent={Grow}
        PaperProps={{
          className: "rounded-2xl shadow-2xl",
        }}
      >
        <DialogTitle className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selected?.icon}</span>
              <span className="text-2xl font-bold text-gray-900">
                {selected?.title}
              </span>
            </div>
            <IconButton onClick={handleClose} size="small">
              <X size={20} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="pt-6">
          <div
            dangerouslySetInnerHTML={{ __html: selected?.content }}
            className="prose prose-sm max-w-none"
          />
        </DialogContent>
        <DialogActions className="border-t border-gray-200 px-6 py-4">
          <Button
            onClick={handleClose}
            variant="contained"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            size="large"
            sx={{ fontWeight: 600 }}
          >
            Got it, thanks!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
