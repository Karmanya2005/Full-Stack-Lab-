import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlatform: "Twitter",

  limits: {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  },
};

const platformSlice = createSlice({
  name: "platform",

  initialState,

  reducers: {
    changePlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },
  },
});

export const { changePlatform } = platformSlice.actions;

export default platformSlice.reducer;