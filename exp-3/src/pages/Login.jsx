import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(username, password);

      // Save user information and JWT token
      login(data.user, data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1>Experiment 3</h1>

        <h2>Login</h2>

        <p style={styles.subtitle}>
          JWT Authentication & Role-Based Access Control
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.field}>
            <label style={styles.label}>Username</label>

            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>

            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {/* Error message */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo accounts */}
        <div style={styles.demoUsers}>
          <h3>Demo Accounts</h3>

          <p>
            <strong>Admin:</strong> admin / admin123
          </p>

          <p>
            <strong>Editor:</strong> editor / editor123
          </p>

          <p>
            <strong>Viewer:</strong> viewer / viewer123
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: "20px"
  },

  loginBox: {
    width: "400px",
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)"
  },

  subtitle: {
    color: "#666",
    marginBottom: "25px"
  },

  field: {
    marginBottom: "18px"
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    padding: "11px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box"
  },

  error: {
    color: "red",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },

  demoUsers: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    fontSize: "14px"
  }
};

export default Login;