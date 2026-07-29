import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost, saveDraft } from "../features/posts/postSlice";
import PlatformSelector from "./composer/PlatformSelector";
import CharacterCounter from "./composer/CharacterCounter";
import "../styles/compose.css";

function ComposePost() {
  const dispatch = useDispatch();

  const currentPost = useSelector((state) => state.posts.currentPost);
  const selectedPlatform = useSelector(
    (state) => state.platform.selectedPlatform
  );

  const limits = {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const handleSave = () => {
    if (currentPost.trim() === "") {
      alert("Please enter a post first!");
      return;
    }

    dispatch(
      saveDraft({
        platform: selectedPlatform,
      })
    );
  };

  return (
    <div className="compose-card">
      <h2>Compose Post</h2>

      <PlatformSelector />

      <textarea
        className="post-box"
        placeholder="Write your post..."
        value={currentPost}
        onChange={(e) => dispatch(setCurrentPost(e.target.value))}
      />

      <CharacterCounter
        count={currentPost.length}
        limit={limits[selectedPlatform]}
      />

      <button className="save-btn" onClick={handleSave}>
        Save Draft
      </button>
    </div>
  );
}

export default ComposePost;