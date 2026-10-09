import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Song } from "../types/music";
export default function SongRow({
  song,
  onPress,
}: {
  song: Song;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Play ${song.title}`}
      onPress={onPress}
      style={styles.row}
    >
      <Image source={song.artwork} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.sub}>{song.artist}</Text>
      </View>
      <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingVertical: 8,
  },
  image: { width: 56, height: 56, borderRadius: 4 },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  sub: { color: "#aaa", fontSize: 14, marginTop: 4 },
});
