import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grow,
} from "@mui/material";
import Select from "react-select";
import ToastNotification from "@components/ToastNotification";
import useColleges from "@hooks/useColleges"; // fetches all programs
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import API from "@api/axios";

export default function MergeCourseForm({
  open,
  onClose,
  courseCollege,
  course,
}) {
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(null);
  const [toastType, setToastType] = useState("error");

  const { data: colleges, isLoading } = useColleges();

  // console.log(colleges?.filter((c) => c.college_id != courseCollege));

  console.log(course);

  const queryClient = useQueryClient();

  const API_URL = import.meta.env.VITE_API_URL;

  // handle react select submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const program_ids = selectedPrograms.map((p) => p.value);

    console.log(program_ids);

    try {
      const { data } = await API.post(
        `${API_URL}/api/courses/merge`,
        selectedPrograms
      );

      setToastMessage("[TEST] Course Merged");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);

      setSelectedPrograms([]);
      onClose();
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }

    // queryClient.invalidateQueries(["assigned-colleges", userId]);
  };

  // handle clear assignment
  const handleClearAssign = async (e) => {
    e.preventDefault();

    // await axios.delete(
    //   `${import.meta.env.VITE_API_URL}/api/assign-colleges/${userId}`
    // );

    // queryClient.invalidateQueries(["assigned-colleges", userId]);
    setToastMessage("[TEST] Course Cleared");
    setToastType("error");
    setToastTrigger((prev) => prev + 1);

    setSelectedPrograms([]);
    onClose();
  };

  const filterThisCollege = colleges?.filter(
    (c) => c.college_id != courseCollege
  );

  // console.log(filterThisCollege);

  // console.log(
  //   colleges?.map((c) => {
  //     c: c.college_code;
  //   })
  // );

  const options =
    filterThisCollege?.map((c) => ({
      value: c.college_code,
      label: `${c.college_name} ${c.college_major}`,
    })) || [];

  // console.log(selectedPrograms);

  return (
    <>
      <Dialog
        TransitionComponent={Grow}
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle style={{ fontWeight: 600 }}>
          Merge Course to Colleges
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <ol className="mb-3 rounded-md w-full border-2 p-4 border-gray-200 bg-gray-50">
              {selectedPrograms?.map((p, i) => (
                <li key={i} className="px-2 py-1 font-semibold">
                  {i + 1}. {p.label}
                </li>
              ))}
            </ol>
            <Select
              isMulti
              options={options}
              isLoading={isLoading}
              onChange={(val) => setSelectedPrograms(val)}
              placeholder="Select college to merge to..."
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (base, state) => ({
                  ...base,
                  minHeight: "55px", // adjust overall height
                  padding: "4px 6px", // inner padding
                  borderRadius: "12px", // optional, make it match MUI look
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 8px", // padding inside the value area
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#f3e5e5", // light maroon tint
                  borderRadius: "8px",
                }),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                paddingY: 1,
                bgcolor: "maroon",
                fontWeight: 600,
                borderRadius: "12px",
              }}
              fullWidth
              onClick={handleSubmit}
            >
              Save Merges
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 1.5,
                paddingY: 1,
                bgcolor: "gray",
                fontWeight: 600,
                borderRadius: "12px",
              }}
              fullWidth
              onClick={handleClearAssign}
            >
              Clear Merges
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <ToastNotification
        message={toastMessage}
        type={toastType}
        trigger={toastTrigger}
      />
    </>
  );
}
