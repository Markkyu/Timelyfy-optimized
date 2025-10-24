import { Card, CardContent } from "@mui/material";
import { Calendar, BookOpen } from "lucide-react";

export default function PhaseHeader({ year, sem, currentPhaseDesc }) {
  return (
    <Card className="shadow-xl border-t-4 border-red-800 mb-6">
      <CardContent className="p-8">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Academic Year {year}
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="text-red-800" size={28} />
              <span className="font-semibold">Semester {sem}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-800">
          <div className="flex items-start gap-3">
            <BookOpen className="text-red-800 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Current Phase
              </h3>
              <p className="text-gray-700">{currentPhaseDesc}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
