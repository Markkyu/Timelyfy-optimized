// React hooks
import { useParams } from "react-router-dom";
import { useState } from "react";
import useTeachersDepartment from "@hooks/useTeachersDepartment";

// MUI Icons and Components
import { Button, Typography, Chip, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Page Components
import TeacherForm from "./components/AddTeacherForm";
import LoadingContent from "@components/LoadingContent";
import EmptyContent from "@components/EmptyContent";
import ErrorContent from "@components/ErrorContent";
import TeacherCard from "./components/TeacherCard";
import TeacherListHeader from "@pages/all-teacher-page/components/TeacherListHeader";
import SearchBar from "@components/SearchBar";
import PageHeader from "./components/PageHeader";

export default function TeacherPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4; // shows 4 teacher per page

  const { department } = useParams(); // gets URL params

  const {
    data: teachers,
    isLoading: teachers_loading,
    error: teachers_error,
  } = useTeachersDepartment(department);

  // Pagination Slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = teachers?.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil((teachers?.length || 0) / rowsPerPage);

  // if error occurred in teachers data
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
    <div className="space-y-6 p-6 h-full flex flex-col justify-center">
      {/* Header - Back, Info, Add Teacher */}
      <header>
        <PageHeader onClick={() => setOpenForm(true)} />
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 border-12 border-gray-50 rounded-2xl shadow-md flex-1 p-4">
        {teachers_loading ? ( // Loading State
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingContent
              loadingTitle={"Teachers"}
              loadingDesc={"Getting teachers information..."}
            />
          </div>
        ) : teachers.length === 0 ? ( // Empty State
          <div className="flex flex-col items-center justify-center h-full">
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
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-6">
                {/* Teacher List Header + Chip */}
                <TeacherListHeader count={teachers?.length} />
                {/* Search Bar */}
                <div className="w-auto">
                  <SearchBar
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Teachers List with Pagination */}
              <div className="flex flex-col gap-6">
                {paginatedData?.map((teacher, index) => (
                  <TeacherCard key={index} teacher={teacher} />
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

      {/* Teacher Form Modal */}
      <TeacherForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        department={department}
      />
    </div>
  );
}
