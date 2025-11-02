import Pagination from "@mui/material/Pagination";

export default function RoomPagination({ page, setPage, totalPages }) {
  return (
    <div className="mt-4 flex justify-end">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, v) => setPage(v)}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
