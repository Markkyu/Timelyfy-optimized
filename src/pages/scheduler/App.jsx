// React imports
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

// MUI Components and Icons
import { Button, Snackbar, Alert, Radio } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockIcon from "@mui/icons-material/Lock";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import UploadIcon from "@mui/icons-material/Upload";
import { ArrowLeft, CloudFog } from "lucide-react";

// Components
import ToastNotification from "@components/ToastNotification";
import CourseList from "./CourseList";
import ScheduleTable from "./ScheduleTable";
import DurationToggle from "./DurationToggle";
import validateSlot from "./validateSlot";
import ListRemoveCourse from "./ListRemoveCourse";
import AutoAllocatingOverlay from "./AutoAllocatingOverlay";
import RemoveLockSchedules from "./RemoveLockSchedules";

// Tanstack and API
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getSchedules from "./api/getSchedules";
import autoAllocate from "./api/autoAllocate";
import uploadSchedule from "./api/uploadSchedule";
import { getCourses } from "./api/getCourses";
import createSchedulesQueryOptions from "./api/createSchedulesQueryOptions";
import createCoursesQueryOptions from "./api/createCoursesQueryOptions";
import createCollegeQueryOptions, {
  useCollegeQueryById,
} from "@hooks/createCollegeQueryOptions";
import classGroupSchedQuery from "./api/classGroupSchedQuery";
import uploadSchedulePython from "./api/uploadSchedulePython";
import useAuthStore from "@stores/useAuthStore";
import checkSchedulesJS from "./api/checkSchedulesJS";
import DisplayConflict from "./displayConflict";
import UploadConfirm from "./UploadConfirm";
import RenderWhenPhase from "@components/RenderWhenPhase";
import createPhaseQueryOptions from "@hooks/createPhaseQueryOptions";
import API from "@api/axios";

const timeHeader = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function SchedulerApp() {
  const [searchParams] = useSearchParams();
  const { college, class_group } = useParams();
  const { user } = useAuthStore();

  const year = searchParams.get("year");
  const sem = searchParams.get("sem");

  const college_group = college;
  const college_year = year;
  const college_sem = sem;

  const navigate = useNavigate();

  const { data: collegeList } = useQuery(createCollegeQueryOptions());

  const { data: phase, isPending: phaseLoading } = useQuery(
    createPhaseQueryOptions()
  );

  const isCurrentPhase =
    phase?.phase_year == college_year &&
    phase?.phase_sem == college_sem &&
    phase?.phase_supervisor == user?.role;

  // to display the current college
  const currCollege = collegeList?.find((c) => c.college_id == college_group);

  // Track selected course state
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Allocating error message
  const [allocatingError, setAllocatingError] = useState(null);
  const [lockSchedulesLoading, setLockSchedulesLoading] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [toastTrigger, setToastTrigger] = useState(0);

  // State about CONFLICTS
  const [showConflictState, setShowConflictState] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);

  const [uploadConfirmOpen, setUploadConfirmOpen] = useState(false);

  // from DB schedules' state
  const [existingSchedules, setExistingSchedules] = useState([]);
  const [queueSubjects, setQueueSubjects] = useState([]);

  // newly plotted (temporary) state
  const [newSchedules, setNewSchedules] = useState([]);
  const [expandedSchedules, SetExpandedSchedules] = useState([]); // to simulate merging

  const queryClient = useQueryClient();

  // fetch via tanstack
  const {
    data: getInitialCourses,
    isPending: queue_loading,
    error: queue_error,
  } = useQuery(
    createCoursesQueryOptions(college_group, college_year, college_sem)
  );

  const {
    data: getInitialSchedules,
    isPending: schedules_loading,
    error: schedules_error,
  } = useQuery(classGroupSchedQuery(class_group));

  const allSchedules = useMemo(() => {
    return [...existingSchedules, ...newSchedules];
  }, [existingSchedules, newSchedules]);

  // Check if any course is partially scheduled
  const hasPartiallyScheduledCourses = useMemo(() => {
    return queueSubjects.some((course) => {
      // Check if this course has any schedules in newSchedules
      const hasSchedules = newSchedules.some(
        (sched) => sched.slot_course === course.course_id
      );

      // Partially scheduled = has some schedules but hours remaining
      return hasSchedules && course.hours_week > 0 && course.is_plotted !== 1;
    });
  }, [queueSubjects, newSchedules]);

  // Disable lock button if:
  // 1. User is actively working on a selected course with remaining hours
  // 2. OR any course is partially scheduled (incomplete)
  // 3. OR there are no new schedules to lock
  const disabledLockButton =
    (selectedCourse && selectedCourse.hours_week > 0) ||
    hasPartiallyScheduledCourses ||
    newSchedules.length === 0;

  // duration state
  const [duration, setDuration] = useState(1);

  // Auto allocate states
  const [allocating, setAllocating] = useState(false);
  const [allocatingStatus, setAllocatingStatus] = useState("loading");

  const [selectedCourseOriginalHours, setSelectedCourseOriginalHours] =
    useState(null);

  const disableFillButton = newSchedules.length != 0;

  // Load the queue and the timetable with data
  useEffect(() => {
    if (getInitialCourses) {
      setQueueSubjects(getInitialCourses);
    }
  }, [getInitialCourses]);

  useEffect(() => {
    if (getInitialSchedules) {
      setExistingSchedules(getInitialSchedules);
    }
  }, [getInitialSchedules]);

  const handleCellClick = (course, dayIndex, timeIndex) => {
    const validation = validateSlot({
      dayIndex,
      timeIndex,
      duration,
      selectedCourse,
      existingSchedules,
      newSchedules,
    });

    if (!validation.valid) {
      console.error(validation.message);
      setToastMessage(validation.message);
      setToastType("error");
      setToastTrigger((prev) => prev + 1);
      return;
    }

    // Proceed with placement logic if valid
    let slotsNeeded = duration === 1 ? 2 : duration === 1.5 ? 3 : 1;

    const newEntries = Array.from({ length: slotsNeeded }, (_, i) => ({
      course_id: selectedCourse.course_id,
      class_id: class_group,
      slot_course: selectedCourse.course_id,
      teacher_id: selectedCourse.assigned_teacher,
      room_id: selectedCourse.assigned_room,
      slot_day: dayIndex,
      slot_time: timeIndex + i,
    }));

    // Update state
    setNewSchedules((prev) => [...prev, ...newEntries]);

    setQueueSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.course_code === selectedCourse.course_code
          ? { ...subject, hours_week: subject.hours_week - duration }
          : subject
      )
    );

    setSelectedCourse((prevCourse) => ({
      ...prevCourse,
      hours_week: prevCourse.hours_week - duration,
    }));
  };

  const handleRemoveSchedule = (day, startTime) => {
    // Find course at clicked slot
    const target = newSchedules.find(
      (s) => s.slot_day === day && s.slot_time === startTime
    );
    if (!target) return;

    const courseId = target.slot_course;

    // Find contiguous block (rowSpan)
    let timePointer = startTime;
    let block = [];

    while (true) {
      const cell = newSchedules.find(
        (s) =>
          s.slot_day === day &&
          s.slot_time === timePointer &&
          s.slot_course === courseId
      );
      if (!cell) break;
      block.push(cell);
      timePointer++;
    }

    // Remove the full contiguous duration
    setNewSchedules((prev) => prev.filter((s) => !block.includes(s)));

    const hoursToRestore = block.length * 0.5;

    // Restore hours in queue subjects
    setQueueSubjects((prev) =>
      prev.map((subject) =>
        subject.course_id === courseId
          ? { ...subject, hours_week: subject.hours_week + hoursToRestore }
          : subject
      )
    );

    // Restore hours to selected course if applicable
    setSelectedCourse((prev) =>
      prev?.course_id === courseId
        ? { ...prev, hours_week: prev.hours_week + hoursToRestore }
        : prev
    );

    console.log(
      `Removed full block for course ${courseId}, restored ${hoursToRestore} hrs.`
    );
  };

  const handleAutoAllocate = async () => {
    // Filter the subjects based on the user
    const slots = queueSubjects
      .filter(
        (s) =>
          s.hours_week > 2 &&
          s.is_plotted !== 1 &&
          (Number(s.assigned_teacher) > 0 || Number(s.assigned_room) > 0) &&
          s.created_by == user.id &&
          s.merge_colleges == null
      )
      .map((s) => ({
        course_ID: s.course_id,
        teacher_ID: s.assigned_teacher?.toString() || null,
        room_ID: s.assigned_room?.toString() || null,
        class_ID: class_group,
      }));

    // wait for how many ms - simulate
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    try {
      setLockSchedulesLoading(true); // disable the button
      setAllocating(true);
      setAllocatingStatus("loading");

      // “thinking”

      const assigningSchedules = await autoAllocate(slots);

      if (!assigningSchedules || assigningSchedules.length === 0) {
        setAllocatingStatus("empty");
        return;
      }

      setAllocatingStatus("success");

      // success - animate insertion
      for (let i = 0; i < assigningSchedules.length; i++) {
        setNewSchedules((prev) => [...prev, assigningSchedules[i]]);
        await sleep(30);
      }

      // update hours
      setQueueSubjects((prev) =>
        prev.map((subject) => {
          const scheduledCount = assigningSchedules.filter(
            (s) => s.slot_course === subject.course_id
          ).length;
          const hoursUsed = scheduledCount * 0.5;
          return hoursUsed > 0
            ? { ...subject, hours_week: subject.hours_week - hoursUsed }
            : subject;
        })
      );
    } catch (err) {
      console.error(err.message);
      setAllocatingError(err.message);
      setAllocatingStatus("error");
    } finally {
      await sleep(500);
      setAllocating(false);
      setSelectedCourse(null);
      setLockSchedulesLoading(false);
    }
  };

  const { mutate: uploadScheduleMutation, isPending: pendingScheduleCheck } =
    useMutation({
      mutationFn: (newSchedules) => uploadSchedule(newSchedules),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses", college, college_year, college_sem],
        });
        // queryClient.invalidateQueries({
        //   queryKey: ["schedules"],
        // });
        queryClient.invalidateQueries({
          queryKey: ["course", college],
        });
        queryClient.invalidateQueries({
          queryKey: ["class-schedules"],
        });

        existingSchedules.push(...newSchedules);

        setSelectedCourse(null);
        setNewSchedules([]);

        setToastMessage("Schedules successfully saved!");
        setToastType("success");
        setToastTrigger((prev) => prev + 1);

        setLockSchedulesLoading(false);
      },

      onError: (error) => {
        console.error(error);
        setToastMessage(`Error saving schedules: ${error?.message}`);
        setToastType("error");
        setToastTrigger((prev) => prev + 1);
        setLockSchedulesLoading(false);
      },
    });

  const conflictCheckB4Sched = async (mergedSchedule) => {
    try {
      setLockSchedulesLoading(true);
      const result = await checkSchedulesJS(mergedSchedule);

      if (result.status === 409) {
        setConflictDetails(result?.conflicts);
        setShowConflictState(true);
      } else {
        await uploadScheduleMutation(mergedSchedule);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      setToastMessage("An error has occurred");
      setToastType("error");
      setToastTrigger((prev) => prev + 1);
    } finally {
      setLockSchedulesLoading(false);
    }
  };

  const uploadScheduleToDatabase = async () => {
    try {
      setLockSchedulesLoading(true);
      const mergeResponse = await API.get(
        `${import.meta.env.VITE_API_URL}/api/schedules/merge-courses`
      );
      const { data: mergeCourses } = await mergeResponse;

      const mergeMap = new Map();

      mergeCourses.forEach((merge) => {
        if (!mergeMap.has(merge.course_origin)) {
          mergeMap.set(merge.course_origin, []);
        }
        mergeMap.get(merge.course_origin).push(merge.merge_college);
      });

      const expandedSchedules = [];

      for (const schedule of newSchedules) {
        expandedSchedules.push(schedule);

        const mergedColleges = mergeMap.get(schedule.course_id);

        if (mergedColleges && mergedColleges.length > 0) {
          mergedColleges.forEach((mergeCollege) => {
            const mergedSchedule = {
              ...schedule,
              class_id: mergeCollege,
              slot_course: `${schedule.course_id}`,
            };

            expandedSchedules.push(mergedSchedule);
          });
        }
      }

      SetExpandedSchedules(expandedSchedules);
      conflictCheckB4Sched(expandedSchedules);
    } catch (error) {
      console.error("Error uploading schedules", error);
      setToastTrigger((prev) => prev + 1);
      setToastMessage("Error uploading schedules");
      setToastType("error");
    }
  };

  const uploadForReal = () => {
    setLockSchedulesLoading(true);
    uploadScheduleMutation(expandedSchedules);
  };

  const handleResetTable = () => {
    if (!queueSubjects) return;

    const restoredCourses = queueSubjects.map((subject) => {
      const plottedCount = newSchedules.filter(
        (s) => s.slot_course === subject.course_id
      ).length;

      const restoredHours = plottedCount / 2;

      return {
        ...subject,
        hours_week: subject.hours_week + restoredHours,
      };
    });

    setNewSchedules([]);
    setQueueSubjects(restoredCourses);
    setSelectedCourse(null);

    console.log("Table reset — schedules cleared and hours restored.");

    setToastMessage("Table reset — schedules cleared and hours restored");
    setToastType("success");
    setToastTrigger((prev) => prev + 1);
  };

  console.log(lockSchedulesLoading);

  // Tracks incomplete hours if changed
  const getLockButtonTooltip = () => {
    if (newSchedules.length === 0) {
      return "No schedules to lock";
    }

    if (selectedCourse && selectedCourse.hours_week > 0) {
      return `Finish scheduling ${selectedCourse.course_code} first (${selectedCourse.hours_week}h remaining)`;
    }

    const incompleteCourses = queueSubjects.filter((course) => {
      const hasSchedules = newSchedules.some(
        (sched) => sched.slot_course === course.course_id
      );
      return hasSchedules && course.hours_week > 0;
    });

    if (incompleteCourses.length > 0) {
      const names = incompleteCourses
        .map((c) => `${c.course_code} (${c.hours_week}h left)`)
        .join(", ");
      return `Complete these courses first: ${names}`;
    }
    return "Lock schedules to database";
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto p-5">
      <header className="flex items-center justify-between">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(`/college/${college_group}`)}
          sx={{
            borderRadius: "10px",
            color: "#800000",
            borderColor: "#800000",
            fontWeight: 600,
            borderWidth: 2,
            textTransform: "none",
          }}
        >
          Back to Courses
        </Button>

        {/* Title */}
        <div className="text-center flex flex-col">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {currCollege?.college_name || "Loading..."}
          </h1>

          <h1 className="text-xl font-semibold text-gray-600 tracking-tight">
            {currCollege?.college_major}
          </h1>

          <p className="text-gray-700 text-lg font-semibold mt-1">
            Schedule: Year {year} / Semester {sem}
          </p>
        </div>

        {/* Course Navigation */}
        <div className="flex flex-col text-sm">
          <label
            htmlFor="course-colleges"
            className="text-gray-600 mb-1 font-medium"
          >
            Jump to College Program
          </label>
          <select
            id="course-colleges"
            className={`w-50 border border-gray-300 rounded-lg p-2  
              ${disableFillButton ? "bg-gray-300 text-gray-700" : "bg-white text-gray-800"}
              outline-0 focus:ring-2 focus:ring-red-800`}
            defaultValue=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              const values = selectedValue.split(",");
              if (selectedValue) {
                navigate(
                  `/${values[1]}${year}/schedule/${values[0]}?year=${year}&sem=${sem}` //if it works, it works
                );
                setSelectedCourse(null);
              }
            }}
            disabled={disableFillButton}
          >
            <option value="" disabled>
              Select a College
            </option>
            {collegeList?.map((c) => {
              return (
                <option
                  key={c.college_id}
                  value={`${c.college_id},${c.college_code}`}
                >
                  {c.college_name} {c.college_major}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <main className="flex flex-col gap-4 p-6">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full flex flex-col gap-4">
          {/* <RenderWhenPhase year={college_year} sem={college_sem}> */}
          <section>
            <CourseList
              courses={queueSubjects}
              courses_error={queue_error}
              courses_loading={queue_loading}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedCourseOriginalHours={selectedCourseOriginalHours}
              setSelectedCourseOriginalHours={setSelectedCourseOriginalHours}
              setToastMessage={() => {
                setToastMessage("Finish scheduling this subject first");
                setToastType("error");
                setToastTrigger((prev) => prev + 1);
              }}
            >
              <DurationToggle
                selectedCourse={selectedCourse}
                duration={duration}
                setDuration={setDuration}
              />
            </CourseList>
          </section>
          {/* </RenderWhenPhase> */}

          <div className="flex-4">
            <ScheduleTable
              schedules_loading={schedules_loading}
              schedules_error={schedules_error}
              headers={timeHeader}
              schedules={allSchedules}
              onCellClick={handleCellClick}
              selectedCourse={selectedCourse}
              onRemoveSchedule={handleRemoveSchedule}
            >
              {/* Auto Allocate */}
              <button
                onClick={handleAutoAllocate}
                disabled={disableFillButton || lockSchedulesLoading}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
              ${
                disableFillButton || lockSchedulesLoading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30"
              }`}
              >
                <AutoAwesomeIcon fontSize="small" />
                <span>{allocating ? "Allocating..." : "Auto Allocate"}</span>
              </button>

              {/* Reset Table */}
              <button
                disabled={lockSchedulesLoading}
                onClick={handleResetTable}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-semibold 
                       ${lockSchedulesLoading ? "bg-gray-900 text-gray-700 cursor-not-allowed" : ""}
                  text-sm bg-gray-500 hover:bg-gray-400 text-gray-50 shadow-md shadow-gray-900/40`}
              >
                <RotateLeftIcon fontSize="small" />
                <span>Reset Non-locked Schedules</span>
              </button>

              {/* Lock Schedule */}
              <button
                onClick={uploadScheduleToDatabase}
                title={getLockButtonTooltip()}
                disabled={disabledLockButton || lockSchedulesLoading}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
              ${
                disabledLockButton || lockSchedulesLoading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40"
              }`}
              >
                <LockIcon fontSize="small" />
                <span>{"Lock Schedule"}</span>
              </button>
            </ScheduleTable>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />
        {/* {console.log(college_year, college_sem)} */}
        {/* <RenderWhenPhase year={college_year} sem={college_sem}> */}
        <div className="w-full flex justify-center">
          <RemoveLockSchedules
            lockedSchedules={existingSchedules}
            loading={schedules_loading}
            schedules_loading={schedules_loading}
            schedules_error={schedules_error}
          />
        </div>
        {/* </RenderWhenPhase> */}

        <AutoAllocatingOverlay
          visible={allocating}
          status={allocatingStatus} // "loading" | "success" | "empty" | "error"
          errorMessage={allocatingError}
        />

        <ToastNotification
          message={toastMessage}
          type={toastType}
          duration={3500}
          trigger={toastTrigger}
        />
      </main>

      <DisplayConflict
        open={showConflictState}
        conflictDetails={conflictDetails}
        onCancel={() => setShowConflictState(false)}
      />

      <UploadConfirm
        open={uploadConfirmOpen}
        onClose={() => setUploadConfirmOpen(false)}
        desc={"Are you sure you want to lock these schedules to the database?"}
        title={"Lock Schedules"}
        onConfirm={() => {
          uploadForReal();
          setUploadConfirmOpen(false);
        }}
      />
    </div>
  );
}
