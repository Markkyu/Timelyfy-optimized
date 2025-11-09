import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

// Hooks
import useCollegeById from "@hooks/useCollegeById";

// Components
import LoadingContent from "@components/LoadingContent";
import ErrorContent from "@components/ErrorContent";
import CollegeDetailsHeader from "./college-page-components/CollegeDetailsHeader";
import NavigationCards from "./college-page-components/NavigationCards";
import CollegeStatsGrid from "./college-page-components/CollegeStatsGrid";
import CollegeInfoPanel from "./college-page-components/CollegeInfoPanel";
import { useCollegeQueryById } from "@hooks/createCollegeQueryOptions";
import useAuthStore from "@stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export default function CollegePage() {
  const { college_id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const currUserRole = user.role;

  // const { data: college, isLoading, error } = useCollegeById(college_id);
  const {
    data: college,
    isLoading,
    error,
  } = useQuery(useCollegeQueryById(college_id));

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center">
        <LoadingContent
          loadingTitle="Loading College"
          loadingDesc="Loading college details..."
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorContent errorTitle="College Error" error={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 py-8">
      <Container maxWidth="xl">
        {/* Back Button */}
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          startIcon={<ArrowLeft size={18} />}
          sx={{
            mb: 2,
            borderRadius: "12px",
            fontWeight: 600,
            borderColor: "maroon",
            color: "maroon",
            borderWidth: 2,
          }}
        >
          back to home
        </Button>

        {/* College Header */}
        <CollegeDetailsHeader college={college} />

        {/* Navigation Cards - Main Actions */}
        <NavigationCards
          college={college}
          collegeId={college_id}
          currentUserRole={currUserRole}
        />
      </Container>
    </div>
  );
}
