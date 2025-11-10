import { Card, CardContent } from "@mui/material";
import { School, Code, Calendar } from "lucide-react";

export default function CollegeDetailsHeader({ college }) {
  return (
    <div className="shadow-md bg-white border-t-4 border-red-800 mb-6">
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-2xl shadow-lg">
              <School className="text-white" size={48} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {college?.college_name}
              </h1>
              <p className="text-gray-600 text-xl font-semibold max-w-2xl">
                {college?.college_major}
              </p>
              <p className="text-gray-600">
                Manage courses, teachers, and schedules for this academic
                program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
