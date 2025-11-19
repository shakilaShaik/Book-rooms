import { useState } from "react";
import {
  useAdminBookings,
  useCancelBooking,
  useAnalytics,
} from "../hooks/useAdmin";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data: bookingsData, isLoading: loadingBookings } = useAdminBookings();
  const cancelMutation = useCancelBooking();

  const {
    data: analytics,
    isLoading: loadingAnalytics,
    refetch: refetchAnalytics,
  } = useAnalytics(from, to);

  const cancelBooking = (id: string) => {
    cancelMutation.mutate(id, {
      onSuccess: () => toast.success("Booking cancelled"),
      onError: () => toast.error("Failed to cancel booking"),
    });
  };

  const handleShowAnalytics = () => {
    if (!from || !to)
      return toast.error("Please select both From and To dates");
    refetchAnalytics();
  };

  if (loadingBookings) return <p>Loading bookings...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded">
        Back to Rooms
      </button>

      {/* BOOKINGS TABLE */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Bookings List</h2>
        {bookingsData?.totalBookings?.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Room</th>
                <th className="border p-2">Start</th>
                <th className="border p-2">End</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.totalBookings.map((b: any) => (
                <tr key={b.id} className="border">
                  <td className="border p-2">{b.userName}</td>
                  <td className="border p-2">{b.roomName}</td>
                  <td className="border p-2">
                    {new Date(b.startTime).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {new Date(b.endTime).toLocaleString()}
                  </td>
                  <td className="border p-2">₹{b.totalPrice}</td>
                  <td className="border p-2">{b.status}</td>
                  <td className="border p-2">
                    {b.status === "CONFIRMED" && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ANALYTICS */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Analytics</h2>

        <div className="flex items-center gap-4 mb-4">
          <div>
            <label>From: </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
          <div>
            <label>To: </label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
          <button
            onClick={handleShowAnalytics}
            className="px-4 py-2 bg-green-600 text-white rounded">
            Show Analytics
          </button>
        </div>

        {loadingAnalytics ? (
          <p>Loading analytics...</p>
        ) : !analytics || analytics.length === 0 ? (
          <p>No analytics data for selected range.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Room</th>
                <th className="border p-2">Total Hours</th>
                <th className="border p-2">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((a: any) => (
                <tr key={a.roomId} className="border">
                  <td className="border p-2">{a.roomName}</td>
                  <td className="border p-2">{a.totalHours}</td>
                  <td className="border p-2">₹{a.totalRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
