import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import ScheduleTableRead from "@components/ScheduleTableRead";
import ScheduleDetailsDialog from "@components/ScheduleDetailsDialog";
import { roomSchedulesQuery } from "@hooks/createSchedulesQuery";
import ErrorContent from "@components/ErrorContent";
import LoadingContent from "@components/LoadingContent";

export default function RoomSchedule() {
  const { room_id } = useParams();
  const navigate = useNavigate();

  console.log(room_id);

  const {
    data: roomSchedules,
    isPending,
    error,
  } = useQuery(roomSchedulesQuery(room_id));

  const [selectedCourse, setSelectedCourse] = useState(null);
  const handleCellClick = (course, dayIndex, timeIndex) => {
    if (course) setSelectedCourse({ ...course, dayIndex, timeIndex });
  };

  const handleCloseDialog = () => setSelectedCourse(null);

  console.log(roomSchedules);

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ErrorContent errorTitle="Room Schedules Error" error={error} />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingContent message="Loading Room Schedules..." />
      </div>
    );
  }

  const roomName = roomSchedules?.[0]?.room_name || "Room";

  return (
    <main className="flex flex-col bg-gradient-to-br from-gray-200 to-gray-300 p-8 font-sans">
      <header className="flex items-center justify-between w-full mb-6 max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/rooms")}
          sx={{
            borderRadius: "10px",
            color: "#800000",
            borderColor: "#800000",
            fontWeight: 600,
            borderWidth: 2,
          }}
        >
          Back to Rooms
        </Button>

        <h1 className="text-4xl font-extrabold tracking-tight whitespace-nowrap">
          {roomName} Schedule
        </h1>

        <div className="w-[200px]" />
      </header>

      <ScheduleTableRead
        schedules={roomSchedules}
        onCellClick={handleCellClick}
      />

      <ScheduleDetailsDialog
        open={!!selectedCourse}
        onClose={handleCloseDialog}
        data={selectedCourse}
        context="room"
      />
    </main>
  );
}
