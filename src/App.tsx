import { Navigate, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import RepairPage from "./pages/RepairPage";
import MuseumPage from "./pages/MuseumPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/create" replace />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/repair/:id" element={<RepairPage />} />
      <Route path="/museum" element={<MuseumPage />} />
      <Route path="*" element={<Navigate to="/create" replace />} />
    </Routes>
  );
}