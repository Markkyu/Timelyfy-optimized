import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-full flex items-center justify-center rounded-2xl">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-gray-800 animate-pulse">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 my-4 text-2xl md:text-xl ">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-4xl font-semibold text-white text-lg cursor-pointer bg-red-800 shadow-md"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
