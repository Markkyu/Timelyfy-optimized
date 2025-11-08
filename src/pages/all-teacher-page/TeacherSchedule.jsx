import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import ScheduleTableRead from "@components/ScheduleTableRead";
import ScheduleDetailsDialog from "@components/ScheduleDetailsDialog";
import ErrorContent from "@components/ErrorContent";
import LoadingContent from "@components/LoadingContent";
import { teacherSchedulesQuery } from "@hooks/createSchedulesQuery";
import { useTeacherQueryById } from "@hooks/createTeacherQueryOptions";

export default function TeacherSchedule() {
  const { teacher_id } = useParams();
  const navigate = useNavigate();

  const { data: teacher } = useTeacherQueryById(teacher_id);
  const {
    data: schedules_teacher,
    isPending,
    error,
  } = useQuery(teacherSchedulesQuery(teacher_id));

  const [selectedCourse, setSelectedCourse] = useState(null);
  const handleCellClick = (course, dayIndex, timeIndex) => {
    if (course) setSelectedCourse({ ...course, dayIndex, timeIndex });
  };

  console.log(schedules_teacher);

  const handleCloseDialog = () => setSelectedCourse(null);

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ErrorContent errorTitle="Teacher Schedules Error" error={error} />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingContent message="Loading Teacher Schedules..." />
      </div>
    );
  }

  const teacherFullName = teacher
    ? `${teacher.first_name} ${teacher.last_name}`
    : "Loading...";

  return (
    <main className="flex flex-col bg-gradient-to-br from-gray-200 to-gray-300 p-8 font-sans ">
      <header className="flex items-center justify-between w-full mb-6 max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/teachers")}
          sx={{
            borderRadius: "10px",
            color: "#800000",
            borderColor: "#800000",
            fontWeight: 600,
            borderWidth: 2,
          }}
        >
          Back to Teachers
        </Button>

        <h1 className="text-4xl font-extrabold tracking-tight whitespace-nowrap">
          {teacherFullName}'s Schedule
        </h1>

        <div className="w-[200px]"></div>
      </header>

      <ScheduleTableRead
        schedules={schedules_teacher}
        onCellClick={handleCellClick}
      />

      <ScheduleDetailsDialog
        open={!!selectedCourse}
        onClose={handleCloseDialog}
        data={selectedCourse}
        context="teacher"
      />
    </main>
  );
}
