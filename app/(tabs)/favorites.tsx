import MovieCard from "@/components/MovieCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/moviesSlice";
import { homeStyles } from "@/styles/home.styles";
import type { MovieItem } from "@/types/movies";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const favorites = useAppSelector((s) => s.movies.favorites);
  const movies = useAppSelector((s) =>
    s.movies.trending.filter((m: MovieItem) => favorites.includes(m.id))
  );

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
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Favorites ({favorites.length})
      </Text>
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
