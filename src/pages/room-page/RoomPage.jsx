// RoomPage.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Button, Alert } from "@mui/material";
import {
  Grid,
  List,
  Search,
  Plus,
  ArrowLeft,
  DoorOpen,
  MapPin,
  DoorClosed,
} from "lucide-react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import RoomListView from "./components/RoomListView";
import EmptyContent from "@components/EmptyContent";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import RenderWhenRole from "@components/RenderWhenRole";
import { allRoomsQuery } from "@hooks/createRoomQueryOptions";
import { useQuery } from "@tanstack/react-query";
import AddRoomForm from "./components/AddRoomForm";
import SkeletonLoaderManage from "@components/loader/SkeletonLoaderManage";
import ToastNotification from "@components/ToastNotification";
// import AddRoomForm from "./components/AddRoomForm";
// import useRooms from "./useRooms";

export default function RoomPage() {
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("list"); // grid, list
  const rowsPerPage = viewMode === "list" ? 12 : 8;

  const navigate = useNavigate();

  const {
    data: rooms,
    isPending: rooms_loading,
    isError: rooms_error,
  } = useQuery(allRoomsQuery());

  // Search Function
  const filteredData = useMemo(() => {
    if (!rooms) return [];

    const lower = searchTerm.toLowerCase();
    return rooms?.filter((room) => {
      const roomName = room.room_name?.toLowerCase() || "";
      return roomName.includes(lower);
    });
  }, [rooms, searchTerm]);

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  // Stats
  const stats = useMemo(() => {
    if (!rooms) return { total: 0 };
    return {
      total: rooms.length,
    };
  }, [rooms]);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);

  const handleToast = (message, type) => {
    console.log(message, type);
    setToastMessage(message);
    setToastType(type);
    setToastTrigger((prev) => prev + 1);
  };

  if (rooms_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="Unable to Load Rooms" error={rooms_error} />
      </div>
    );

  if (rooms_loading)
    return (
      // <div className="flex flex-col items-center justify-center h-full">
      //   <LoadingContent
      //     loadingTitle="Loading Rooms"
      //     loadingDesc="Getting room information..."
      //   />
      // </div>

      <SkeletonLoaderManage />
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <header className="space-y-5">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              startIcon={<ArrowLeft size={18} />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                borderColor: "maroon",
                color: "maroon",
                borderWidth: 2,
              }}
            >
              back to home
            </Button>

            <RenderWhenRole role={["master_scheduler", "admin"]}>
              <Button
                variant="contained"
                onClick={() => setOpenAddRoom(true)}
                startIcon={<Plus size={18} />}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 600,
                  bgcolor: "maroon",
                  px: 3,
                }}
              >
                Add Room
              </Button>
            </RenderWhenRole>
          </div>

          {/* Title and Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Room Management
                </h1>
                <p className="text-gray-600 mb-2">
                  View and manage all rooms and their schedules
                </p>
                <Alert severity="info">
                  If you believe that your room is missing. Contact system
                  administrator or master scheduler to add it.
                </Alert>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 flex-wrap">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <DoorClosed size={16} className="text-blue-600" />
                    <p className="text-blue-600 text-sm font-medium">
                      Total Rooms
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-blue-900">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-maroon focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {rooms?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-8 mb-4">
                <MeetingRoomIcon sx={{ fontSize: 64, color: "#666" }} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Rooms Found
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Start by adding rooms to the system using the "Add Room" button
                above.
              </p>
              <RenderWhenRole role={["master_scheduler", "admin"]}>
                <Button
                  variant="contained"
                  onClick={() => setOpenAddRoom(true)}
                  startIcon={<Plus size={20} />}
                  sx={{
                    bgcolor: "maroon",
                    borderRadius: "12px",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Add Your First Room
                </Button>
              </RenderWhenRole>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Info */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {paginatedData?.length || 0} of{" "}
                  {filteredData?.length || 0} rooms
                </p>
              </div>

              {/* Content Based on View Mode */}
              {paginatedData?.length > 0 ? (
                <>
                  {viewMode === "list" && (
                    <div className="space-y-4">
                      {paginatedData.map((room) => (
                        <RoomListView
                          key={room.room_id}
                          room={room}
                          deleteToast={handleToast}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-2">No rooms found</p>
                  <p className="text-gray-500 mb-4">
                    Try searching for "{searchTerm}"
                  </p>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setPage(1);
                    }}
                    sx={{ border: 2, fontWeight: 600, color: "maroon" }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {pageCount > 1 && (
                <div className="flex justify-center pt-6 border-t border-gray-200">
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="error"
                    shape="rounded"
                    size="large"
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <AddRoomForm open={openAddRoom} onClose={() => setOpenAddRoom(false)} />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        trigger={toastTrigger}
      />
    </div>
  );
}
