import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grow,
  Box,
  Divider,
  Chip,
  Menu,
} from "@mui/material";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { convertTime } from "@pages/scheduler/generateTimeSlots";

export default function ScheduleDetailsDialog({
  open,
  onClose,
  data,
  context,
}) {
  if (!data) return null;

  const teacherName = data.first_name
    ? `${data.first_name} ${data.last_name}`
    : "N/A";

  const convertedTime = convertTime(data.dayIndex, data.timeIndex);

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    iconColor = "text-gray-600",
  }) => (
    <Box className="flex items-start gap-3 py-2">
      <Icon className={`${iconColor} mt-0.5`} sx={{ fontSize: 20 }} />
      <Box className="flex-1">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-semibold mt-0.5">{value}</p>
      </Box>
    </Box>
  );

  return (
    <Dialog
      TransitionComponent={Grow}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      {/* Header with gradient background */}
      <DialogTitle
        className="relative overflow-hidden"
        sx={{
          background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
          color: "white",
          padding: "24px",
        }}
      >
        <Box className="flex items-center gap-3">
          <Box
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CalendarMonthIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <h2 className="text-xl font-bold">Schedule Details</h2>
            <p className="text-white/80 text-sm font-normal mt-0.5">
              {data.slot_course}
            </p>
          </Box>
        </Box>

        {/* Decorative circles */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            right: 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        />
      </DialogTitle>

      <DialogContent sx={{ padding: "24px", paddingTop: "20px !important" }}>
        <Box className="space-y-1">
          <InfoRow
            icon={MenuBookIcon}
            label="Course Code"
            value={data.course_code}
            iconColor="text-red-700"
          />

          <Divider sx={{ marginY: 1 }} />

          <InfoRow
            icon={MenuBookIcon}
            label="Course Description"
            value={data.course_name}
            iconColor="text-red-700"
          />

          <Divider sx={{ marginY: 1 }} />

          <InfoRow
            icon={AccessTimeIcon}
            label="Allocated Time Slot"
            value={convertedTime}
            iconColor="text-red-700"
          />

          {context === "room" && (
            <>
              <Divider sx={{ marginY: 1 }} />
              <InfoRow
                icon={PersonIcon}
                label="Instructor"
                value={teacherName || "N/A"}
                iconColor="text-red-700"
              />
            </>
          )}

          {context === "teacher" && (
            <>
              <Divider sx={{ marginY: 1 }} />
              <InfoRow
                icon={MeetingRoomIcon}
                label="Room Assignment"
                value={data.room_name || "N/A"}
                iconColor="text-red-700"
              />
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          fullWidth
          sx={{
            fontWeight: 600,
            borderRadius: "10px",
            padding: "10px",
            textTransform: "none",
            fontSize: "15px",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
