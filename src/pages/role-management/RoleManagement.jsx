// React
import { useState } from "react";
// Material Components
import { Button, Pagination } from "@mui/material";
// Components
import ErrorContent from "@components/ErrorContent";
import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import PersonIcon from "@mui/icons-material/Person";
import UserCard from "./components/UserCard";
import PageHeader from "@pages/all-teacher-page/components/PageHeader";
import SearchBar from "@components/SearchBar";
import ContentHeader from "@components/ContentHeader";
// hooks
import useUsers from "@hooks/useUsers";

function RoleManagement() {
  const {
    data: users,
    isPending: users_loading,
    error: users_error,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const nonAdminUsers = users?.filter((user) =>
    ["user", "super_user", "master_scheduler"].includes(user?.role)
  );

  // Pagination Slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = nonAdminUsers?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((nonAdminUsers?.length || 0) / rowsPerPage);

  if (users_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent
          errorTitle={"Unable to Load Teachers"}
          error={users_error}
        />
      </div>
    );

  return (
    <div className="h-full flex flex-col p-6 space-y-4">
      <header>
        <PageHeader
          description={
            "Role Hierarchy: User ➜  Super User ➜  Master Scheduler ➜  Admin"
          }
        />
      </header>

      <main className="h-full bg-gray-50 rounded-2xl shadow-md p-8">
        {users_loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingContent
              loadingTitle={"Users"}
              loadingDesc={"Getting users information..."}
            />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <EmptyContent
              icon={PersonIcon}
              emptyTitle={"No Users Found"}
              emptyDesc={"Start by adding the users"}
            />
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between">
            <div>
              <header className="flex justify-between mb-6">
                <ContentHeader
                  title={"Role Management Page"}
                  label={"User"}
                  count={users.length}
                />
                {/* <div className="w-auto">
                  <SearchBar
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1); // reset to first page when searching
                    }}
                  />
                </div> */}
              </header>

              {/* Teachers List with Pagination */}
              <div className="space-y-4 ">
                {paginatedData?.length > 0 ? (
                  paginatedData?.map((users, index) => (
                    <UserCard key={users.id} user={users} />
                  ))
                ) : (
                  <div className="text-center font-semibold text-lg sm:text-2xl py-8">{`No teachers found with the name`}</div>
                )}
              </div>
            </div>

            {/* Pagination Control */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="error"
                  shape="rounded"
                  size="small"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default RoleManagement;
