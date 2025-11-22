import type { MovieItem } from "@/types/movies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoviesState {
  trending: MovieItem[];
  favorites: number[]; // store movie ids
  selectedId?: number;
  status: "idle" | "loading" | "error";
  error?: string;
}

const initialState: MoviesState = {
  trending: [],
  favorites: [],
  status: "idle",
  error: undefined,
  selectedId: undefined,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTrending(state, action: PayloadAction<MovieItem[]>) {
      state.trending = action.payload;
    },
    setStatus(state, action: PayloadAction<MoviesState["status"]>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    selectMovie(state, action: PayloadAction<number | undefined>) {
      state.selectedId = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
    upsertMovie(state, action: PayloadAction<MovieItem>) {
      const existingIndex = state.trending.findIndex(
        (m: MovieItem) => m.id === action.payload.id
      );
      if (existingIndex >= 0) state.trending[existingIndex] = action.payload;
      else state.trending.push(action.payload);
    },
  },
});

export const {
  setTrending,
  setStatus,
  setError,
  selectMovie,
  toggleFavorite,
  upsertMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
