import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Chip, Pagination } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";

import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";

import UserCard from "./components/UserCard";
import useUsers from "@hooks/useUsers";

export default function UserAssignmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4; // number of users per page

  const {
    data: users,
    isPending: users_loading,
    error: users_error,
  } = useUsers();

  console.log(users);

  // console.log(users?.filter((user) => user.role === "user"));

  // Apply search filter
  // const filteredUsers = users?.filter((user) =>
  //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredUsers = users?.filter((user) => user.role === "user");

  // Pagination Slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredUsers?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((filteredUsers?.length || 0) / rowsPerPage);

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
          to={"/"}
          variant="contained"
          sx={{ borderRadius: "20px", fontWeight: 600, bgcolor: "maroon" }}
        >
          <ArrowBackIcon className="mr-2" />
          Go Back
        </Button>

        <div className="flex items-center gap-3">
          <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <Typography variant="body2" className="text-blue-700 font-medium">
              ℹ️ This page is for assigning regular users to their respective
              departments
            </Typography>
          </div>
        </div>
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
        ) : filteredUsers?.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full">
            <EmptyContent
              icon={GroupIcon}
              emptyTitle="No Users Found"
              emptyDesc="Start by adding regular user to assign department to"
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
                      Assign Users to their respective college programs
                    </h2>
                    <Chip
                      label={`${filteredUsers.length} regular user${
                        filteredUsers.length !== 1 ? "s" : ""
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

              {/* Users List with Pagination */}
              <div className="flex flex-col gap-6">
                {paginatedData?.map((user) => (
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
