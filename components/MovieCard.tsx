import { useTheme } from "@/contexts/ThemeContext";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/moviesSlice";
import type { MovieItem } from "@/types/movies";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: MovieItem;
  onPress?: (item: MovieItem) => void;
}

const MovieCard: React.FC<Props> = ({ item, onPress }) => {
  const { colors } = useTheme();
  const homeStyles = useDynamicStyles();

  const getStatus = (item: MovieItem): { label: string; style: any } => {
    const today = new Date();
    const release = item.release_date ? new Date(item.release_date) : null;
    if (release && release > today)
      return { label: "Upcoming", style: homeStyles.statusUpcoming };
    if ((item.vote_count || 0) > 1000)
      return { label: "Popular", style: homeStyles.statusPopular };
    return { label: "Active", style: homeStyles.statusActive };
  };

  const status = getStatus(item);
  const overview = item.overview
    ? item.overview.slice(0, 120) + (item.overview.length > 120 ? "…" : "")
    : "No overview available.";
  const imageUri = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : undefined;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.movies.favorites);
  const isFav = favorites.includes(item.id);

  return (
    <TouchableOpacity
      style={homeStyles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={homeStyles.poster} />
      ) : (
        <View
          style={[
            homeStyles.poster,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 10 }}>
            No Image
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          console.log("Heart button pressed for movie:", item.title);
          dispatch(toggleFavorite(item.id));
        }}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          padding: 8,
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 20,
          zIndex: 10,
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={20}
          color={isFav ? "#EF4444" : "#FFF"}
        />
      </TouchableOpacity>
      <View style={homeStyles.cardBody}>
        <View>
          <Text style={homeStyles.title}>{item.title}</Text>
          <Text style={homeStyles.overview}>{overview}</Text>
        </View>
        <View style={homeStyles.chipRow}>
          <View style={[homeStyles.chip, status.style]}>
            <Text style={homeStyles.chipText}>{status.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
