// Material Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function CourseSkeletonLoader() {
  return (
    <div className="w-full mb-2 p-2 flex justify-between items-center">
      {/* Left side (course info) */}
      <Box>
        <Skeleton variant="text" width={180} height={24} />
        <Skeleton variant="text" width={120} height={20} />
      </Box>

      {/* Right side (icons) */}
      <Stack direction="row" spacing={1}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Stack>
    </div>
  );
}
