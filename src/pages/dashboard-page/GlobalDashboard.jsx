import { useState } from "react";
import useColleges from "@hooks/useColleges";

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

export default function GlobalDashboard() {
  const {
    data: colleges,
    isPending: colleges_loading,
    error: colleges_error,
  } = useColleges();

  // Mock data for testing
  // const colleges = [];
  // const colleges_loading = true;
  // const colleges_error = { message: "error" };

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
    <div className="space-y-6 p-6 h-full flex flex-col justify-center ">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Courses" count={0} icon={SchoolIcon} />
        <StatCard title="Teachers" count={0} icon={PeopleAltIcon} />
        <StatCard title="Scheduled Slots" count={0} icon={EventAvailableIcon} />
        <StatCard title="Conflicts" count={0} icon={WarningAmberIcon} />
      </div>

      {/* Main content */}
      <main className="flex-1 bg-white border-12 border-white rounded-2xl shadow-md overflow-auto">
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
              <div className="flex items-center gap-3">
                <div className="bg-red-200 p-2 rounded-lg">
                  <SchoolIcon className="text-red-800" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Academic Programs
                </h2>
              </div>
            </header>

            {/* Grid of Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {paginatedColleges?.map((college) => (
                <CollegeCard key={college.college_id} college={college} />
              ))}
            </section>

            {/* Pagination */}
            <footer className="flex justify-center mt-6">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(colleges.length / itemsPerPage)}
                  page={page}
                  onChange={handleChange}
                  color="error"
                  shape="rounded"
                  size="large"
                />
              </Stack>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
