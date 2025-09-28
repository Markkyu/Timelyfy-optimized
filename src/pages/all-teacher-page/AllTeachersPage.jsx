// React hooks
import { useState } from "react";

// MUI Icons and Components
import { Button } from "@mui/material";
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

  const {
    data: teachers,
    isLoading: teachers_loading,
    error: teachers_error,
  } = useTeachers();

  // Search Function
  const filteredData = teachers?.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Error State return
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
      {/* Header — Back Button, Info/ Warning */}
      <header>
        <PageHeader />
      </header>
      {/* Main content */}
      <main className="bg-gray-50 border-12 border-gray-50 rounded-2xl shadow-md flex-1 overflow-auto p-8">
        {teachers_loading ? ( // Loading State
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingContent
              loadingTitle={"Teachers"}
              loadingDesc={"Getting teachers information..."}
            />
          </div>
        ) : teachers?.length === 0 ? ( // Empty State
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
          <div>
            <header className="flex justify-between mb-6">
              {/* Header with Search Bar */}
              <TeacherListHeader count={teachers?.length} />
              {/* Search Bar */}
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </header>

            {/* Teachers List with Live Search*/}
            <div className="flex flex-col gap-6">
              {filteredData?.length > 0 ? (
                filteredData?.map((teacher, index) => (
                  <TeacherCard key={index} teacher={teacher} />
                ))
              ) : (
                <div className="text-center font-semibold text-2xl">{`No teachers found with the name "${searchTerm}"`}</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
