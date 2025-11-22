import { COLORS } from "@/constants/theme";
import { credentialsPresent, getTrendingMovies } from "@/lib/tmdb";
import { homeStyles } from "@/styles/home.styles";
import { useUser } from "@clerk/clerk-expo";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import MovieCard, { MovieItem } from "../components/MovieCard";

const HomeScreen = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!credentialsPresent()) {
        throw new Error(
          "TMDb credentials missing. Set EXPO_PUBLIC_TMDB_READ_TOKEN or EXPO_PUBLIC_TMDB_API_KEY"
        );
      }
      const results = await getTrendingMovies();
      setMovies(results);
    } catch (e: any) {
      setError(e.message || "Failed to load movies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const renderItem = ({ item }: { item: MovieItem }) => (
    <MovieCard item={item} />
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
            <Text style={homeStyles.greeting}>Hi {displayName}</Text>
            <Text style={homeStyles.subGreeting}>Trending Movies</Text>
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
