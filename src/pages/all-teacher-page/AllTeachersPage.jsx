import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, Button } from "@mui/material";
import { Search, ArrowLeft } from "lucide-react";
import PersonIcon from "@mui/icons-material/Person";
import useTeachers from "@hooks/useTeachers";
import TeacherCard from "./components/TeacherCard";
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import RenderWhenRole from "@components/RenderWhenRole";
import AddTeacherForm from "./components/AddTeacherForm";
import createTeacherQueryOptions from "@hooks/createTeacherQueryOptions";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery } from "@tanstack/react-query";
import StatCard from "@pages/dashboard-page/StatCard";

export default function AllTeachersPage() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [page, setPage] = useState(pageFromUrl);

  const rowsPerPage = 8;
  const navigate = useNavigate();

  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery(createTeacherQueryOptions());

  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlSearch = searchParams.get("search") || "";

    setPage(urlPage);
    setSearchTerm(urlSearch);
  }, [searchParams]);

  // Search
  const filteredData = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return teachers?.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`;
      return fullName.toLowerCase().includes(lower);
    });
  }, [teachers, searchTerm]);

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  // Stats
  const stats = useMemo(
    () => ({
      total: teachers?.length || 0,
    }),
    [teachers]
  );

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="Unable to Load Teachers" error={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingContent
          loadingTitle="Loading Teachers"
          loadingDesc="Getting teachers information..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
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

          <RenderWhenRole role={["master_scheduler", "admin"]}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              startIcon={<PersonAddAlt1Icon size={18} />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                bgcolor: "maroon",
              }}
            >
              Add Teacher
            </Button>
          </RenderWhenRole>
        </div>

        {/* Stats */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Teaching Staff
              </h1>
              <p className="text-gray-600">
                Manage and monitor all teachers in the system
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 min-w-[120px]">
              <p className="text-blue-600 text-sm font-medium mb-1">Total</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => {
                const newValue = e.target.value;
                setSearchTerm(newValue);
                setPage(1);

                setSearchParams({ page: 1, search: newValue });
              }}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-maroon focus:outline-none"
            />
          </div>
        </div>

        {/* Teacher Cards */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          {teachers?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-8 mb-4">
                <PersonIcon sx={{ fontSize: 64, color: "#666" }} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Teachers Found
              </h3>
              <p className="text-gray-600 text-center max-w-md">
                Start by adding teachers to the system using the "Add Teacher"
                button above.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 pb-4 border-b">
                Showing {paginatedData?.length || 0} of{" "}
                {filteredData?.length || 0} teachers
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedData.map((teacher) => (
                  <TeacherCard key={teacher.teacher_id} teacher={teacher} />
                ))}
              </div>

              {/* Pagination */}
              {pageCount > 1 && (
                <div className="flex justify-center pt-6 border-t">
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => {
                      setPage(value);
                      setSearchParams({ page: value, search: searchTerm });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    color="error"
                    shape="rounded"
                    size="large"
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <AddTeacherForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
