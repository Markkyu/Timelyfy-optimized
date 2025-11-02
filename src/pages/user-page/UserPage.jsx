// UserPage.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import {
  Grid,
  List,
  Search,
  UserPlus,
  ArrowLeft,
  Users,
  Shield,
  UserCheck,
} from "lucide-react";
import GroupIcon from "@mui/icons-material/Group";

import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";
import UserCard from "./components/UserCard";
// import UserListView from "./components/UserListView";
import RegisterUser from "./components/RegisterUser";
import useUsers from "@hooks/useUsers";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [filterRole, setFilterRole] = useState("all"); // all, admin, teacher, student, etc.
  const rowsPerPage = viewMode === "grid" ? 8 : 6;

  const navigate = useNavigate();

  const {
    data: users,
    isPending: users_loading,
    error: users_error,
  } = useUsers();

  console.log(users);

  // Search and Filter Function
  const filteredData = useMemo(() => {
    if (!users) return [];

    const lower = searchTerm.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.username || ""}`;
      const email = user.email || "";
      const matchesSearch =
        fullName.toLowerCase().includes(lower) ||
        email.toLowerCase().includes(lower);

      const matchesRole = filterRole === "all" || user.role === filterRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  // Stats calculation
  const stats = useMemo(() => {
    if (!users) return { total: 0, admins: 0, teachers: 0, students: 0 };

    const roleCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total: users.length,
      admins: roleCount.admin || 0,
      teachers: roleCount.teacher || 0,
      students: roleCount.student || 0,
      ...roleCount,
    };
  }, [users]);

  // Get unique roles for filter buttons
  const uniqueRoles = useMemo(() => {
    if (!users) return [];
    return [...new Set(users.map((user) => user.role))];
  }, [users]);

  if (users_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="Unable to Load Users" error={users_error} />
      </div>
    );

  if (users_loading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingContent
          loadingTitle="Loading Users"
          loadingDesc="Getting user information..."
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="space-y-4">
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

            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              startIcon={<PersonAddAlt1Icon size={18} />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                bgcolor: "maroon",
                px: 3,
              }}
            >
              Register User
            </Button>
          </div>

          {/* Title and Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  User Management
                </h1>
                <p className="text-gray-600">
                  Manage users, roles, and permissions in the system
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 flex-wrap">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-blue-600" />
                    <p className="text-blue-600 text-sm font-medium">
                      Total Users
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-blue-900">
                    {stats.total}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={16} className="text-purple-600" />
                    <p className="text-purple-600 text-sm font-medium">
                      Admins
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-purple-900">
                    {stats.admins}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and View Controls */}
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
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-maroon focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3 items-center flex-wrap">
                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setFilterRole("all");
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer text-sm transition-all ${
                      filterRole === "all"
                        ? "bg-red-800 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Roles
                  </button>

                  {uniqueRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setFilterRole(role);
                        setPage(1);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium cursor-pointer text-sm transition-all capitalize ${
                        filterRole === role
                          ? "bg-red-800 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {/* View Toggle */}
                {/* <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-maroon text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors border-l-2 border-gray-200 ${
                      viewMode === "list"
                        ? "bg-maroon text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {users?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-8 mb-4">
                <GroupIcon sx={{ fontSize: 64, color: "#666" }} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Users Found
              </h3>
              <p className="text-gray-600 text-center max-w-md">
                Start by registering users to the system using the "Register
                User" button above.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Info */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {paginatedData?.length || 0} of{" "}
                  {filteredData?.length || 0} users
                  {filterRole !== "all" && (
                    <span className="ml-1 text-blue-600 font-medium">
                      (filtered by {filterRole})
                    </span>
                  )}
                </p>
              </div>

              {/* Content Based on View Mode */}
              {paginatedData?.length > 0 ? (
                <>
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {paginatedData.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </div>
                  )}

                  {/* {viewMode === "list" && (
                    <div className="space-y-4">
                      {paginatedData.map((user) => (
                        <UserListView key={user.id} user={user} />
                      ))}
                    </div>
                  )} */}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-2">
                    No users found matching your search
                  </p>
                  <p className="text-gray-500 mb-4">"{searchTerm}"</p>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterRole("all");
                      setPage(1);
                    }}
                    sx={{ color: "maroon", border: 2, fontWeight: 600 }}
                  >
                    Clear Filters
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

      <RegisterUser open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
