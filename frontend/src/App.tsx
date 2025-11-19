
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms"
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rooms />} />
         <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
