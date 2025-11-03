import { Skeleton, Button } from "@mui/material";
import { Plus, Grid, List, Search } from "lucide-react";

export default function SkeletonGlobalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <header className="space-y-4">
          {/* Title and Action */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Skeleton variant="text" width={220} height={36} />
              <Skeleton variant="text" width={300} height={20} />
            </div>

            <Skeleton variant="rounded">
              <Button
                variant="contained"
                startIcon={<Plus size={20} />}
                sx={{
                  bgcolor: "maroon",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                }}
              >
                Loading...
              </Button>
            </Skeleton>
          </div>

          {/* Stats Loader */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-4"
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={32}
                  className="mt-2"
                />
                <Skeleton variant="text" width="40%" height={20} />
              </div>
            ))}
          </div>

          {/* Search + Toggle */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <Skeleton variant="rounded" height={44} />
              </div>

              {/* View Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-200">
                  <Grid size={20} className="opacity-30" />
                </div>
                <div className="p-2 bg-gray-100 border-l-2 border-gray-200">
                  <List size={20} className="opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Count Info */}
            <Skeleton variant="text" width={180} height={20} />

            {/* Grid cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-3"
                >
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="text" width="70%" height={28} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="rounded" width={120} height={32} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Skeleton variant="rounded" width={300} height={40} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
