// React hooks
import { useState } from "react";

// MUI Icons and Components
import { Pagination } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

// Custom Hooks
import useTeachers from "@hooks/useTeachers";

// Components
import TeacherCard from "./components/TeacherCard";
import TeacherListHeader from "./components/TeacherListHeader";
import PageHeader from "./components/PageHeader";
import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";
import SearchBar from "@components/SearchBar";

export default function AllTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4; // show 4 teachers per page

  const {
    data: teachers,
    isLoading: teachers_loading,
    error: teachers_error,
  } = useTeachers();

  // const teachers = [];
  // const teachers_loading = true;
  // const teachers_error = { message: "true" };

  // Search Function
  const filteredData = teachers?.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination Slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  // If error occurred in teachers data
  if (teachers_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent
          errorTitle={"Unable to Load Teachers"}
          error={teachers_error}
        />
      </div>
    );

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 bg-red-200 border-5">
      {/* Header — Back Button, Info/ Warning */}

      {/* <main className="bg-amber-300 flex flex-col h-full p-6 space-y-4"> */}
      <header>
        <PageHeader />
      </header>

      {/* Main content */}
      <main className="bg-gray-50 h-full rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
        {teachers_loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingContent
              loadingTitle={"Teachers"}
              loadingDesc={"Getting teachers information..."}
            />
          </div>
        ) : teachers?.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12">
            <EmptyContent
              icon={PersonIcon}
              emptyTitle={"No Teachers Found"}
              emptyDesc={
                "Start by adding the teachers under this deparment by clicking the add teacher (+) above."
              }
            />
          </div>
        ) : (
          // Content State
          <div className="flex flex-col h-full justify-between">
            <div>
              <header className="flex justify-between mb-6">
                <TeacherListHeader count={teachers?.length} />
                <div className="w-auto">
                  <SearchBar
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1); // reset to first page when searching
                    }}
                  />
                </div>
              </header>

              {/* Teachers List with Pagination */}
              <div className="space-y-4 ">
                {paginatedData?.length > 0 ? (
                  paginatedData?.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                  ))
                ) : (
                  <div className="text-center font-semibold text-lg sm:text-2xl py-8">{`No teachers found with the name "${searchTerm}"`}</div>
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
      {/* </main> */}
    </div>
  );
}
