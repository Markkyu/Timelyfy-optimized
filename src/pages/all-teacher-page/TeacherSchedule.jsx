// react router
import { useParams, useNavigate } from "react-router-dom";

// Tanstack
import { useTeacherQueryById } from "@hooks/createTeacherQueryOptions";
import { useQuery } from "@tanstack/react-query";

// Components
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import ScheduleTableRead from "@components/ScheduleTableRead";
import ErrorContent from "@components/ErrorContent";
import { teacherSchedulesQuery } from "@hooks/createSchedulesQuery";

export default function TeacherSchedule() {
  const { teacher_id } = useParams();
  const navigate = useNavigate();

  const { data: teacher, isPending, error } = useTeacherQueryById(teacher_id);

  const {
    data: schedules_teacher,
    isPending: schedules_loading,
    error: schedules_error,
  } = useQuery(teacherSchedulesQuery(teacher_id));

  console.log(schedules_teacher);

  const teacherFullName = teacher
    ? `${teacher?.first_name} ${teacher?.last_name}`
    : `loading`;

  //   const schedules = [
  //     {
  //       slot_course: "CS",
  //       slot_day: 0,
  //       slot_time: 0,
  //     },
  //   ];

  if (error) {
    const { message } = error;
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ErrorContent errorTitle="Teacher Schedules Error" error={error} />
      </div>
    );
  }

  return (
    <main className="flex flex-col bg-gradient-to-br from-gray-200 to-gray-300 p-8 font-sans ">
      <header className="flex items-center justify-evenly w-full mb-6 max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Back Button */}
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
        <div className="w-[150px]">
          {/* empty spacer same width as button */}
        </div>
      </header>

      {schedules_teacher && <ScheduleTableRead schedules={schedules_teacher} />}
    </main>
  );
}
