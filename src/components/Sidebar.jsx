import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="h-full flex flex-col bg-gray-800 border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-end">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg transition-all hover:bg-gray-500 hover:cursor-pointer"
        >
          {expanded ? (
            <ChevronsLeft color="white" />
          ) : (
            <ChevronsRight color="white" />
          )}
        </button>
      </div>

      <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3">{children}</ul>
      </SidebarContext.Provider>
    </nav>
  );
}

export const SidebarItem = ({ icon, text, path, onClick }) => {
  const { expanded } = useContext(SidebarContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${path}`);

    if (onClick) {
      onClick();
    }
  };

  return (
    <li
      className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-gray-500 text-gray-200 z-10"
      onClick={handleClick}
    >
      {icon}
      <span
        className={`whitespace-nowrap duration-300 overflow-hidden transition-all ${
          expanded ? "w-45 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div className="text-center absolute bg-gray-800 left-full rounded-md px-2 py-1 ml-6 text-white text-sm invisible -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
};
