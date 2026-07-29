import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: "",
  drafts: [],
  editingId: null,
};

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },

    saveDraft: (state, action) => {
      if (state.currentPost.trim() === "") return;

      const draft = {
        id: Date.now(),
        platform: action.payload.platform,
        content: state.currentPost,
        favorite: false,
        createdAt: new Date().toLocaleString(),
      };

      state.drafts.unshift(draft);

      state.currentPost = "";
    },

    deleteDraft: (state, action) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload
      );
    },

    editDraft: (state, action) => {
      const draft = state.drafts.find(
        (d) => d.id === action.payload
      );

      if (draft) {
        state.currentPost = draft.content;
        state.editingId = draft.id;
      }
    },

    updateDraft: (state, action) => {
      const draft = state.drafts.find(
        (d) => d.id === state.editingId
      );

      if (draft) {
        draft.content = state.currentPost;
        draft.platform = action.payload.platform;
        draft.createdAt = new Date().toLocaleString();
      }

      state.currentPost = "";
      state.editingId = null;
    },

    toggleFavorite: (state, action) => {
      const draft = state.drafts.find(
        (d) => d.id === action.payload
      );

      if (draft) draft.favorite = !draft.favorite;
    },
  },
});

export const {
  setCurrentPost,
  saveDraft,
  deleteDraft,
  editDraft,
  updateDraft,
  toggleFavorite,
} = postSlice.actions;

export default postSlice.reducer;