import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AdminDashboardLayout from './pages/Admin/AdminDashboardLayout.jsx';
import UserLoginPage from './pages/User/UserLoginPage.jsx';
import UserSignupPage from './pages/User/UserSignupPage.jsx';
import UserDashboardLayout from './pages/User/UserDashboardLayout.jsx';
import ClassesPage from './pages/Classes/ClassesPage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="admin/*" element={<AdminDashboardLayout />} />

        <Route path="auth/login" element={<UserLoginPage />} />
        <Route path="auth/signup" element={<UserSignupPage />} />
        <Route path="dashboard/*" element={<UserDashboardLayout />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

