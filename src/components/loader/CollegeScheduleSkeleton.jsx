// components/ScheduleTableSkeleton.jsx
import React from "react";

export default function CollegeScheduleSkeleton({
  headers,
  timeSlotsCount = 16,
}) {
  return (
    <div className="w-full mt-28 max-w-7xl  mx-auto border-t-6 border-t-red-800 bg-white p-6 rounded-2xl shadow-md border border-gray-300 overflow-x-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between mb-4">
        <div className="h-8 w-48 bg-gray-300 rounded-lg"></div>
        <div className="flex gap-4">
          <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <table className="w-full border-collapse text-sm text-gray-700 border-x-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold rounded-tl-lg">
              TIME
            </th>
            {headers?.map((_, i) => (
              <th
                key={i}
                className="border border-gray-300 px-4 py-3 text-center font-semibold"
              >
                <div className="h-4 w-16 bg-gray-300 mx-auto rounded"></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: timeSlotsCount }).map((_, timeIndex) => (
            <tr key={timeIndex}>
              {/* Time column skeleton */}
              <td className="border-y border-l border-gray-300 px-3 py-4 text-center font-medium">
                <div className="h-4 w-12 bg-gray-300 mx-auto rounded"></div>
              </td>

              {/* Day columns skeleton */}
              {headers?.map((_, dayIndex) => (
                <td
                  key={dayIndex}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  <div className="h-6 w-full bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
