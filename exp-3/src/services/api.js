const API_URL = "http://localhost:5000/api";

// Login user
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// Get all posts
export const getPosts = async (token) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch posts");
  }

  return data;
};

// Create post
export const createPost = async (token, postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create post");
  }

  return data;
};

// Update post
export const updatePost = async (token, postId, postData) => {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update post");
  }

  return data;
};

// Delete post
export const deletePost = async (token, postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete post");
  }

  return data;
};