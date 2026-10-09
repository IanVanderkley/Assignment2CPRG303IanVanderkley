import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { artwork } from "../../data/music";
import { usePlayer } from "../../context/PlayerContext";
import Header from "../../components/Header";
import LikeButton from "../../components/LikeButton";
export default function SamplesScreen() {
  const player = usePlayer();
  const liked = player.isSongLiked("pretty");
  const saved = player.isSongSaved("pretty");
  // Open the same player used by the Home page.
  function play() {
    player.selectSong("pretty");
    router.push("/player");
  }
  return (
    <ImageBackground
      source={artwork.sample}
      style={styles.screen}
      imageStyle={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <Header minimal />
        <View style={styles.actions}>
          <View style={styles.action}>
            <View style={styles.circle}>
              <LikeButton
                liked={liked}
                onPress={() => player.toggleLike("pretty")}
              />
            </View>
            <Text style={styles.label}>{liked ? "2.8K + 1" : "2.8K"}</Text>
          </View>
          <SampleAction
            icon="chatbox-ellipses-outline"
            label="88"
            onPress={() =>
              Alert.alert(
                "Comments",
                "Comments are not loaded in this local demo.",
              )
            }
          />
          <SampleAction
            icon={saved ? "checkmark" : "list-outline"}
            label={saved ? "Saved" : "Save"}
            onPress={() => player.toggleSave("pretty")}
          />
          <SampleAction
            icon="play-circle-outline"
            label="Shorts"
            onPress={() =>
              Alert.alert(
                "Shorts",
                "This sample uses the static image allowed by the assignment.",
              )
            }
          />
          <SampleAction
            icon="arrow-redo-outline"
            label="999"
            onPress={() => {
              void Share.share({
                message: "Pretty Privilege — Hudson Westbrook",
              });
            }}
          />
          <SampleAction icon="play-outline" label="Play" onPress={play} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play Pretty Privilege"
          onPress={play}
          style={styles.song}
        >
          <Image source={artwork.pretty} style={styles.cover} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Pretty Privilege</Text>
            <Text style={styles.artist}>Hudson Westbrook</Text>
          </View>
          <View style={styles.more}>
            <Ionicons name="ellipsis-horizontal" size={25} color="#fff" />
          </View>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}
function SampleAction({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.action}
    >
      <View style={styles.circle}>
        <Ionicons name={icon} size={27} color="#fff" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#777" },
  actions: { position: "absolute", right: 8, bottom: 64, gap: 7 },
  action: { alignItems: "center", gap: 3 },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textShadowColor: "#333",
    textShadowRadius: 3,
  },
  song: {
    position: "absolute",
    bottom: 8,
    left: 16,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  more: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: { height: 48, width: 48, borderRadius: 4 },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  artist: { color: "#fff", fontSize: 15, marginTop: 2 },
});
