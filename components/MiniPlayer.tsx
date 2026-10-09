import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { usePlayer } from "../context/PlayerContext";
import IconButton from "./IconButton";
export default function MiniPlayer() {
  const { song, playing, position, togglePlay } = usePlayer();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open Now Playing"
          onPress={() => router.push("/player")}
          style={styles.song}
        >
          <Image source={song.artwork} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {song.title}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {song.artist}
            </Text>
          </View>
        </Pressable>
        <View style={styles.cast}>
          <IconButton
            name="tv-outline"
            label="Open player"
            onPress={() => router.push("/player")}
          />
        </View>
        <IconButton
          name={playing ? "pause" : "play"}
          label={playing ? "Pause" : "Play"}
          onPress={togglePlay}
        />
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.progress,
            { width: `${(position / song.duration) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#212121" },
  row: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 4,
  },
  song: { flex: 1, flexDirection: "row", alignItems: "center", gap: 16 },
  image: { width: 48, height: 48, borderRadius: 2 },
  title: { fontSize: 14, fontWeight: "600", color: "#fff" },
  artist: { fontSize: 14, color: "#ccc", marginTop: 5 },
  cast: { marginHorizontal: 6 },
  track: { height: 1, backgroundColor: "#777" },
  progress: { height: 1, backgroundColor: "white" },
});
