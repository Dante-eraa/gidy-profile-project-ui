import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Profile from "./features/profile/Profile";
import CareerVision from "./features/careerVision/CareerVision";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import ProfilePage from "./features/profile/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Edit Profile */}
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Career Vision */}
      <Route
        path="/career-vision"
        element={
          <ProtectedRoute>
            <CareerVision />
          </ProtectedRoute>
        }
      />

      {/* Protected Layout Group */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile/:slug" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
