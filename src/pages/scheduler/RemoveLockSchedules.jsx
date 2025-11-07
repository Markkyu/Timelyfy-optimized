import React, { useState } from "react";
import { Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import deleteSchedules from "./api/deleteSchedules";
import createSchedulesQueryOptions from "./api/createSchedulesQueryOptions";
import createCoursesQueryOptions from "./api/createCoursesQueryOptions";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RenderOnUser from "@components/RenderOnUser";

export default function RemoveLockSchedules({
  lockedSchedules,
  setExistingSchedules,
  schedules_loading,
  schedules_error,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const queryClient = useQueryClient();

  const { mutate, isPending: loadingRemove } = useMutation({
    mutationFn: (schedules) => {
      deleteSchedules(schedules);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createCoursesQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: createSchedulesQueryOptions().queryKey,
      });

      setConfirmOpen(false);
      setSelectedSchedule(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const getUniqueSchedules = (schedules) => {
  //   return [...new Set(schedules.map((item) => item.created_by))].map(
  //     (course) => ({ slot_course: course })
  //   );
  // };

  // get unique schedules based on slot_course and created_by
  const getUniqueSchedules = (schedules) => {
    const uniqueMap = new Map();

    schedules.forEach((item) => {
      if (!uniqueMap.has(item.slot_course)) {
        uniqueMap.set(item.slot_course, {
          slot_course: item.slot_course,
          created_by: item.created_by,
        });
      }
    });

    return Array.from(uniqueMap.values());
  };

  const uniqueSchedules = getUniqueSchedules(lockedSchedules);

  console.log(uniqueSchedules);

  // I want it to return [{slot_course: 'Course 1', created_by: 1}, {slot_course: 'Course 2', created_by: 2}]

  const handleDeleteClick = (courseName) => {
    setSelectedSchedule(courseName);
    setConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    const scheduleToRemove = uniqueSchedules.filter(
      (s) => s.slot_course === selectedSchedule
    );

    try {
      await deleteSchedules(scheduleToRemove);

      queryClient.invalidateQueries([
        {
          queryKey: createCoursesQueryOptions().queryKey,
        },
      ]);

      queryClient.invalidateQueries({
        queryKey: createSchedulesQueryOptions().queryKey,
      });

      setConfirmOpen(false);
      setSelectedSchedule(null);
    } catch (err) {
      console.error("Error removing schedule:", err);
    }
  };

  // Group schedules by slot_course
  const groupLockedSchedules = Object.groupBy(
    lockedSchedules,
    (groupSched) => groupSched.slot_course
  );

  console.log(groupLockedSchedules);

  // Get unique course names with counts
  const uniqueCourses = Object.keys(groupLockedSchedules).map((courseName) => ({
    slot_course: courseName,
    count: groupLockedSchedules[courseName].length,
  }));

  console.log(uniqueCourses);

  if (schedules_loading) return <SchedulesLoading />;
  if (schedules_error) return <SchedulesError />;

  return (
    <>
      <div className="relative max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
                <LockOpenIcon className="text-white" fontSize="medium" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Locked Schedules Management
                </h2>
                <p className="text-red-100 text-sm mt-0.5">
                  Remove locked course schedules from the timetable
                </p>
              </div>
            </div>
            {uniqueSchedules.length > 0 && (
              <Chip
                label={`${uniqueSchedules.length} ${
                  uniqueSchedules.length === 1 ? "Course" : "Courses"
                }`}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  backdropFilter: "blur(10px)",
                }}
              />
            )}
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 px-6 py-4">
          <div className="flex items-start gap-3">
            <WarningAmberIcon className="text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 text-sm mb-1">
                Important Notice
              </h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Removing locked schedules will make those time slots available
                again. Other users may fill these slots, potentially disrupting
                your current schedule flow. Proceed with caution.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {uniqueSchedules.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {uniqueSchedules.map((course, i) => (
                <ScheduleCard
                  key={i}
                  course={course}
                  onDelete={handleDeleteClick}
                  isLoading={loadingRemove}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <ConfirmationModal
          selectedSchedule={selectedSchedule}
          onConfirm={handleConfirmRemove}
          onCancel={() => setConfirmOpen(false)}
          isLoading={loadingRemove}
        />
      )}
    </>
  );
}

// Schedule Card Component
const ScheduleCard = ({ course, onDelete, isLoading }) => {
  return (
    <div className="group relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 rounded-xl p-4 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Course Icon */}
          <div className="bg-white group-hover:bg-red-100 rounded-lg p-3 transition-colors duration-300 border border-gray-200 group-hover:border-red-300">
            <EventBusyIcon className="text-gray-600 group-hover:text-red-600 transition-colors" />
          </div>

          {/* Course Details */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-1">
              {course.slot_course}
            </h3>
          </div>
        </div>

        {/* Delete Button */}
        <RenderOnUser createdBy={course.created_by}>
          <Button
            variant="contained"
            color="error"
            size="medium"
            endIcon={<DeleteIcon />}
            onClick={() => onDelete(course.slot_course)}
            disabled={isLoading}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 3,
              py: 1.5,
            }}
          >
            Remove
          </Button>
        </RenderOnUser>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <CheckCircleIcon sx={{ fontSize: 64, color: "#10b981" }} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">All Clear!</h3>
      <p className="text-gray-600 text-center max-w-md">
        No locked schedules found. All time slots are available for scheduling.
      </p>
    </div>
  );
};

// Loading State Component
const SchedulesLoading = () => {
  return (
    <div className="relative max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header with shimmer effect */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <LockOpenIcon className="text-white" fontSize="medium" />
          </div>
          <div className="flex-1">
            <div className="h-6 bg-white/20 rounded-md w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded-md w-80 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 mt-6 flex items-center gap-2">
            Loading Schedules
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce animation-delay-200"></span>
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce animation-delay-400"></span>
            </span>
          </p>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

// Error State Component
const SchedulesError = () => {
  return (
    <div className="relative max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-red-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <ErrorOutlineIcon className="text-white" fontSize="medium" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Error Loading Schedules
            </h2>
            <p className="text-red-100 text-sm mt-0.5">
              Unable to fetch locked schedules
            </p>
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-red-100 rounded-full p-6 mb-4">
            <ErrorOutlineIcon sx={{ fontSize: 64, color: "#dc2626" }} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Something Went Wrong
          </h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            We encountered an error while fetching the locked schedules. Please
            try refreshing the page.
          </p>
          <Button
            variant="contained"
            color="error"
            onClick={() => window.location.reload()}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 4,
              py: 1.5,
            }}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({
  selectedSchedule,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <WarningAmberIcon className="text-white" fontSize="medium" />
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Removal</h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-2">
            You are about to remove the locked schedule for:
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <p className="font-bold text-red-900 text-lg">{selectedSchedule}</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            This action will make the time slots available again. Other users
            may fill these slots, potentially disrupting your current schedule.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "10px",
              borderWidth: 2,
              px: 3,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            disabled={isLoading}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.2)",
            }}
          >
            {isLoading ? "Removing..." : "Yes, Remove"}
          </Button>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
