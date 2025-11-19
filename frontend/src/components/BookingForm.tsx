import { useState } from "react";
import { useBookRoom } from "../hooks/useBookRoom";
import toast from "react-hot-toast";

export default function BookingForm({ roomId }: { roomId: string }) {
  const mutation = useBookRoom();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    start: "",
    end: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    mutation.mutate(
      { ...form, roomId },
      {
        onSuccess: () => toast.success("Room booked successfully!"),
        onError: (err: any) =>
          toast.error(err.response?.data?.msg || "Something went wrong")
      }
    );
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-4">
      <input name="userName" placeholder="Name" className="input" onChange={handleChange} />
      <input name="email" placeholder="Email" className="input" onChange={handleChange} />
      <input name="phone" placeholder="Phone" className="input" onChange={handleChange} />

      <label>Start Time</label>
      <input type="datetime-local" name="start" className="input" onChange={handleChange} />

      <label>End Time</label>
      <input type="datetime-local" name="end" className="input" onChange={handleChange} />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Book Room
      </button>
    </div>
  );
}
