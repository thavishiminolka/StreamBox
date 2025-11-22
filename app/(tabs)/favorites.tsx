import MovieCard from "@/components/MovieCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/moviesSlice";
import { homeStyles } from "@/styles/home.styles";
import type { MovieItem } from "@/types/movies";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const favorites = useAppSelector((s) => s.movies.favorites);
  const movies = useAppSelector((s) =>
    s.movies.trending.filter((m: MovieItem) => favorites.includes(m.id))
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

  const goToDetails = (id: number) =>
    router.push({ pathname: "/details/[id]", params: { id: String(id) } });

  if (favorites.length === 0) {
    return (
      <View
        style={[
          homeStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 12,
          }}
        >
          Favorites
        </Text>
        <Text
          style={{
            color: "#888",
            textAlign: "center",
            maxWidth: 260,
            lineHeight: 18,
          }}
        >
          You haven&apos;t added any favorites yet. Tap the heart icon on a
          movie card to save it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.headerRow}>
        <View>
          <Text style={homeStyles.greeting}>Favorites</Text>
        </View>
        <TouchableOpacity
          style={homeStyles.avatar}
          onPress={() => router.push("/(tabs)/profile")}
          activeOpacity={0.7}
        >
          <Text style={homeStyles.avatarText}>{avatarInitial}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(m) => m.id.toString()}
        renderItem={({ item }) => (
          <View style={{ position: "relative" }}>
            <MovieCard item={item} onPress={() => goToDetails(item.id)} />
            <TouchableOpacity
              onPress={() => dispatch(toggleFavorite(item.id))}
              style={{
                position: "absolute",
                bottom: 30,
                right: 10,
                backgroundColor: "#EF4444",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 0.5,
                }}
              >
                Remove From Favorites
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={homeStyles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
