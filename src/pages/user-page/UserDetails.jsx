import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Custom hooks
import useAssignedColleges from "@hooks/useAssignedColleges";

// Global components
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import RenderWhenRole from "@components/RenderWhenRole";

// Local components
import UserProfileHeader from "./components/UserProfileHeader";
import RoleManagementActions from "./components/RoleManagementActions";
import AssignedCollegesSection from "./components/AssignedCollegesSection";
import DangerZoneSection from "./components/DangerZoneSection";
import AccountInfoCard from "./components/AccountInfoCard";
import createUserQueryOptionsById from "@hooks/createUserQueryOptionsById";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@api/usersAPI";
import ApprovePasswordRequest from "./components/ApprovePasswordRequest";
import LoadingComponent from "@components/LoadingComponent";

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    data: assignedColleges,
    isLoading: isLoadingColleges,
    error: collegesError,
  } = useAssignedColleges(userId);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Handlers
  const handleBack = () => {
    navigate("/user-page");
  };

  // Loading state
  if (isLoading) {
    return (
      // <div className="h-full flex flex-col justify-center items-center">
      //   <LoadingContent
      //     loadingTitle="Loading User Details"
      //     loadingDesc="Loading user details..."
      //   />
      // </div>
      <>
        <LoadingComponent />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <ErrorContent
          errorTitle="An Error has occurred"
          error="Failed to load user details"
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            mb: 2,
            fontWeight: 600,
            border: 2,
            borderRadius: "12px",
            color: "#6B0909",
          }}
        >
          Back to Users
        </Button>

        {/* Main Content Card */}
        <Card className="shadow-lg p-6" sx={{ borderRadius: "12px" }}>
          <CardContent className="p-6">
            {/* User Header Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <UserProfileHeader user={user} />

              {/* Action Buttons - Now handles its own logic */}
              <RoleManagementActions user={user} />
            </div>

            <Divider sx={{ my: 4 }} />

            {/* Assigned College Programs Section - Now handles its own dialog */}
            <AssignedCollegesSection
              assignedColleges={assignedColleges}
              isLoadingColleges={isLoadingColleges}
              collegesError={collegesError}
              userId={userId}
            />

            <Divider sx={{ my: 4 }} />

            {/* Additional Info Card */}
            <AccountInfoCard user={user} />

            <RenderWhenRole role={["admin"]}>
              {/* Danger Zone - Now handles its own dialog and deletion */}
              <ApprovePasswordRequest
                userId={userId}
                passwordRequestStatus={user.change_password}
              />
              <Divider sx={{ my: 2 }} />

              <DangerZoneSection user={user} />
            </RenderWhenRole>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
