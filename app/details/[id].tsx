import { getMovieDetails } from "@/lib/tmdb";
import { useAppDispatch, useAppSelector } from "@/store";
import { upsertMovie } from "@/store/moviesSlice";
import { homeStyles } from "@/styles/home.styles";
import type { MovieItem } from "@/types/movies";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const dispatch = useAppDispatch();
  const cached = useAppSelector((s) =>
    s.movies.trending.find((m: MovieItem) => m.id === movieId)
  );
  const [movie, setMovie] = useState<MovieItem | undefined>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (movie) return; // already have
      try {
        setLoading(true);
        const detail = await getMovieDetails(movieId);
        if (!ignore) {
          setMovie(detail);
          dispatch(upsertMovie(detail));
        }
      } catch (e: any) {
        if (!ignore) setError(e.message || "Failed to load details");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [movieId, movie, dispatch]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text style={homeStyles.errorText}>{error}</Text>;
  if (!movie) return <Text style={homeStyles.emptyText}>Movie not found.</Text>;

  const imageUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#000", padding: 16 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 16,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
      )}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#fff",
          marginBottom: 12,
        }}
      >
        {movie.title}
      </Text>
      {movie.release_date && (
        <Text style={{ color: "#888", marginBottom: 8 }}>
          Release: {movie.release_date}
        </Text>
      )}
      <Text style={{ color: "#ccc", lineHeight: 20 }}>
        {movie.overview || "No overview available."}
      </Text>
    </ScrollView>
  );
}
