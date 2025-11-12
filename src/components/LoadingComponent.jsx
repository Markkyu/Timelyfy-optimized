import React from "react";
import { Card, CardContent, Divider, Skeleton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoadingComponent() {
  return (
    <section className="min-h-screen bg-gray-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Back Button Placeholder */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          disabled
          sx={{
            mb: 2,
            fontWeight: 600,
            border: 2,
            borderRadius: "12px",
            color: "#aaa",
            borderColor: "#ddd",
          }}
        >
          Back to Users
        </Button>

        {/* Main Content Skeleton */}
        <Card className="shadow-lg p-6" sx={{ borderRadius: "12px" }}>
          <CardContent className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Profile info */}
              <div className="flex flex-col space-y-3 w-full md:w-1/2">
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton variant="text" width="60%" height={28} />
                <Skeleton variant="text" width="40%" height={24} />
              </div>

              {/* Role & Action Buttons */}
              <div className="flex flex-col items-start space-y-2 w-full md:w-1/3">
                <Skeleton variant="rectangular" width="100%" height={36} />
                <Skeleton variant="rectangular" width="70%" height={36} />
              </div>
            </div>

            <Divider sx={{ my: 4 }} />

            {/* Assigned Colleges Section */}
            <div className="space-y-3">
              <Skeleton variant="text" width="40%" height={28} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={80}
                    sx={{ borderRadius: "12px" }}
                  />
                ))}
              </div>
            </div>

            <Divider sx={{ my: 4 }} />

            {/* Account Info Section */}
            <div className="space-y-3">
              <Skeleton variant="text" width="30%" height={28} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={60}
                    sx={{ borderRadius: "12px" }}
                  />
                ))}
              </div>
            </div>

            <Divider sx={{ my: 4 }} />

            {/* Danger Zone */}
            <div className="space-y-3">
              <Skeleton variant="text" width="30%" height={28} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                sx={{ borderRadius: "12px" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
