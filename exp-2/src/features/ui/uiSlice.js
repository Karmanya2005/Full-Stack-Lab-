import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  filter: "All",
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearch, setFilter } = uiSlice.actions;

export default uiSlice.reducer;