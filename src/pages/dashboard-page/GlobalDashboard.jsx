// React imports and hooks
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useColleges from "@hooks/useColleges";
// Components
import CollegeCard from "./components/CollegeCard";
import StatCard from "./StatCard";
import EmptyContent from "@components/EmptyContent";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import RenderWhenRole from "@components/RenderWhenRole";
// MUI
import { Pagination, Stack, Button } from "@mui/material";
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
import { useSearchParams } from "react-router-dom";

export default function GlobalDashboard({ role }) {
  const [openCollege, setOpenCollege] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const itemsPerPage = 6; // Show 6 per page

  // for page persistence
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    setPage(urlPage);
  }, [searchParams]);

  // College API use query
  const {
    data: colleges,
    isPending: colleges_loading,
    error: colleges_error,
  } = useQuery(createCollegeQueryOptions());

  // pagination handle change
  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value });
  };

  // display per page
  const paginatedColleges = colleges?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Error state
  if (colleges_error)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent
          errorTitle={"Unable to Load Colleges"}
          error={colleges_error}
        />
      </div>
    );

  // Loading state
  if (colleges_loading)
    return (
      <div className="p-6 h-full gap-6 flex flex-col ">
        <main className="flex-1 h-full bg-white border-12 border-white rounded-xl shadow-md">
          <section className="h-full flex flex-col items-center justify-center">
            <LoadingContent
              loadingTitle={"Colleges"}
              loadingDesc={"Fetching your academic programs..."}
            />
          </section>
        </main>
      </div>
    );

  // Empty state
  if (colleges?.length === 0)
    return (
      <div className="p-6 h-full gap-6 flex flex-col ">
        <main className="flex-1 h-full bg-white border-12 border-white rounded-xl shadow-md">
          <section className="flex flex-col items-center justify-center h-full">
            <EmptyContent
              emptyTitle={"No College Programs Yet"}
              emptyDesc={
                "Get started by requesting to add a college program. You can manage courses, teachers, and schedules college program is created."
              }
              icon={SchoolIcon}
            />
          </section>
        </main>
      </div>
    );

  return (
    <div className="p-6 h-full gap-6 flex flex-col ">
      {/* Main content */}
      <main className="flex-1 h-full bg-white border-12 border-white rounded-xl shadow-md">
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

            <RenderWhenRole role={["admin", "master_scheduler"]}>
              <Button
                variant="contained"
                onClick={() => setOpenCollege(true)}
                startIcon={<LibraryAddIcon />}
                size="large"
                sx={{
                  bgcolor: "maroon",
                  fontWeight: "600",
                  textTransform: "none",
                  borderRadius: "50px",
                }}
              >
                Add College Program
              </Button>
            </RenderWhenRole>
          </header>

          {/* Grid of Cards */}
          <section className="grid grid-cols-3 grid-rows-2 gap-6 flex-1">
            {paginatedColleges?.map((college, index) => (
              <CollegeCard key={college.college_id} college={college} />
            ))}
          </section>

          {/* Pagination */}
          <footer className="flex justify-center mt-6">
            {/* <Stack spacing={2}> */}
            <Pagination
              count={Math.ceil(colleges?.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              // onChange={(e, value) => setPage(value)}
              color="error"
              shape="rounded"
              size="large"
            />
            {/* </Stack> */}
          </footer>
        </div>
      </main>

      {/* Add College Form Dialog */}
      <AddCollegeForm
        open={openCollege}
        onClose={() => setOpenCollege(false)}
      />
    </div>
  );
}
