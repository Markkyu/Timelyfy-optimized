import { Skeleton, Button, Alert } from "@mui/material";
import { ArrowLeft, Plus, Search, DoorClosed } from "lucide-react";

export default function SkeletonLoaderManage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <header className="space-y-4">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton variant="rounded" width={150} height={44} />
            <Skeleton variant="rounded" width={140} height={44} />
          </div>

          {/* Title and Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Title + Description */}
              <div className="space-y-3 w-full">
                <Skeleton variant="text" width={250} height={36} />
                <Skeleton variant="text" width={350} height={20} />
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={70}
                  sx={{ borderRadius: "12px" }}
                />
              </div>

              {/* Stat Card */}
              <div className="flex gap-4 flex-wrap">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-2">
                    <DoorClosed size={16} className="text-blue-500" />
                    <Skeleton variant="text" width={80} height={18} />
                  </div>
                  <Skeleton variant="text" width={40} height={32} />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Skeleton variant="rounded" width="100%" height={44} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Results Info */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <Skeleton variant="text" width={180} height={18} />
          </div>

          {/* Room List View Skeletons */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <Skeleton variant="text" width="60%" height={22} />
                  <Skeleton variant="rounded" width={90} height={30} />
                </div>
                <Skeleton variant="text" width="40%" height={18} />
                <Skeleton variant="text" width="50%" height={18} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-6 border-t border-gray-200">
            <Skeleton variant="rounded" width={200} height={36} />
          </div>
        </main>
      </div>
    </div>
  );
}
