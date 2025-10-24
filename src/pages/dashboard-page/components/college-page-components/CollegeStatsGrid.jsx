import { Card, CardContent } from "@mui/material";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

export default function CollegeStatsGrid({ college }) {
  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: college?.total_courses || "0",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "increase",
    },
    {
      icon: Users,
      label: "Faculty Members",
      value: college?.total_teachers || "0",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      change: "+5%",
      changeType: "increase",
    },
    {
      icon: Calendar,
      label: "Active Schedules",
      value: college?.active_schedules || "0",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      change: "Current",
      changeType: "neutral",
    },
    {
      icon: Award,
      label: "Students Enrolled",
      value: college?.total_students || "0",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      change: "+8%",
      changeType: "increase",
    },
    {
      icon: Clock,
      label: "Class Hours/Week",
      value: college?.weekly_hours || "0",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      change: "Stable",
      changeType: "neutral",
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: college?.completion_rate || "0%",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      change: "+3%",
      changeType: "increase",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`${stat.bgColor} p-3 rounded-lg border border-gray-200`}
                >
                  <div
                    className={`bg-gradient-to-br ${stat.color} p-2 rounded-md`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {stat.change}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
