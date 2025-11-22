import MovieCard from "@/components/MovieCard";
import { COLORS } from "@/constants/theme";
import { credentialsPresent, getTrendingMovies } from "@/lib/tmdb";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectMovie,
  setError,
  setStatus,
  setTrending,
} from "@/store/moviesSlice";
import { homeStyles } from "@/styles/home.styles";
import type { MovieItem } from "@/types/movies";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const HomeScreen = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const movies = useAppSelector((s) => s.movies.trending);
  const loading = useAppSelector((s) => s.movies.status === "loading");
  const error = useAppSelector((s) => s.movies.error);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchMovies = useCallback(async () => {
    dispatch(setStatus("loading"));
    dispatch(setError(undefined));
    try {
      if (!credentialsPresent()) {
        throw new Error(
          "TMDb credentials missing. Set EXPO_PUBLIC_TMDB_READ_TOKEN or EXPO_PUBLIC_TMDB_API_KEY"
        );
      }
      const results = await getTrendingMovies();
      dispatch(setTrending(results));
      dispatch(setStatus("idle"));
    } catch (e: any) {
      dispatch(setError(e.message || "Failed to load movies"));
      dispatch(setStatus("error"));
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleSelect = (item: MovieItem) => {
    dispatch(selectMovie(item.id));
    router.push({ pathname: "/details/[id]", params: { id: String(item.id) } });
  };

  const renderItem = ({ item }: { item: MovieItem }) => (
    <MovieCard item={item} onPress={handleSelect} />
  );

  const deriveNameFromEmail = (email?: string | null) => {
    if (!email) return undefined;
    const local = email.split("@")[0];
    if (!local) return undefined;
    const parts = local.split(/[._-]+/).filter(Boolean);
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    if (!parts.length) return cap(local);
    return parts.map(cap).join(" ");
  };

  const displayName =
    user?.firstName ||
    user?.username ||
    deriveNameFromEmail(user?.primaryEmailAddress?.emailAddress) ||
    "Guest";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View style={homeStyles.headerRow}>
          <View>
            <Text style={homeStyles.greeting}>Hi {displayName}!</Text>
            <Text style={homeStyles.subGreeting}>Welcome to StreamBox</Text>
          </View>
          <View style={homeStyles.avatar}>
            <Text style={homeStyles.avatarText}>{avatarInitial}</Text>
          </View>
        </View>
      </View>

      {loading && movies.length === 0 && (
        <Text style={homeStyles.loadingText}>Loading movies...</Text>
      )}
      {error && movies.length === 0 && (
        <Text style={homeStyles.errorText}>{error}</Text>
      )}
      {!loading && !error && movies.length === 0 && (
        <Text style={homeStyles.emptyText}>No movies found.</Text>
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={homeStyles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
