import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPosts, deletePost } from "../services/api";

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts(token);

      setPosts(data.posts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [token]);

  // Delete post - Admin only
  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePost(token, postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Loading
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading posts...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Experiment 3</h1>

          <p style={styles.subtitle}>
            JWT Authentication & Role-Based Access Control
          </p>
        </div>

        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <strong>{user?.name}</strong>

            <span style={styles.role}>
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main style={styles.main}>

        {/* Welcome Section */}
        <section style={styles.welcomeSection}>
          <div>
            <h2 style={styles.welcomeTitle}>
              Welcome, {user?.name}
            </h2>

            <p style={styles.welcomeText}>
              You are logged in as{" "}
              <strong>{user?.role}</strong>.
            </p>
          </div>

          {/* CREATE POST - ADMIN + EDITOR ONLY */}
          {(user?.role === "admin" ||
            user?.role === "editor") && (
            <button
              onClick={() => navigate("/create-post")}
              style={styles.createButton}
            >
              + Create Post
            </button>
          )}
        </section>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* Posts Heading */}
        <h2 style={styles.postsHeading}>
          Posts ({posts.length})
        </h2>

        {/* No Posts */}
        {posts.length === 0 ? (
          <div style={styles.empty}>
            No posts available.
          </div>
        ) : (
          <div style={styles.postsGrid}>

            {posts.map((post) => (
              <article
                key={post.id}
                style={styles.postCard}
              >

                {/* Post Header */}
                <div style={styles.postHeader}>
                  <h3 style={styles.postTitle}>
                    {post.title}
                  </h3>

                  <span style={styles.postId}>
                    #{post.id}
                  </span>
                </div>

                {/* Post Content */}
                <p style={styles.content}>
                  {post.content}
                </p>

                {/* Author */}
                <p style={styles.author}>
                  Created by:{" "}
                  <strong>{post.authorName}</strong>
                </p>

                {/* ================= ACTION BUTTONS ================= */}
                <div style={styles.actions}>

                  {/* EDIT - ADMIN + EDITOR */}
                  {(user?.role === "admin" ||
                    user?.role === "editor") && (
                    <button
                      onClick={() =>
                        navigate(`/edit-post/${post.id}`)
                      }
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                  )}

                  {/* DELETE - ADMIN ONLY */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() =>
                        handleDelete(post.id)
                      }
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}

                </div>
              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};


/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8"
  },

  /* Header */
  header: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px"
  },

  title: {
    margin: 0,
    fontSize: "32px"
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#d1d5db"
  },

  /* User information */
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  role: {
    backgroundColor: "#2563eb",
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  logoutButton: {
    padding: "10px 16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  },

  /* Main */
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px"
  },

  /* Welcome */
  welcomeSection: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  welcomeTitle: {
    margin: 0,
    marginBottom: "10px"
  },

  welcomeText: {
    margin: 0,
    color: "#4b5563"
  },

  /* Create */
  createButton: {
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px"
  },

  /* Posts */
  postsHeading: {
    marginBottom: "20px"
  },

  postsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },

  postCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px"
  },

  postTitle: {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "21px"
  },

  postId: {
    color: "#6b7280",
    fontSize: "13px",
    whiteSpace: "nowrap"
  },

  content: {
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "20px"
  },

  author: {
    color: "#6b7280",
    fontSize: "14px"
  },

  /* Action buttons */
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "18px"
  },

  editButton: {
    padding: "9px 16px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  deleteButton: {
    padding: "9px 16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  /* Error */
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px"
  },

  /* Empty */
  empty: {
    backgroundColor: "white",
    padding: "30px",
    textAlign: "center",
    borderRadius: "10px"
  },

  /* Loading */
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Dashboard;