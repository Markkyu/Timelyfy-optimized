import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const navigationCards = [
  {
    id: "courses",
    title: "Course List",
    description: "View and manage all courses and subjects for this program",
    icon: BookOpen,
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    route: (collegeId) => `/course-list/${collegeId}`,
  },
  {
    id: "teachers",
    title: "Teachers",
    description: "View faculty members assigned to this academic program",
    icon: GraduationCap,
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    route: (collegeId) => `/teachers/${collegeId}`,
  },
  {
    id: "schedules",
    title: "Schedules",
    description: "Access and manage class schedules and timetables",
    icon: Calendar,
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-500",
    route: (collegeId) => `/schedules/${collegeId}`,
  },
];

export default function NavigationCards({ collegeId }) {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {navigationCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.id}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group "
            onClick={() => handleNavigate(card.route(collegeId))}
          >
            <CardContent className="p-6">
              <div
                className={`${card.bgColor} p-4 rounded-xl border-l-4 ${card.borderColor} mb-4`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`bg-gradient-to-br ${card.color} p-3 rounded-lg shadow-md`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <ArrowRight
                    className="text-gray-400 group-hover:text-red-800 group-hover:translate-x-2 transition-all"
                    size={28}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-800 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
    // <div className="grid grid-cols-1 gap-6 mb-6">
    //   <Card className="shadow-lg hover:shadow-2xl cursor-pointer ">
    //     <CardContent className="p-6 border-l-4">
    //       <div className="p-4 mb-2 flex justify-between">
    //         <div>
    //           <h3 className="text-2xl font-bold text-gray-800 mb-2 transition-colors">
    //             {/* {card.title} */}
    //             Major in Financial Management
    //           </h3>
    //           <p className="text-gray-600 text-sm leading-relaxed">
    //             {/* {card.description} */}
    //             This is a description for Financial Management
    //           </p>
    //         </div>

    //         <div className="flex gap-4">
    //           <div className="size-20 bg-gradient-to-br from-cyan-600 to-cyan-800 p-4 rounded-2xl shadow-lg">

    //           </div>
    //           <div className="size-20 bg-gradient-to-br from-green-600 to-green-800 p-4 rounded-2xl shadow-lg"></div>
    //         </div>
    //         {/* <ArrowRight
    //           className="text-gray-400 group-hover:translate-x-2 transition-all"
    //           size={28}
    //         /> */}
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {navigationCards.map((card) => {
    const Icon = card.icon;
    return (
      <Card
        key={card.id}
        className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
        onClick={() => handleNavigate(card.route(collegeId))}
      >
        <CardContent className="p-6">
<div
  className={`${card.bgColor} p-4 rounded-xl border-l-4 ${card.borderColor} mb-4`}
>
  <div className="flex items-center justify-between">
    <div
      className={`bg-gradient-to-br ${card.color} p-3 rounded-lg shadow-md`}
    >
      <Icon className="text-white" size={32} />
    </div>
    <ArrowRight
      className="text-gray-400 group-hover:text-red-800 group-hover:translate-x-2 transition-all"
      size={28}
    />
  </div>
</div>

<h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-800 transition-colors">
  {card.title}
</h3>
<p className="text-gray-600 text-sm leading-relaxed">
  {card.description}
</p>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="text"
              endIcon={<ArrowRight size={18} />}
              sx={{
                color: "#7f1d1d",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(127, 29, 29, 0.04)",
                },
              }}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div> */
}
