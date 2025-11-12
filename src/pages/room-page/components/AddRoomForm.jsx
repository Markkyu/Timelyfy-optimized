import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Typography,
  Grow,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastNotification from "@components/ToastNotification";
import { addRoom } from "@api/roomsAPI";
import { allRoomsQuery } from "@hooks/createRoomQueryOptions";

export default function AddRoomForm({ open, onClose }) {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState("error");

  const roomRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: addRoom,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: allRoomsQuery().queryKey,
      });

      setRoomName("");
      onClose();

      setToastMessage("Room Successfully Added!");
      setToastType("success");
      setToastTrigger((prev) => prev + 1);
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ room_name: roomName });
  };

  // focus input when dialog opens
  useEffect(() => {
    if (roomRef.current) {
      roomRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        keepMounted
        onClose={() => {
          onClose();
          setRoomName("");
          setError(null);
        }}
        fullWidth
        maxWidth="xs"
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>
          <Typography
            variant="h5"
            component="div"
            fontWeight={600}
            align="center"
          >
            Add Room
          </Typography>
        </DialogTitle>

        {error && <Alert severity="error">{error}</Alert>}

        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-2 mt-2">
            <TextField
              label="Room Name"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
                setError(null);
              }}
              fullWidth
              required
              placeholder="ex. WLE 103"
              inputRef={roomRef}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                bgcolor: "maroon",
                mt: 2,
                fontWeight: 600,
                py: 1.5,
              }}
            >
              Add Room
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ToastNotification
        message={toastMessage}
        trigger={toastTrigger}
        type={toastType}
      />
    </>
  );
}
