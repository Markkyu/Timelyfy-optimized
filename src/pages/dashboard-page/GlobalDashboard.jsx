// React imports and hooks
import { useState } from "react";
import useColleges from "@hooks/useColleges";
import { useQuery } from "@tanstack/react-query";
// Components
import CollegeCard from "./components/CollegeCard";
import StatCard from "./StatCard";
import EmptyContent from "@components/EmptyContent";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
// MUI
import { Pagination, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleAltIcon from "@mui/icons-material/People";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
// State store
import useAuthStore from "@stores/useAuthStore";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import AddCollegeForm from "./components/AddCollegeForm";

export default function GlobalDashboard({ role }) {
  const [openCollege, setOpenCollege] = useState(false);

  const {
    data: colleges,
    isPending: colleges_loading,
    error: colleges_error,
  } = useQuery(createCollegeQueryOptions());

  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Show 6 per page

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedColleges = colleges?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (colleges_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent
          errorTitle={"Unable to Load Colleges"}
          error={colleges_error}
        />
      </div>
    );

  return (
    <div className="p-6 h-full gap-6 flex flex-col ">
      {/* Main content */}
      <main className="flex-1 h-full bg-white border-12 border-white rounded-4xl shadow-md">
        {colleges_loading ? ( // Data Loading
          <section className="h-full flex flex-col items-center justify-center">
            <LoadingContent
              loadingTitle={"Colleges"}
              loadingDesc={"Fetching your academic programs..."}
            />
          </section>
        ) : colleges?.length === 0 ? ( // Data is Empty
          <section className="flex flex-col items-center justify-center h-full">
            <EmptyContent
              emptyTitle={"No College Programs Yet"}
              emptyDesc={
                "Get started by requesting to add a college program. You can manage courses, teachers, and schedules college program is created."
              }
              icon={SchoolIcon}
            />
          </section>
        ) : (
          <div className="p-8 flex flex-col h-full">
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 ">
                <div className="bg-red-200 p-2 rounded-lg">
                  <SchoolIcon className="text-red-800" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Academic Programs
                </h2>
              </div>

              {
                /* Add College Program Button - Only for Admin and Super Admin */
                role === "admin" || role === "master_scheduler" ? (
                  <button
                    onClick={() => setOpenCollege(true)}
                    className="bg-red-800 rounded-full font-semibold cursor-pointer text-white shadow-md py-2 px-3"
                  >
                    <LibraryAddIcon className="mr-2" />
                    Add College Program
                  </button>
                ) : null
              }
            </header>

            {/* Grid of Cards */}
            <section className="grid grid-cols-3 grid-rows-2 gap-6 flex-1">
              {paginatedColleges?.map((college) => (
                <CollegeCard key={college.college_id} college={college} />
              ))}
            </section>

            {/* Pagination */}
            <footer className="flex justify-center mt-6">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(colleges?.length / itemsPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="error"
                  shape="rounded"
                  size="large"
                />
              </Stack>
            </footer>
          </div>
        )}
      </main>

      {/* Add College Form Dialog */}
      <AddCollegeForm
        open={openCollege}
        onClose={() => setOpenCollege(false)}
      />
    </div>
  );
}
