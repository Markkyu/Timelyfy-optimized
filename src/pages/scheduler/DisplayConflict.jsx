import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { convertTime } from "./generateTimeSlots";

export default function DisplayConflict({
  attemptResolution,
  conflictDetails,
  onCancel,
}) {
  const deets = conflictDetails?.conflicts || [];

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          height: "70vh",
          borderRadius: 3,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          color: "white",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberIcon fontSize="medium" />
          </Box>
          <Typography variant="h6" component="div" fontWeight={700}>
            Scheduling Conflict Detected
          </Typography>
        </Box>
        <IconButton
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Cannot lock the currently plotted schedule. The following conflicts
            must be resolved before proceeding:
          </Typography>
        </Box>

        <Stack spacing={2}>
          {deets?.map((conflict, index) => {
            // Calculate number of conflict details to determine grid columns
            const conflictCount = conflict.conflicts?.length || 0;
            const hasMultipleConflicts = conflictCount > 1;

            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  bgcolor: "#fef2f2",
                  border: "2px solid #fecaca",
                  borderRadius: 2,
                  p: 2.5,
                  transition: "all 0.2s",
                }}
              >
                {/* Course and Time Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <ErrorOutlineIcon sx={{ color: "#dc2626", fontSize: 22 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#7f1d1d",
                      flex: 1,
                    }}
                  >
                    {conflict.slot_course}
                  </Typography>
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                    label={convertTime(conflict.slot_day, conflict.slot_time)}
                    size="small"
                    sx={{
                      bgcolor: "#fee2e2",
                      color: "#991b1b",
                      fontWeight: 600,
                      "& .MuiChip-icon": {
                        color: "#991b1b",
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ mb: 2, borderColor: "#fecaca" }} />

                {/* Conflict Type */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#991b1b",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Conflict Type
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#7f1d1d",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  >
                    {conflict.type}
                  </Typography>
                </Box>

                {/* Conflicts Grid - Adaptive Columns */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: hasMultipleConflicts
                      ? {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                          md:
                            conflictCount > 2
                              ? "repeat(3, 1fr)"
                              : "repeat(2, 1fr)",
                        }
                      : "1fr",
                    gap: 2,
                  }}
                >
                  {conflict.conflicts?.map((conflictItem, cIndex) => (
                    <Box
                      key={cIndex}
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1.5,
                        p: 2,
                        border: "1px solid #fecaca",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#991b1b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Conflict {cIndex + 1}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#7f1d1d",
                          fontWeight: 500,
                        }}
                      >
                        {conflictItem}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            );
          })}
        </Stack>

        {deets?.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No conflict details available.
            </Typography>
          </Paper>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          bgcolor: "#f9fafb",
          px: 3,
          py: 2,
          gap: 1.5,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            borderWidth: 2,
            px: 3,
            py: 1,
            color: "#6b7280",
            borderColor: "#d1d5db",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            py: 1,
            bgcolor: "#f59e0b",
          }}
          onClick={attemptResolution}
        >
          Attempt Resolution
        </Button>
      </DialogActions>
    </Dialog>
  );
}
