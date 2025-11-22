import { homeStyles } from "@/styles/home.styles";
import React from "react";
import { Text, View } from "react-native";

export default function Favorites() {
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
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        Favorites
      </Text>
      <Text style={{ color: "#888", textAlign: "center", maxWidth: 260 }}>
        You haven't added any favorites yet. This section will list movies you
        mark.
      </Text>
    </View>
  );
}
