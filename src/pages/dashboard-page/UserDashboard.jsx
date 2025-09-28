import { Link } from "react-router-dom";
import useAuthStore from "@stores/useAuthStore";
import { Calendar, BookOpen, Users, Presentation } from "lucide-react";

const UserDashboard = () => {
  // const { profile } = useAuthStore();

  // Disable links if no assigned department
  // const isDisabled = !profile?.colleges?.college_name;

  const profile = {
    username: "Markkyu",
    assigned_department: 1,
    college_name: "Computer Science",
  };

  const cards = [
    {
      title: "Generate Schedule",
      path: `/scheduler/${profile.assigned_department}`,
      icon: <Calendar size={64} className="text-blue-600" />,
      span: "col-span-2 row-span-2",
    },
    {
      title: "Courses",
      path: `/course-list/${profile.assigned_department}`,
      icon: <BookOpen size={64} className="text-green-600" />,
      span: "col-span-2",
    },
    {
      title: "Teachers",
      path: `/teachers/${profile.assigned_department}`,
      icon: <Users size={64} className="text-purple-600" />,
    },
    {
      title: "Rooms",
      path: `/rooms/${profile.assigned_department}`,
      icon: <Presentation size={64} className="text-yellow-600" />,
    },
  ];

  return (
    <main className="h-full flex flex-col bg-gray-200">
      <header className="bg-gray-500 shadow-md rounded-b-3xl px-10 py-12 text-white">
        <div className="min-w-5xl mx-auto flex flex-col gap-4 items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome, {profile?.username}
          </h1>
          <p className="text-lg md:text-xl font-medium">
            {profile?.assigned_department ? (
              <>
                You are assigned to the{" "}
                <span className="font-semibold underline">
                  {profile?.college_name}
                </span>{" "}
                program.
              </>
            ) : (
              <span className="italic text-gray-200">
                No program assigned — please contact moderators.
              </span>
            )}
          </p>
          <h3 className="text-xl font-semibold text-yellow-200">
            🛠️ Phase 1 - Stage 1: The Master Scheduler is distributing General
            Education subjects for Year 1 - Semester 1 🛠️
            {`<-- add phase control`}
          </h3>
        </div>
      </header>

      {/* Cards Section */}

      <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-8 py-10 px-40">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.path}
            // style={{ pointerEvents: isDisabled ? "none" : "auto" }}
            className={`bg-white relative flex flex-col items-center justify-center shadow-md rounded-2xl p-8 hover:shadow-2xl transition-all cursor-pointer ${card.span}`}
          >
            {/* Icon */}
            <div className="mb-6">{card.icon}</div>
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800">{card.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default UserDashboard;
