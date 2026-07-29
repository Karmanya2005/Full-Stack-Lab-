import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/posts/postSlice";
import platformReducer from "../features/platform/platformSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    platform: platformReducer,
    ui: uiReducer,
  },
});