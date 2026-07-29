import React from "react";

function DraftManager({ drafts, deleteDraft, editDraft }) {
  return (
    <div>

      <h2 className="saved-title">
        📂 Saved Drafts
      </h2>

      {drafts.length === 0 ? (
        <p style={{ marginTop: "15px" }}>
          No drafts available.
        </p>
      ) : (
        drafts.map((draft) => (
          <div
            className="draft-card"
            key={draft.id}
          >
            <h4>{draft.platform}</h4>

            <p>{draft.content}</p>

            <button
              className="edit-btn"
              onClick={() => editDraft(draft)}
            >
              ✏ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteDraft(draft.id)}
            >
              🗑 Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default DraftManager;