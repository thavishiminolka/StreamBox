import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import moviesReducer, { toggleFavorite } from "./moviesSlice";

// Create listener middleware and configure it before store creation
const favoritesListener = createListenerMiddleware();

// Start listening for the toggleFavorite action
favoritesListener.startListening({
  actionCreator: toggleFavorite,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as { movies: { favorites: number[] } };
    try {
      console.log("Saving favorites:", state.movies.favorites);
      await AsyncStorage.setItem(
        "FAVORITES_V1",
        JSON.stringify(state.movies.favorites)
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  },
});

export const store = configureStore({
  reducer: { movies: moviesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
      favoritesListener.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
