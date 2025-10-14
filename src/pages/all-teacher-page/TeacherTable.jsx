import React from "react";
import ScheduleTable from "./components/ScheduleTable";

const times = Array.from({ length: 21 }, (_, i) => i);
const mwfHead = ["Monday", "Wednesday", "Friday"];
const tthHead = ["Tuesday", "Thursday", "Saturday"];

export default function TeacherTable() {
  return (
    <>
      <main className="flex flex-col 2xl:flex-row justify-center items-center gap-10 p-10">
        {/* Schedule Table MWF */}
        <div className="bg-white p-4 rounded-2xl my-4">
          <ScheduleTable
            headers={mwfHead}
            times={times}
            //   onCellClick={handleCellClick}
            //   timeSlotMap={timeSlotMap}
          />
        </div>

        <div className="bg-white p-4 rounded-2xl my-4">
          <ScheduleTable
            headers={tthHead}
            times={times}
            //   onCellClick={handleCellClick}
            //   timeSlotMap={timeSlotMap}
          />
        </div>
      </main>
    </>
  );
}
