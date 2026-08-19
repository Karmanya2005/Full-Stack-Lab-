import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPosts, updatePost } from "../services/api";

const EditPost = () => {
  const { user, token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPosts(token);

        const post = data.posts.find(
          (post) => String(post.id) === String(id)
        );

        if (!post) {
          setError("Post not found.");
          return;
        }

        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [token, id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setSaving(true);

      await updatePost(token, id, {
        title,
        content
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading post...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2>Unable to Edit Post</h2>

        <p style={styles.errorText}>{error}</p>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.button}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

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
          <h1>Edit Post</h1>

          <p style={styles.subtitle}>
            Editing as:{" "}
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
              disabled={saving}
              style={styles.saveButton}
            >
              {saving ? "Saving..." : "Save Changes"}
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

  saveButton: {
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

  button: {
    padding: "10px 18px",
    backgroundColor: "#2563eb",
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

  errorText: {
    color: "#b91c1c",
    marginBottom: "20px"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  }
};

export default EditPost;