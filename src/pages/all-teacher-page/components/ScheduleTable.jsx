import React, { useState } from "react";

// Generate Time - 30 minute iteration
function generateTimeSlots(start = 7, end = 20, step = 0.5) {
  const slots = [];
  for (let hour = start; hour < end; hour += step) {
    const startTimeHour = Math.floor(hour);
    const startTimeMinutes = hour % 1 === 0 ? "00" : "30";
    const period = startTimeHour >= 12 ? "PM" : "AM";
    const formattedHour =
      startTimeHour > 12 ? startTimeHour - 12 : startTimeHour;
    const startTime = `${formattedHour}:${startTimeMinutes} ${period}`;

    // Calculate end time
    const endHour = hour + step;
    const endTimeHour = Math.floor(endHour);
    const endTimeMinutes = endHour % 1 === 0 ? "00" : "30";
    const endPeriod = endTimeHour >= 12 ? "PM" : "AM";
    const formattedEndHour = endTimeHour > 12 ? endTimeHour - 12 : endTimeHour;
    const endTime = `${formattedEndHour}:${endTimeMinutes} ${endPeriod}`;

    slots.push({ hour, startTime, endTime, disabled: hour >= 12 && hour < 13 });
  }
  return slots;
}

const ScheduleTable = ({ headers }) => {
  const [collapsed, setCollapsed] = useState(true);

  const timeSlots = generateTimeSlots();

  return (
    <div className="my-6">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          {collapsed ? "Expand (30-min)" : "Collapse (1-hr)"}
        </button>
      </div>

      <table className="min-w-3xl mx-auto border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <td className="border border-gray-400 px-4 py-2 font-semibold">
              Time
            </td>
            {headers.map((weekday, i) => (
              <td
                key={i}
                className="border border-gray-400 px-4 py-2 font-semibold text-center"
              >
                {weekday}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {(collapsed
            ? timeSlots.filter((_, idx) => idx % 2 === 0) // show only every other row
            : timeSlots
          ) // show all rows
            .map((time, i) => {
              // For collapsed view, merge next half-hour time
              const mergedEnd =
                collapsed && timeSlots[i * 2 + 1]
                  ? timeSlots[i * 2 + 1].endTime
                  : time.endTime;

              return (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <b>{time.startTime}</b> - {mergedEnd}
                  </td>
                  {headers.map((day, j) => {
                    const startKey = `${day.toUpperCase()}_${time.hour}`;
                    const endKey = `${day.toUpperCase()}_${time.hour + 1}`;

                    return (
                      <td
                        key={j}
                        className="border border-gray-400 px-4 py-4 text-center cursor-pointer hover:bg-blue-100 transition"
                      >
                        {""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
