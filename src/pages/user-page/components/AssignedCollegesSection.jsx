import { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import RenderWhenRole from "@components/RenderWhenRole";
import AssignCollegeForm from "../../user-assignment/components/AssignCollegeForm";

export default function AssignedCollegesSection({
  assignedColleges,
  isLoadingColleges,
  collegesError,
  userId,
}) {
  const [assignCollegeOpen, setAssignCollegeOpen] = useState(false);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SchoolIcon sx={{ color: "maroon" }} />
            <h2 className="text-xl font-semibold text-gray-800">
              Assigned College Programs
            </h2>
          </div>

          <RenderWhenRole role={["admin", "master_scheduler"]}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setAssignCollegeOpen(true)}
              sx={{
                borderColor: "maroon",
                color: "maroon",
                fontWeight: 600,
                borderRadius: "20px",
              }}
            >
              Manage Programs
            </Button>
          </RenderWhenRole>
        </div>

        {isLoadingColleges ? (
          <div className="text-center py-8 text-gray-500">
            Loading assigned colleges...
          </div>
        ) : collegesError ? (
          <div className="text-center py-8 text-red-500">
            Error loading colleges
          </div>
        ) : assignedColleges && assignedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assignedColleges.map((college) => (
              <div
                key={college.college_id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-red-800 transition-colors"
              >
                <h3 className="font-semibold text-gray-800">
                  {college.college_name}
                </h3>
                {college.college_code && (
                  <p className="text-sm text-gray-600 mt-1">
                    Code: {college.college_code}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            No college programs assigned yet
          </div>
        )}
      </div>

      {/* Assign College Form Dialog */}
      <AssignCollegeForm
        open={assignCollegeOpen}
        onClose={() => setAssignCollegeOpen(false)}
        userId={userId}
      />
    </>
  );
}
