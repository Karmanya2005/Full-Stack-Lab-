import React from "react";

function PlatformSelector({ platform, setPlatform }) {
  return (
    <div>
      <label className="label">
        Select Platform
      </label>

      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="Twitter">🐦 Twitter</option>
        <option value="Facebook">📘 Facebook</option>
        <option value="Instagram">📸 Instagram</option>
        <option value="LinkedIn">💼 LinkedIn</option>
      </select>
    </div>
  );
}

export default PlatformSelector;