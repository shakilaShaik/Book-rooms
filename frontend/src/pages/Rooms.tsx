import { useRooms } from "../hooks/useRooms";
import BookingForm from "../components/BookingForm";
import { Link } from "react-router-dom";

export default function Rooms() {
  const { data, isLoading } = useRooms();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Workspace Booking</h1>

        <Link
          to="/admin"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Admin View
        </Link>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.meetingRooms.map((room: any) => (
            <div key={room.id} className="p-5 bg-gray-100 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">{room.name}</h2>
              <p className="text-gray-600 mb-4">Capacity: {room.capacity}</p>
              <p className="text-black-700 mb-4"> Price: {room.baseHourlyRate}</p>

              <BookingForm roomId={room.id} />
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-200 text-center p-3 text-sm text-gray-600">
        © {new Date().getFullYear()} Workspace Booking System
      </footer>

    </div>
  );
}
