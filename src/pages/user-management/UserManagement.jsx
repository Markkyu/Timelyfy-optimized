import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Chip, Pagination, Fab } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";

import UserCard from "./components/UserCard";
import useUsers from "@hooks/useUsers";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4; // show 4 users per page

  const {
    data: users,
    isPending: users_loading,
    error: users_error,
  } = useUsers();

  // Pagination slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = users?.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil(users?.length / rowsPerPage);

  if (users_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="Unable to Load Users" error={users_error} />
      </div>
    );

  return (
    <div className="space-y-6 p-6 h-full flex flex-col justify-center">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Button
          component={Link}
          variant="extended"
          size="small"
          to={"/"}
          sx={{
            borderRadius: "30px",
            fontWeight: 600,
            bgcolor: "maroon",
            color: "white",
          }}
        >
          <ChevronLeftRoundedIcon />
          Go Back
        </Button>

        <section className="flex gap-3">
          <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <Typography variant="body2" className="text-blue-700 font-medium">
              ℹ️ This page is for registering users
            </Typography>
          </div>
          <Button
            variant="contained"
            sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
          >
            <PersonAddIcon className="mr-2" />
            Register User
          </Button>
        </section>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 border-12 border-gray-50 rounded-2xl shadow-md flex-1 overflow-auto p-8">
        {users_loading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingContent
              loadingTitle="Users"
              loadingDesc="Getting user information..."
            />
          </div>
        ) : users.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full">
            <EmptyContent
              icon={GroupIcon}
              emptyTitle="No Users Found"
              emptyDesc="Start by registering users"
            />
          </div>
        ) : (
          // Content state
          <div className="h-full flex flex-col justify-between">
            <div>
              <header className="flex justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <GroupIcon className="text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      User Management Page
                    </h2>
                    <Chip
                      label={`${users.length} user${
                        users.length !== 1 ? "s" : ""
                      }`}
                      size="small"
                      sx={{
                        bgcolor: "maroon",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </div>
                </div>
              </header>

              {/* Users List */}
              <div className="flex flex-col gap-6">
                {paginatedData.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            {/* Pagination Control */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="error"
                  shape="rounded"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
