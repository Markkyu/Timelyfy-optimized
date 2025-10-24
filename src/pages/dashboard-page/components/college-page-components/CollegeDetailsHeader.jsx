import { Card, CardContent } from "@mui/material";
import { School, Code, Calendar } from "lucide-react";

export default function CollegeDetailsHeader({ college }) {
  return (
    <Card className="shadow-xl border-t-4 border-red-800 mb-6">
      <CardContent className="p-8">
        <div className="flex items-start justify-between">
          {/* Left: College Info */}
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-2xl shadow-lg">
              <School className="text-white" size={48} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {college?.college_name}
              </h1>
              {college?.college_code && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Code size={18} />
                  <span className="font-semibold text-lg">
                    {college.college_code}
                  </span>
                </div>
              )}
              <p className="text-gray-600 max-w-2xl">
                {college?.description ||
                  "Manage courses, teachers, and schedules for this academic program."}
              </p>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-blue-50 px-6 py-4 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">Established</p>
              <p className="text-2xl font-bold text-blue-700">
                {college?.year_established || "N/A"}
              </p>
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-xl border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Programs</p>
              <p className="text-2xl font-bold text-green-700">
                {college?.program_count || "0"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
