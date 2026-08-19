import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../services/api";

const CreatePost = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Only Admin and Editor can create posts
  if (user?.role !== "admin" && user?.role !== "editor") {
    return (
      <div style={styles.center}>
        <h2>Access Denied</h2>
        <p>You do not have permission to create posts.</p>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.button}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setLoading(true);

      await createPost(token, {
        title,
        content
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>

        <div style={styles.card}>
          <h1>Create New Post</h1>

          <p style={styles.subtitle}>
            Logged in as:{" "}
            <strong>{user?.name}</strong>{" "}
            ({user?.role})
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>
                Post Title
              </label>

              <input
                style={styles.input}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Content
              </label>

              <textarea
                style={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                rows="8"
              />
            </div>

            {error && (
              <div style={styles.error}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={styles.submitButton}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "30px 20px"
  },

  container: {
    maxWidth: "800px",
    margin: "0 auto"
  },

  card: {
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginTop: "20px"
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px"
  },

  field: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "8px"
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "15px"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "15px",
    resize: "vertical"
  },

  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },

  backButton: {
    padding: "10px 15px",
    backgroundColor: "#374151",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "15px"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    padding: "10px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default CreatePost;