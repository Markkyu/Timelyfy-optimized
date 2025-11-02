// components/RoomListView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import { Calendar, Trash2, Edit, ChevronRight, DoorOpen } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "@api/roomsAPI";
import createRoomQueryOptions from "@hooks/createRoomQueryOptions";
import RenderWhenRole from "@components/RenderWhenRole";
// import EditRoomForm from "./EditRoomForm";

export default function RoomListView({ room }) {
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteRoom = async () => {
    if (confirm(`Are you sure you want to delete ${room.room_name}?`)) {
      await deleteRoom(room.room_id);
      queryClient.invalidateQueries({
        queryKey: createRoomQueryOptions().queryKey,
      });
    }
  };

  const handleViewSchedule = () => {
    navigate(`/room/${room.room_id}/schedule`);
  };

  const getGradient = (name) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl hover:border-maroon hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-6 p-6">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: getGradient(room.room_name) }}
        >
          <DoorOpen size={28} className="text-white" />
        </div>

        {/* Room Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-maroon transition-colors">
            {room.room_name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Room ID: {room.room_id}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={handleViewSchedule}
            startIcon={<Calendar size={16} />}
            sx={{
              bgcolor: "maroon",
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#600000",
              },
            }}
          >
            View Schedule
          </Button>

          <RenderWhenRole role={["master_scheduler", "admin"]}>
            <IconButton
              onClick={() => setOpenEdit(true)}
              sx={{ color: "gray" }}
            >
              <Edit size={20} />
            </IconButton>

            <IconButton
              onClick={handleDeleteRoom}
              sx={{
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.lighter",
                },
              }}
            >
              <Trash2 size={20} />
            </IconButton>
          </RenderWhenRole>

          <IconButton onClick={handleViewSchedule} sx={{ color: "gray" }}>
            <ChevronRight size={20} />
          </IconButton>
        </div>
      </div>

      {/* <EditRoomForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        room={room}
      /> */}
    </div>
  );
}
