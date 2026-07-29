import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDraft, toggleFavorite } from "../features/posts/postSlice";
import { selectFilteredPosts } from "../features/posts/postSelectors";

function DraftList() {
  const dispatch = useDispatch();

  // Memoized selector
  const drafts = useSelector(selectFilteredPosts);

  // useMemo example
  const totalDrafts = useMemo(() => {
    return drafts.length;
  }, [drafts]);

  return (
    <div>
      <h2>Saved Drafts ({totalDrafts})</h2>

      {drafts.length === 0 ? (
        <p>No drafts found.</p>
      ) : (
        drafts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff",
            }}
          >
            <h3>{post.platform}</h3>

            <p>{post.content}</p>

            <button
              onClick={() => dispatch(toggleFavorite(post.id))}
              style={{ marginRight: "10px" }}
            >
              {post.favorite ? "★ Favorite" : "☆ Favorite"}
            </button>

            <button onClick={() => dispatch(deleteDraft(post.id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(DraftList);