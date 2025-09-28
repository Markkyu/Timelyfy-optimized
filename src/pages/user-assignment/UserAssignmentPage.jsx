import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Chip, Tooltip, IconButton } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SearchIcon from "@mui/icons-material/Search";

import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";

import UserCard from "./components/UserCard";

const UserAssignmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);

  // Mocked states
  const user_error = null; // { message: "error" };
  const users_loading = false;
  const users = [
    { id: 1, username: "Markkyu", college_name: "Computer Science" },
  ];

  // const filteredData = users?.filter((item) => {
  //   const fullName = `${item.first_name} ${item.last_name}`;
  //   return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  if (user_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="Unable to Load Users" error={user_error} />
      </div>
    );

  return (
    <div className="space-y-6 p-6 h-full flex flex-col justify-center">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="bg-blue-500 flex items-center justify-center font-bold text-white rounded-full p-2"
        >
          <ArrowBackIcon />
          Go Back
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <Typography variant="body2" className="text-blue-700 font-medium">
              ℹ️ This page is for assigning users to their respective
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
        ) : users.length === 0 ? (
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
          <div>
            <header className="flex justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <GroupIcon className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Assign Users to their respective departments
                  </h2>
                  <Chip
                    label={`${users.length} regular user${
                      users.length !== 1 ? "s" : ""
                    }`}
                    size="small"
                    sx={{
                      bgcolor: "#3b82f6",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>
              {/* Search Bar */}
              <section className="flex items-center border border-gray-600 rounded-full p-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-100 outline-none px-5"
                />
                <SearchIcon className="text-gray-700 mr-2" />
              </section>
            </header>

            {/* Users List */}
            <div className="flex flex-col gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserAssignmentPage;
