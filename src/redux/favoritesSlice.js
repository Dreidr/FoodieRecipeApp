import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

// stable key helper (works for API + custom)
const keyOf = (r) => r?.recipeId || r?.idFood || r?.id || r?.title;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const incoming = action.payload;
      const k = keyOf(incoming);
      const ix = state.favoriterecipes.findIndex((f) => keyOf(f) === k);

      if (ix >= 0) {
        // remove
        state.favoriterecipes.splice(ix, 1);
      } else {
        // add
        state.favoriterecipes.push(incoming);
      }
    },
  },

    // ... other reducers like addFavorite, toggleFavorite ...
    removeFavoriteByKey(state, action) {
      const key = action.payload;
      state.favoriterecipes = state.favoriterecipes.filter((r, idx) => {
        const rKey = (r?.recipeId || r?.idFood || r?.id || r?.title || idx).toString();
        return rKey !== key;
      });
    },
  
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
