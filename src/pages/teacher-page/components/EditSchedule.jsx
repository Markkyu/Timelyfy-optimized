import React from "react";
import ScheduleTable from "./ScheduleTable";

const mwfTime = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = 26; // 7:00 AM to 8:00 PM in 30-minute intervals

export default function EditSchedule() {
  const onCellClick = (startKey, endKey, generateTimeSlots) => {
    console.log("Cell clicked:", startKey, endKey, generateTimeSlots());
  };

  return (
    <>
      <div className="flex flex-col 2xl:flex-row w-full h-full justify-center items-center overflow-auto bg-red-200 p-6">
        <div className="bg-white p-4 rounded-2xl my-4">
          <ScheduleTable
            headers={mwfTime}
            times={times}
            onCellClick={onCellClick}
          />
        </div>
      </div>
    </>
  );
}
