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

export default function CollegePage() {
  const { college_id } = useParams();
  const navigate = useNavigate();

  const { data: college, isLoading, error } = useCollegeById(college_id);

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
        <ErrorContent
          errorTitle="Error"
          error="Failed to load college details"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <Container maxWidth="xl">
        {/* Back Button */}
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#7f1d1d",
            "&:hover": {
              backgroundColor: "rgba(127, 29, 29, 0.04)",
            },
          }}
        >
          Back to Dashboard
        </Button>

        {/* College Header */}
        <CollegeDetailsHeader college={college} />

        {/* Navigation Cards - Main Actions */}
        <NavigationCards collegeId={college_id} />
      </Container>
    </div>
  );
}
