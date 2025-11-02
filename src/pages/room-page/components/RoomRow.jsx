export default function RoomRow({ room }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{room.room_name}</td>
      <td className="px-4 py-2">{room.room_type}</td>
      <td className="px-4 py-2">{room.capacity}</td>
      <td className="px-4 py-2">
        <button className="text-blue-600 hover:underline mr-2">Edit</button>
        <button className="text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  );
}
