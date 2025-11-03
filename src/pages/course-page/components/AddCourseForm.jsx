import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Slide,
  Typography,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAddCourse } from "@hooks/useCourses";
import useAuthStore from "@stores/useAuthStore";
import { addCourse } from "@api/coursesAPI";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import createCourseQueryOptions from "@hooks/createCourseQueryOptions";
import createCourseQueryById from "@hooks/createCourseQueryById";
import recentCourseQuery from "@hooks/recentCourseQuery";

export default function AddCourseForm({
  open,
  onClose,
  sem,
  college_id,
  year,
}) {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [hoursWeek, setHoursWeek] = useState(3);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthStore();

  // const addCourseMutation = useAddCourse();
  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (courseData) => addCourse(courseData),

    onSuccess: (data, newCourse) => {
      queryClient.setQueryData(["course", college_id], (old) => {
        console.log(old);
        console.log(newCourse);

        if (!old) return [newCourse];
        return [...old, newCourse];
      });

      setCourseCode("");
      setCourseName("");
      setHoursWeek(3);
      onClose();

      queryClient.invalidateQueries({
        queryKey: ["course", college_id],
      });
    },

    onError: (error) => {
      console.error(error.message);
      setError(error.message);
    },
  });

  const { data: currSubjects } = useQuery(recentCourseQuery());

  // console.log(currSubjects);

  // const { data: currSubjects } = useQuery(createCourseQueryOptions());
  const recentCourses = currSubjects?.reverse();

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      course_code: courseCode,
      course_name: courseName,
      hours_week: hoursWeek,
      course_year: year,
      course_college: college_id,
      semester: sem,
      created_by: user.id,
      assigned_teacher: null,
    };

    mutate(courseData);
  };

  const clearForm = () => {
    setCourseName("");
    setCourseCode("");
    setHoursWeek(0);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Grow}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle>
        <Typography
          variant="h5"
          component="span"
          align="center"
          display="block"
        >
          Add Subject
        </Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <div className="flex justify-center bg-red-100 rounded py-1 text-red-500 text-xl">
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem" }}>
          {/* LEFT: FORM */}
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <TextField
              label="Subject Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Subject Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Hours/ Week"
              value={hoursWeek}
              onChange={(e) => setHoursWeek(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ min: 0, max: 10 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                bgcolor: "maroon",
                marginTop: 1,
                fontWeight: 600,
                paddingY: 1.5,
              }}
            >
              Add Course
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={loading}
              fullWidth
              onClick={clearForm}
              sx={{
                bgcolor: "gray",
                marginTop: 1,
                fontWeight: 600,
                paddingY: 1.5,
              }}
            >
              Clear Form
            </Button>
          </form>

          {/* RIGHT: RECENTLY ADDED */}
          {recentCourses?.length > 0 && (
            <div
              style={{
                flexBasis: "40%",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                maxHeight: "350px",
                overflowY: "auto",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Recently Added
              </Typography>
              {recentCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-2 rounded border border-gray-400 mb-2 cursor-pointer"
                  onClick={() => {
                    setCourseCode(course.course_code);
                    setCourseName(course.course_name);
                    setHoursWeek(course.hours_week);
                  }}
                >
                  <p>
                    <strong>
                      {course.course_code}: {""}
                    </strong>
                    {course.course_name}
                  </p>
                  <p>{course.hours_week} hrs/week</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// <DialogContent>
//   {error && (
//     <div className="flex justify-center bg-red-100 rounded py-1 text-red-500 text-xl">
//       {error}
//     </div>
//   )}
//   <form onSubmit={handleSubmit}>
//     <TextField
//       label="Subject Code"
//       value={courseCode}
//       onChange={(e) => setCourseCode(e.target.value)}
//       fullWidth
//       margin="normal"
//       required
//     />

//     <TextField
//       label="Subject Name"
//       value={courseName}
//       onChange={(e) => setCourseName(e.target.value)}
//       fullWidth
//       margin="normal"
//       required
//     />

//     <TextField
//       label="Hours/ Week"
//       value={hoursWeek}
//       onChange={(e) => setHoursWeek(e.target.value)}
//       fullWidth
//       margin="normal"
//       type="number"
//       inputProps={{
//         min: 0,
//         max: 10,
//       }}
//       required
//     />

//     <Button
//       type="submit"
//       variant="contained"
//       loading={loading}
//       loadingPosition="end"
//       fullWidth
//       sx={{
//         bgcolor: "maroon",
//         marginTop: 1,
//         fontWeight: 600,
//         paddingY: 1.5,
//       }}
//     >
//       Add Course
//     </Button>
//   </form>
// </DialogContent>
