import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import IconButton from "./IconButton";
import LikeButton from "./LikeButton";

function formatCount(count: number) {
  if (count < 1000) {
    return String(count);
  }
  return `${Math.round(count / 100) / 10}K`;
}

export default function PlayerActions() {
  const player = usePlayer();
  const song = player.song;
  const initialLike = song.initiallyLiked ? 1 : 0;
  const currentLike = player.liked ? 1 : 0;
  // The screenshot count already includes songs that started out liked.
  const likeCount =
    song.likes === undefined
      ? undefined
      : song.likes + currentLike - initialLike;
  const likeLabel = likeCount === undefined ? undefined : formatCount(likeCount);
  const commentLabel =
    song.comments === undefined ? "Comments" : formatCount(song.comments);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.actions}
    >
      <View style={styles.pill}>
        <LikeButton
          liked={player.liked}
          onPress={() => player.toggleLike()}
          label={likeLabel}
        />
        <View style={styles.divider} />
        <IconButton
          name={player.disliked ? "thumbs-down" : "thumbs-down-outline"}
          label="Dislike"
          onPress={player.toggleDislike}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Lyrics"
        style={styles.pill}
        onPress={() =>
          Alert.alert("Lyrics", "Lyrics are not loaded in this local demo.")
        }
      >
        <Ionicons name="chatbox-outline" color="#fff" size={23} />
        <Text style={styles.pillText}>Lyrics</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Comments"
        style={styles.pill}
        onPress={() =>
          Alert.alert("Comments", "Comments are not loaded in this local demo.")
        }
      >
        <Ionicons name="chatbox-ellipses-outline" color="#fff" size={23} />
        <Text style={styles.pillText}>{commentLabel}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={player.saved ? "Unsave song" : "Save song"}
        accessibilityState={{ selected: player.saved }}
        style={styles.pill}
        onPress={() => player.toggleSave()}
      >
        <Ionicons
          name={player.saved ? "checkmark" : "list-outline"}
          color="#fff"
          size={23}
        />
        <Text style={styles.pillText}>{player.saved ? "Saved" : "Save"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: { gap: 8, paddingVertical: 8, marginTop: 18 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 30,
    backgroundColor: "#34352c",
  },
  pillText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  divider: { height: 23, width: 1, backgroundColor: "#666", marginLeft: -4 },
});
