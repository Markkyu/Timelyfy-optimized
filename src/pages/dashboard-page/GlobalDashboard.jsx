// GlobalDashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Pagination, Button } from "@mui/material";
import {
  School,
  GraduationCap,
  BookOpen,
  Users,
  Search,
  Grid,
  List,
  Plus,
  TrendingUp,
} from "lucide-react";

import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import CollegeCard from "./components/CollegeCard";
import CollegeListView from "./components/CollegeListView";
import EmptyContent from "@components/EmptyContent";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import RenderWhenRole from "@components/RenderWhenRole";
import AddCollegeForm from "./components/AddCollegeForm";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import createPhaseQueryOptions from "@hooks/createPhaseQueryOptions";

import { PHASES, STEPS } from "@pages/phase-page/components/phaseConstants";
import StatCard from "./StatCard";
import useAuthStore from "@stores/useAuthStore";
import SkeletonLoaderManage from "@components/loader/SkeletonLoaderManage";

export default function GlobalDashboard({ role }) {
  const [openCollege, setOpenCollege] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const viewModeFromUrl = searchParams.get("view-mode") || "grid";
  const [viewMode, setViewMode] = useState(viewModeFromUrl);

  const itemsPerPage = viewMode === "grid" ? 6 : 5;

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const listType = searchParams.get("view-mode");
  const [mode, setMode] = useState(listType);

  const { user } = useAuthStore();

  // Sync page with URL
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const view = searchParams.get("view-mode") || "grid";

    setPage(urlPage);
    setViewMode(view);
  }, [searchParams]);

  // College API query
  const {
    data: colleges,
    isPending: colleges_loading,
    error: colleges_error,
  } = useQuery(createCollegeQueryOptions());

  const {
    data: phases,
    isPending: phase_loading,
    isError: phase_error,
  } = useQuery(createPhaseQueryOptions());

  const phaseRoles = ["master_scheduler", "super_user", "user"];

  const [phase] = phase_loading ? [] : phases;

  const myIndex = phase_loading
    ? 0
    : phaseRoles.findIndex((a) => a === phase.phase_supervisor);

  // Search and Filter
  const filteredColleges = useMemo(() => {
    if (!colleges) return [];

    const lower = searchTerm.toLowerCase();
    return colleges.filter((college) => {
      const name = college.college_name?.toLowerCase() || "";
      const major = college.college_major?.toLowerCase() || "";
      return name.includes(lower) || major.includes(lower);
    });
  }, [colleges, searchTerm]);

  // Pagination
  const paginatedColleges = filteredColleges?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const pageCount = Math.ceil((filteredColleges?.length || 0) / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value, "view-mode": viewMode });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Stats calculation
  const stats = useMemo(() => {
    if (!colleges) return { total: 0, programs: 0, departments: 0 };

    return {
      total: colleges.length,
      programs: colleges.length,
      departments: new Set(colleges.map((c) => c.college_major)).size,
    };
  }, [colleges]);

  // Error state
  if (colleges_error)
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <ErrorContent
          errorTitle="Unable to Load Colleges"
          error={colleges_error}
        />
      </div>
    );

  // Loading state
  if (colleges_loading)
    return (
      // <div className="p-6 h-full flex items-center justify-center">
      //   <LoadingContent
      //     loadingTitle="Loading Academic Programs"
      //     loadingDesc="Fetching your colleges and programs..."
      //   />
      // </div>
      <>
        <SkeletonLoaderManage />
      </>
    );

  // Empty state
  if (colleges?.length === 0)
    return (
      <div className="min-h-screen flex p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl m-auto bg-gray-200 rounded-2xl shadow-sm border border-gray-400">
          <div className="rounded-2xl p-16">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 rounded-full p-8 mb-6">
                <School size={64} className="text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                No Academic Programs Yet
              </h3>
              <RenderWhenRole role={["user"]}>
                <>
                  <p className="text-gray-600 max-w-md mb-8">
                    To get started, please contact the admin or master scheduler
                    to have a college program assigned to you. Once assigned,
                    you will be able to manage courses, teachers, and schedules.
                  </p>
                  <p className="mt-2 underline text-gray-500">
                    If you think you have been promoted. You can try logging in
                    again.
                  </p>
                </>
              </RenderWhenRole>

              <RenderWhenRole role={["super_user"]}>
                <p className="text-gray-600 max-w-md mb-8">
                  There are no college programs yet. Please coordinate with the
                  master_scheduler or admin to set up the academic programs for
                  your institution.
                </p>
              </RenderWhenRole>

              <RenderWhenRole role={["admin", "master_scheduler"]}>
                <Button
                  variant="contained"
                  onClick={() => setOpenCollege(true)}
                  startIcon={<Plus size={20} />}
                  sx={{
                    bgcolor: "maroon",
                    fontWeight: 600,
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Add Your First Program
                </Button>
              </RenderWhenRole>
            </div>
          </div>
        </div>
        <AddCollegeForm
          open={openCollege}
          onClose={() => setOpenCollege(false)}
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <header className="space-y-4">
          {/* Title and Action Button */}
          <div className="flex justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Academic Programs
              </h1>
              <p className="text-gray-600">
                Manage your college programs, courses, and schedules
              </p>
            </div>

            <RenderWhenRole role={["admin", "master_scheduler"]}>
              <Button
                variant="contained"
                onClick={() => setOpenCollege(true)}
                startIcon={<FormatListBulletedAddIcon size={20} />}
                sx={{
                  bgcolor: "maroon",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                }}
              >
                Add College Program
              </Button>
            </RenderWhenRole>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              color="blue"
              Icon={School}
              stats={stats.total}
              description="College Departments"
            />

            <StatCard
              color="purple"
              Icon={GraduationCap}
              stats={stats.departments}
              description="Departments"
            />

            <StatCard
              label={PHASES[myIndex]?.label}
              color={PHASES[myIndex]?.color}
              Icon={PHASES[myIndex]?.icon}
              description={PHASES[myIndex]?.desc}
              colSpan={2}
              year={phase?.phase_year}
              sem={phase?.phase_sem}
            />
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
                  placeholder="Search programs or departments..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                    setSearchParams({ page: 1 });
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-maroon focus:outline-none transition-colors"
                />
              </div>

              {/* View Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    setViewMode("grid");
                    setPage(1);
                    setSearchParams({ page: 1, "view-mode": "grid" });
                  }}
                  className={`p-2 transition-colors  ${
                    viewMode === "grid"
                      ? "bg-maroon text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => {
                    setViewMode("list");
                    setPage(1);
                    setSearchParams({ page: 1, "view-mode": "list" });
                  }}
                  className={`p-2 transition-colors border-l-2 border-gray-200 ${
                    viewMode === "list"
                      ? "bg-maroon text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Results Info */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {paginatedColleges?.length || 0} of{" "}
                {filteredColleges?.length || 0} programs
              </p>
            </div>

            {paginatedColleges?.length > 0 ? (
              <>
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedColleges.map((college) => (
                      <CollegeCard key={college.college_id} college={college} />
                    ))}
                  </div>
                )}

                {viewMode === "list" && (
                  <div className="space-y-4">
                    {paginatedColleges.map((college) => (
                      <CollegeListView
                        key={college.college_id}
                        college={college}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-2">No programs found</p>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search: "{searchTerm}"
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setPage(1);
                    setSearchParams({ page: 1 });
                  }}
                  sx={{ color: "maroon" }}
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
                  onChange={handlePageChange}
                  shape="rounded"
                  size="large"
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add College Form Dialog */}
      <AddCollegeForm
        open={openCollege}
        onClose={() => setOpenCollege(false)}
      />
    </div>
  );
}
