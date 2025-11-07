import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function TutorialCard({
  title,
  description,
  onClick,
  icon,
  color,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${color} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-5xl filter drop-shadow-lg">{icon}</span>
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
            <ChevronRight
              className="text-white transform group-hover:translate-x-1 transition-transform duration-300"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Hover Effect Line */}
      <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
