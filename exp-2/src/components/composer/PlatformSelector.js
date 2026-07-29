import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlatform } from "../../features/platform/platformSlice";

function PlatformSelector() {
  const dispatch = useDispatch();
  const selectedPlatform = useSelector(
    (state) => state.platform.selectedPlatform
  );

  const platforms = [
    "Twitter",
    "Facebook",
    "Instagram",
    "LinkedIn",
  ];

  return (
    <div style={{ marginBottom: "15px" }}>
      <select
        value={selectedPlatform}
        onChange={(e) => dispatch(changePlatform(e.target.value))}
      >
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlatformSelector;