import { homeStyles } from "@/styles/home.styles";
import type { MovieItem } from "@/types/movies";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: MovieItem;
  onPress?: (item: MovieItem) => void;
}

const getStatus = (item: MovieItem): { label: string; style: any } => {
  const today = new Date();
  const release = item.release_date ? new Date(item.release_date) : null;
  if (release && release > today)
    return { label: "Upcoming", style: homeStyles.statusUpcoming };
  if ((item.vote_count || 0) > 1000)
    return { label: "Popular", style: homeStyles.statusPopular };
  return { label: "Active", style: homeStyles.statusActive };
};

const MovieCard: React.FC<Props> = ({ item, onPress }) => {
  const status = getStatus(item);
  const overview = item.overview
    ? item.overview.slice(0, 120) + (item.overview.length > 120 ? "…" : "")
    : "No overview available.";
  const imageUri = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : undefined;

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
          <Text style={{ color: "#666", fontSize: 10 }}>No Image</Text>
        </View>
      )}
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
