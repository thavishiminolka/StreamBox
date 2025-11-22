import type { MovieItem } from "@/types/movies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const FAVORITES_KEY = "FAVORITES_V1";

export const loadFavorites = createAsyncThunk(
  "movies/loadFavorites",
  async () => {
    try {
      console.log("Loading favorites from AsyncStorage");
      const raw = await AsyncStorage.getItem(FAVORITES_KEY);
      console.log("Raw favorites data:", raw);
      if (!raw) return [] as number[];
      const parsed = JSON.parse(raw);
      const favorites = Array.isArray(parsed)
        ? parsed.filter((v) => typeof v === "number")
        : [];
      console.log("Loaded favorites:", favorites);
      return favorites;
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [] as number[];
    }
  }
);

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
    setTrending(state: MoviesState, action: PayloadAction<MovieItem[]>) {
      state.trending = action.payload;
    },
    setStatus(
      state: MoviesState,
      action: PayloadAction<MoviesState["status"]>
    ) {
      state.status = action.payload;
    },
    setError(state: MoviesState, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    selectMovie(state: MoviesState, action: PayloadAction<number | undefined>) {
      state.selectedId = action.payload;
    },
    toggleFavorite(state: MoviesState, action: PayloadAction<number>) {
      const id = action.payload;
      console.log("Toggling favorite for movie ID:", id);
      console.log("Current favorites:", state.favorites);
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f: number) => f !== id);
        console.log("Removed from favorites, new list:", state.favorites);
      } else {
        state.favorites.push(id);
        console.log("Added to favorites, new list:", state.favorites);
      }
    },
    upsertMovie(state: MoviesState, action: PayloadAction<MovieItem>) {
      const existingIndex = state.trending.findIndex(
        (m: MovieItem) => m.id === action.payload.id
      );
      if (existingIndex >= 0) state.trending[existingIndex] = action.payload;
      else state.trending.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadFavorites.fulfilled,
      (state: MoviesState, action: PayloadAction<number[]>) => {
        state.favorites = action.payload;
      }
    );
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
