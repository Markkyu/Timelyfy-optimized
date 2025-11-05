// Simplified ScheduleTable component
// Only receives: slot_time, slot_day, slot_course

import generateTimeSlots from "./generateTimeSlots";
import { colorPalette } from "./colorPalette";
import CloseIcon from "@mui/icons-material/Close";

export default function ScheduleTableRead({
  schedules,
  //  onCellClick
}) {
  const timeSlots = generateTimeSlots();

  const headers = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Find if a course exists on a given day and time
  const findCourseAt = (dayIndex, timeIndex) =>
    schedules?.find(
      (s) => s.slot_day === dayIndex && s.slot_time === timeIndex
    );

  // Lunch breaks for 11:00-1:00 blocks
  const isLunchBreak = (timeIndex) => timeIndex === 10 || timeIndex === 11;

  // Assign consistent colors
  const courseColorMap = {};
  let colorIndex = 0;
  schedules?.forEach((sched) => {
    const key = sched.slot_course;
    if (!courseColorMap[key]) {
      courseColorMap[key] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-2xl shadow-md ">
      <h2 className="text-xl font-bold mb-4 text-red-800">Weekly Schedule</h2>

      <table className="w-full border-collapse text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-800 text-gray-50">
            <th className="border px-4 py-2 text-center">TIME</th>
            {headers?.map((weekday, i) => (
              <th key={i} className="border px-4 py-2 text-center uppercase">
                {weekday}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td className="border px-2 py-3 text-center font-semibold">
                {time.time_slot}
              </td>

              {headers.map((_, dayIndex) => {
                const course = findCourseAt(dayIndex, timeIndex);

                if (isLunchBreak(timeIndex)) {
                  return (
                    <td
                      key={`${dayIndex}-${timeIndex}`}
                      className="border bg-amber-50 text-center text-gray-600 italic"
                    >
                      Lunch Break
                    </td>
                  );
                }

                // Prevent duplicate rows from merging
                const previous = findCourseAt(dayIndex, timeIndex - 1);
                if (previous && previous.slot_course === course?.slot_course)
                  return null;

                // Count row span for merged rows
                let rowSpan = 1;
                if (course) {
                  for (let i = timeIndex + 1; i < timeSlots.length; i++) {
                    const next = findCourseAt(dayIndex, i);
                    if (next && next.slot_course === course.slot_course) {
                      rowSpan++;
                    } else break;
                  }
                }

                const courseColor = course
                  ? courseColorMap[course.slot_course]
                  : null;

                return (
                  <td
                    key={`${dayIndex}-${timeIndex}`}
                    rowSpan={rowSpan}
                    // onClick={() => onCellClick(course, dayIndex, timeIndex)}
                    className={`border-y border-gray-300 text-center font-medium cursor-pointer transition-all duration-200 ease-out ${
                      course
                        ? `${courseColor.bg} ${courseColor.border} shadow-md rounded-xl scale-95 hover:scale-104`
                        : "hover:bg-green-50"
                    }`}
                  >
                    {course && (
                      <div className="relative">
                        <span className="text-white font-semibold">
                          {course.slot_course}
                        </span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
