import React from "react";

function CharacterCounter({ count, limit }) {

  const percentage = Math.min((count / limit) * 100, 100);

  let color = "green";

  if (count >= limit * 0.8 && count <= limit) {
    color = "orange";
  }

  if (count > limit) {
    color = "red";
  }

  return (
    <div className="counter">

      <p
        style={{
          color: color,
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        Characters: {count} / {limit}
      </p>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        ></div>
      </div>

      {count > limit && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            color: "#b00020",
            border: "1px solid red",
            borderRadius: "5px",
            fontWeight: "bold"
          }}
        >
          ⚠ Warning: Character limit exceeded! Please reduce your content before publishing.
        </div>
      )}

    </div>
  );
}

export default CharacterCounter;