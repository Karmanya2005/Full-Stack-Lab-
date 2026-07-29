import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/ui/uiSlice";

function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.ui.filter);

  return (
    <select
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        fontSize: "16px",
      }}
    >
      <option value="All">All Platforms</option>
      <option value="Twitter">Twitter</option>
      <option value="Instagram">Instagram</option>
      <option value="Facebook">Facebook</option>
      <option value="LinkedIn">LinkedIn</option>
    </select>
  );
}

export default FilterBar;