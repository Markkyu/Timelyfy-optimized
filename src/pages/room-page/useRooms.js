import { useState, useEffect } from "react";

// ---- Fake Rooms Data ----
const fakeRooms = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  room_name: `Room ${i + 1}`,
  room_type:
    i % 3 === 0 ? "Lecture" : i % 3 === 1 ? "Laboratory" : "Computer Lab",
  capacity: Math.floor(Math.random() * 50) + 20,
}));

export default function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // items per page

  useEffect(() => {
    setLoading(true);

    // simulate server response delay
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedRooms = fakeRooms.slice(startIndex, endIndex);
      const total = fakeRooms.length;
      const totalPagesCalc = Math.ceil(total / limit);

      setRooms(paginatedRooms);
      setTotalPages(totalPagesCalc);
      setLoading(false);
    }, 500); // simulating API delay
  }, [page]);

  return { rooms, loading, page, setPage, totalPages };
}
