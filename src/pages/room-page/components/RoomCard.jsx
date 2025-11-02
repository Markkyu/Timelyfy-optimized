// components/RoomCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import { MoreVertical, Calendar, Trash2, Edit, DoorOpen } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "@api/roomsAPI";
import createRoomQueryOptions from "@hooks/createRoomQueryOptions";
import RenderWhenRole from "@components/RenderWhenRole";
// import EditRoomForm from "./EditRoomForm";

export default function RoomCard({ room }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteRoom = async () => {
    if (confirm(`Are you sure you want to delete ${room.room_name}?`)) {
      await deleteRoom(room.room_id);
      queryClient.invalidateQueries({
        queryKey: createRoomQueryOptions().queryKey,
      });
    }
    setAnchorEl(null);
  };

  const handleViewSchedule = () => {
    navigate(`/room/${room.room_id}/schedule`);
  };

  // Generate gradient based on room name
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
    <div className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-maroon transition-all duration-300 overflow-hidden hover:shadow-xl">
      {/* Gradient Header */}
      <div
        className="h-24 relative flex items-center justify-center"
        style={{ background: getGradient(room.room_name) }}
      >
        <div className="absolute inset-0 bg-red-800 bg-opacity-10"></div>

        {/* Menu Button */}
        <RenderWhenRole role={["master_scheduler", "admin"]}>
          <div className="absolute top-3 right-3">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.9)",
                opacity: 0,
                transition: "opacity 0.2s",
                ".group:hover &": { opacity: 1 },
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              <MoreVertical size={20} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setOpenEdit(true);
                  setAnchorEl(null);
                }}
              >
                <Edit size={16} className="mr-2" />
                Edit Room
              </MenuItem>
              <MenuItem onClick={handleDeleteRoom} sx={{ color: "error.main" }}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </MenuItem>
            </Menu>
          </div>
        </RenderWhenRole>

        {/* Room Icon */}
        <div className="relative z-10 bg-white p-4 rounded-2xl shadow-lg">
          <DoorOpen size={32} className="text-maroon" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Room Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-maroon transition-colors">
          {room.room_name}
        </h3>

        {/* View Schedule Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleViewSchedule}
          startIcon={<Calendar size={18} />}
          sx={{
            bgcolor: "maroon",
            borderRadius: "12px",
            fontWeight: 600,
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#600000",
            },
          }}
        >
          View Schedule
        </Button>
      </div>

      {/* <EditRoomForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        room={room}
      /> */}
    </div>
  );
}
