import React, { useState, useEffect } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import DraftManager from "./DraftManager";
import "../styles/composer.css";

function PostComposer() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const [drafts, setDrafts] = useState(() => {
    const savedDrafts = localStorage.getItem("drafts");
    return savedDrafts ? JSON.parse(savedDrafts) : [];
  });

  const [editId, setEditId] = useState(null);

  const limits = {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  // Save Draft
  const saveDraft = () => {
    if (post.trim() === "") {
      alert("Write something first!");
      return;
    }

    if (editId !== null) {
      const updatedDrafts = drafts.map((draft) =>
        draft.id === editId
          ? { ...draft, content: post, platform }
          : draft
      );

      setDrafts(updatedDrafts);
      setEditId(null);
    } else {
      const newDraft = {
        id: Date.now(),
        content: post,
        platform,
      };

      setDrafts([...drafts, newDraft]);
    }

    setPost("");
  };

  // Delete Draft
  const deleteDraft = (id) => {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  };

  // Edit Draft
  const editDraft = (draft) => {
    setPost(draft.content);
    setPlatform(draft.platform);
    setEditId(draft.id);
  };

  // Publish Validation
  const publishPost = () => {
    if (post.trim() === "") {
      alert("Please write a post before publishing.");
      return;
    }

    if (post.length > limits[platform]) {
      alert(
        `❌ Cannot Publish!\n\n` +
        `Platform : ${platform}\n` +
        `Allowed Characters : ${limits[platform]}\n` +
        `Current Characters : ${post.length}\n\n` +
        `Please reduce your content before publishing.`
      );
      return;
    }

    alert(`✅ Post Published Successfully on ${platform}!`);

    setPost("");
    setEditId(null);
  };

  return (
    <div>

      <h1 className="title">
        📝 Multi Platform Post Composer
      </h1>

      <p className="subtitle">
        Write once, post everywhere.
      </p>

      <div className="composer">

        <div className="label">
          Write your post
        </div>

        <textarea
          placeholder="Write your amazing post here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div className="platform">
          <PlatformSelector
            platform={platform}
            setPlatform={setPlatform}
          />
        </div>

        <CharacterCounter
          count={post.length}
          limit={limits[platform]}
        />

        <div className="button-group">

          <button
            className="save-btn"
            onClick={saveDraft}
          >
            💾 {editId ? "Update Draft" : "Save Draft"}
          </button>

          <button
            className="publish-btn"
            onClick={publishPost}
          >
            🚀 Publish
          </button>

        </div>

      </div>

      <DraftManager
        drafts={drafts}
        deleteDraft={deleteDraft}
        editDraft={editDraft}
      />

    </div>
  );
}

export default PostComposer;