import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/ui/uiSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.ui.search);

  return (
    <input
      type="text"
      placeholder="Search drafts..."
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      style={{
        width: "100%",
        padding: "10px",
        margin: "20px 0",
        fontSize: "16px",
      }}
    />
  );
}

export default SearchBar;