import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Typography,
  Box,
  CircularProgress,
  Grow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import createCollegeQueryOptions from "@hooks/createCollegeQueryOptions";
import API from "@api/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";

export default function MergeCourseDialog({
  open,
  onClose,
  course,
  courseCollege,
}) {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [existingMerges, setExistingMerges] = useState([]);

  const { college_id } = useParams();

  const { data: colleges, isLoading } = useQuery(createCollegeQueryOptions());

  console.log(existingMerges);

  const collegeFiltered = colleges?.filter((c) => {
    const alreadyMerged = existingMerges.some(
      (m) => m.merge_college == c.college_code
    );

    // Exclude current college and already merged ones
    return c.college_id != college_id && !alreadyMerged;
  });

  console.log(collegeFiltered);

  const collegeOptions = collegeFiltered?.map((c) => ({
    value: c.college_code,
    label: `${c.college_name} ${c.college_major}`,
  }));

  const CourseId = course?.course_id;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log(courseCollege);
    if (open) {
      // Replace this with GET /api/merge-courses/:course_id in production
      const loadData = async () => {
        try {
          const { data } = await API.get(
            `${API_URL}/api/courses/merged/${CourseId}`
          );
          console.log(data);
          // console.log(data);
          setExistingMerges(data);
        } catch (err) {
          console.error(err.message);
        }
      };

      loadData();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = selectedColleges?.map((setCollege) => ({
      merge_college: setCollege.value,
      course_origin: CourseId,
    }));

    try {
      const { data } = await API.post(`${API_URL}/api/courses/merge`, payload);
      alert("Courses merged successfully!");

      existingMerges.push(payload);

      setSelectedColleges([]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error merging courses!");
    }
  };

  const handleClearMerge = async () => {
    try {
      const { data } = await API.delete(
        `${API_URL}/api/courses/merge/${CourseId}`
      );
      // console.log(data);
      // console.log(data);
      // setExistingMerges(data);

      alert("Clear successful");
      setExistingMerges([]);
      setSelectedColleges([]);
    } catch (err) {
      alert("Clear Failed");
      console.error(err.message);
    }
  };

  if (!course) return null;

  return (
    <Dialog
      TransitionComponent={Grow}
      open={open}
      onClose={() => {
        onClose();
        setSelectedColleges([]);
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Merge Course — {course?.course_name || "Untitled Course"}
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Existing merges */}
            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Currently merged with:
              </Typography>

              {existingMerges?.length > 0 ? (
                <Box className="relative mt-2 flex flex-wrap bg-gray-100 border-2 border-gray-200 rounded-md px-4 py-2 gap-1">
                  {existingMerges.map((m, index) => (
                    <Chip key={index} label={m.merge_college} color="info" />
                  ))}
                  <button
                    onClick={handleClearMerge}
                    className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <DeleteIcon color="error" />
                  </button>
                </Box>
              ) : (
                <Typography variant="body2" color="text.disabled" mt={1}>
                  No merged colleges yet.
                </Typography>
              )}
            </Box>

            {/* Select for adding merge colleges */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Add merge colleges
              </Typography>
              <Select
                isMulti
                options={collegeOptions}
                value={selectedColleges}
                onChange={setSelectedColleges}
                placeholder="Select colleges..."
                menuPortalTarget={document.body} // 👈 this is essential
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (base) => ({ ...base, zIndex: 9999 }), // double-safe fallback
                }}
              />
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#800000", fontWeight: 600 }}
        >
          Merge
        </Button>
      </DialogActions>
    </Dialog>
  );
}
