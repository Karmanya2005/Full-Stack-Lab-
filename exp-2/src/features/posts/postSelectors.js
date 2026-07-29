import { createSelector } from "@reduxjs/toolkit";

const selectDrafts = (state) => state.posts.drafts;
const selectSearch = (state) => state.ui.search;
const selectFilter = (state) => state.ui.filter;

// Memoized selector for filtered drafts
export const selectFilteredPosts = createSelector(
  [selectDrafts, selectSearch, selectFilter],
  (drafts, search, filter) => {
    return drafts.filter((post) => {
      const matchesSearch = post.content
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || post.platform === filter;

      return matchesSearch && matchesFilter;
    });
  }
);

// Total number of drafts
export const selectTotalDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);

// Total favorite posts
export const selectFavoritePosts = createSelector(
  [selectDrafts],
  (drafts) => drafts.filter((post) => post.favorite).length
);