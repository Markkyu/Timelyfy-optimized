import { Card, CardContent } from "@mui/material";
import { Info, Target, Users2, BookMarked } from "lucide-react";

export default function CollegeInfoPanel({ college }) {
  const infoSections = [
    {
      icon: Target,
      title: "Mission",
      content:
        college?.mission ||
        "Providing quality education and fostering academic excellence in our field of study.",
      color: "bg-blue-50 border-blue-500 text-blue-800",
    },
    {
      icon: Users2,
      title: "Department Head",
      content: college?.department_head || "Not Assigned",
      color: "bg-green-50 border-green-500 text-green-800",
    },
    {
      icon: BookMarked,
      title: "Academic Focus",
      content:
        college?.academic_focus ||
        "Comprehensive curriculum covering theoretical foundations and practical applications.",
      color: "bg-purple-50 border-purple-500 text-purple-800",
    },
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Info className="text-red-800" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">
            Program Information
          </h2>
        </div>

        <div className="space-y-4">
          {infoSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${section.color}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Details */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Facts</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">College ID</p>
              <p className="text-sm font-semibold text-gray-800">
                {college?.college_id}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="text-sm font-semibold text-green-700">Active</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Campus</p>
              <p className="text-sm font-semibold text-gray-800">
                {college?.campus || "Main Campus"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Building</p>
              <p className="text-sm font-semibold text-gray-800">
                {college?.building || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
