import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

// choose a stable unique key for each recipe
const keyOf = (r) => r?.recipeId || r?.idFood || r?.id;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const key = keyOf(recipe);
      if (!key) return;

      const idx = state.favoriterecipes.findIndex((r) => keyOf(r) === key);
      if (idx >= 0) {
        // already saved -> remove
        state.favoriterecipes.splice(idx, 1);
      } else {
        // not saved -> add
        state.favoriterecipes.unshift(recipe);
      }
    },
    clearFavorites: (state) => {
      state.favoriterecipes = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
