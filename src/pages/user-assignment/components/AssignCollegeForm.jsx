import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import Select from "react-select";
import useColleges from "@hooks/useColleges"; // fetches all programs
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function AssignCollegeForm({ open, onClose, userId }) {
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const { data: colleges, isLoading } = useColleges();

  const queryClient = useQueryClient();

  // handle react select submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const program_ids = selectedPrograms.map((p) => p.value);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/assign-colleges/${userId}`,
      { program_ids }
    );

    queryClient.invalidateQueries(["assigned-colleges", userId]);

    setSelectedPrograms([]);
    onClose();
  };

  // handle clear assignment
  const handleClearAssign = async (e) => {
    e.preventDefault();

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/assign-colleges/${userId}`
    );

    queryClient.invalidateQueries(["assigned-colleges", userId]);

    setSelectedPrograms([]);
    onClose();
  };

  const options =
    colleges?.map((c) => ({
      value: c.college_id,
      label: `${c.college_name} ${c.college_major}`,
    })) || [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Assign College Programs</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Select
            isMulti
            options={options}
            isLoading={isLoading}
            onChange={(val) => setSelectedPrograms(val)}
            placeholder="Select college programs..."
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, paddingY: 1.5, bgcolor: "maroon", fontWeight: 600 }}
            fullWidth
          >
            Save Assignments
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 1.5, paddingY: 1.5, bgcolor: "gray", fontWeight: 600 }}
            fullWidth
            onClick={handleClearAssign}
          >
            Clear Assignments
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
