import { Skeleton } from "@mui/material";

export default function PhaseControlSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto p-8 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-md shadow-md border-t-6 border-red-800 p-8">
          <div className="text-center mb-4 space-y-3">
            <Skeleton
              variant="text"
              width={280}
              height={48}
              className="mx-auto"
            />
            <div className="flex items-center justify-center gap-4">
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton variant="text" width={140} height={32} />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-800">
            <div className="flex items-start gap-3">
              <Skeleton variant="circular" width={24} height={24} />
              <div className="w-full">
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width="100%" height={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase Progress Indicator Skeleton */}
            <div className="bg-white rounded-md shadow-md p-8 space-y-6 h-full">
              <Skeleton
                variant="text"
                width={180}
                height={28}
                className="mx-auto"
              />

              <div className="flex justify-between items-center gap-4 ">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <Skeleton
                        variant="circular"
                        width={80}
                        height={80}
                        className="mb-3"
                      />
                      <Skeleton variant="text" width={80} height={20} />
                      <Skeleton variant="rounded" width={60} height={18} />
                    </div>
                    {i < 3 && (
                      <div className="px-4">
                        <Skeleton variant="rectangular" width={32} height={4} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Skeleton variant="rounded" width="100%" height={12} />
                <div className="flex justify-between mt-2">
                  <Skeleton variant="text" width={120} height={16} />
                  <Skeleton variant="text" width={100} height={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md shadow-md p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={160} height={24} />
              </div>

              {/* Phase Info Sections */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border-l-4 border-gray-400 space-y-2 bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton variant="circular" width={20} height={20} />
                    <div className="flex-1">
                      <Skeleton variant="text" width={100} height={18} />
                      <Skeleton variant="text" width="90%" height={16} />
                      <Skeleton variant="text" width="70%" height={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semester Progress */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-md shadow-md p-6">
              <Skeleton
                variant="text"
                width={200}
                height={28}
                className="mb-6"
              />
              <div className="flex justify-between gap-3 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton variant="text" width={60} height={18} />
                  </div>
                ))}
              </div>
              <Skeleton
                variant="text"
                width={240}
                height={20}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="bg-white rounded shadow p-6 flex justify-end gap-4">
          <Skeleton variant="rounded" width={120} height={44} />
          <Skeleton variant="rounded" width={140} height={44} />
        </div>
      </div>
    </div>
  );
}
