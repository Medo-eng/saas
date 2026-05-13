import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPortal from './pages/AdminPortal';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-portal" element={<AdminPortal />} />
    </Routes>
  );
}
