import { useAdminBookings, useCancelBooking, useAnalytics } from "../hooks/useAdmin";

export default function AdminDashboard() {
  const { data: bookings, isLoading: loadingBookings } = useAdminBookings();
  const { data: analytics, isLoading: loadingAnalytics } = useAnalytics();
  const cancelMutation = useCancelBooking();

  if (loadingBookings || loadingAnalytics) return <p>Loading...</p>;

  return (
    <div className="p-8 space-y-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* BOOKINGS TABLE */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Bookings List</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Room</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">End</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.bookings.map((b: any) => (
              <tr key={b.id} className="border">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.roomName}</td>
                <td className="border p-2">{new Date(b.start).toLocaleString()}</td>
                <td className="border p-2">{new Date(b.end).toLocaleString()}</td>
                <td className="border p-2">₹{b.price}</td>
                <td className="border p-2">
                  <button
                    onClick={() => cancelMutation.mutate(b.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ANALYTICS TABLE */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Total Bookings</th>
              <th className="border p-2">Total Revenue</th>
              <th className="border p-2">Peak Hours Usage</th>
              <th className="border p-2">Most Booked Room</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2">{analytics.totalBookings}</td>
              <td className="border p-2">₹{analytics.totalRevenue}</td>
              <td className="border p-2">{analytics.peakUsage} minutes</td>
              <td className="border p-2">{analytics.topRoom}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
