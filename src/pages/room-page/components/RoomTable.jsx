import RoomRow from "./RoomRow";

export default function RoomTable({ rooms }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-100 font-medium text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Room Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Capacity</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <RoomRow key={room.id} room={room} />
          ))}
        </tbody>
      </table>

      {rooms.length === 0 && (
        <div className="p-4 text-center text-gray-500">No rooms found.</div>
      )}
    </div>
  );
}
