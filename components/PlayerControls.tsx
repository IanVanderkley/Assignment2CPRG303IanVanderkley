import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import IconButton from "./IconButton";

export default function PlayerControls() {
  const player = usePlayer();

  return (
    <View style={styles.controls}>
      <IconButton
        name="shuffle"
        label="Toggle shuffle"
        onPress={player.toggleShuffle}
        color={player.shuffle ? "#7dd3fc" : "#fff"}
      />
      <IconButton
        name="play-skip-back"
        label="Previous song"
        onPress={player.previous}
        size={31}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={player.playing ? "Pause" : "Play"}
        onPress={player.togglePlay}
        style={styles.play}
      >
        <Ionicons
          name={player.playing ? "pause" : "play"}
          size={42}
          color="#000"
        />
      </Pressable>
      <IconButton
        name="play-skip-forward"
        label="Next song"
        onPress={player.next}
        size={31}
      />
      <IconButton
        name="repeat"
        label="Toggle repeat"
        onPress={player.toggleRepeat}
        color={player.repeat ? "#7dd3fc" : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  play: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
