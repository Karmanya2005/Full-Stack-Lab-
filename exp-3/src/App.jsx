import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Protected dashboard */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/create-post"
  element={
    <ProtectedRoute allowedRoles={["admin", "editor"]}>
      <CreatePost />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-post/:id"
  element={
    <ProtectedRoute allowedRoles={["admin", "editor"]}>
      <EditPost />
    </ProtectedRoute>
  }
/>
      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default App;