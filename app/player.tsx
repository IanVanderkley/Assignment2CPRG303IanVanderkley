import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePlayer } from "../context/PlayerContext";
import IconButton from "../components/IconButton";
import PlayerActions from "../components/PlayerActions";
import PlayerControls from "../components/PlayerControls";
import ProgressBar from "../components/ProgressBar";
export default function PlayerScreen() {
  const player = usePlayer();
  const { width, height } = useWindowDimensions();
  const [video, setVideo] = useState(false);
  const cover = Math.min(width - 40, height * 0.43, 480);
  function close() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.top}>
          <IconButton
            name="chevron-down"
            label="Close Now Playing"
            onPress={close}
          />
          <View style={styles.mode}>
            <Pressable
              accessibilityLabel="Song view"
              onPress={() => setVideo(false)}
              style={[styles.segment, !video && styles.selected]}
            >
              <Ionicons
                name="headset-outline"
                color={video ? "#aaa" : "#fff"}
                size={22}
              />
            </Pressable>
            <Pressable
              accessibilityLabel="Video view"
              onPress={() => setVideo(true)}
              style={[styles.segment, video && styles.selected]}
            >
              <Ionicons
                name="play-circle-outline"
                color={video ? "#fff" : "#aaa"}
                size={22}
              />
            </Pressable>
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              name="tv-outline"
              label="Cast information"
              onPress={() =>
                Alert.alert(
                  "Cast",
                  "Casting is not connected in this visual player.",
                )
              }
            />
            <IconButton
              name="ellipsis-vertical"
              label="Player options"
              onPress={() =>
                Alert.alert(
                  "Player options",
                  "Use Save, Shuffle and Repeat below.",
                )
              }
            />
          </View>
        </View>
        <View style={[styles.artWrap, { marginTop: height * 0.035 }]}>
          <Image
            source={player.song.artwork}
            style={{ width: cover, height: cover, borderRadius: 12 }}
          />
          {video ? (
            <View style={styles.videoLabel}>
              <Text style={{ color: "#fff" }}>Static video preview</Text>
            </View>
          ) : null}
        </View>
        <View style={{ marginTop: height * 0.048 }}>
          <Text numberOfLines={2} style={styles.title}>
            {player.song.title}{" "}
            <Ionicons name="chevron-forward" size={23} color="#aaa" />
          </Text>
          <Text style={styles.artist}>{player.song.artist}</Text>
        </View>
        <PlayerActions />
        <View style={{ marginTop: 12 }}>
          <ProgressBar
            position={player.position}
            duration={player.song.duration}
            onSeek={player.seek}
          />
        </View>
        <PlayerControls />
        <View style={styles.queue}>
          <View style={styles.handle} />
          <Text style={styles.queueText}>
            {player.saved ? "Saved Music" : "Liked Music"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1c1d14" },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  top: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -12,
  },
  mode: {
    flexDirection: "row",
    backgroundColor: "#24251b",
    borderRadius: 30,
    padding: 3,
  },
  segment: {
    width: 45,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  selected: { backgroundColor: "#3b3c31" },
  artWrap: { alignItems: "center" },
  videoLabel: {
    position: "absolute",
    bottom: 8,
    backgroundColor: "rgba(0,0,0,.7)",
    padding: 8,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  artist: { color: "#bbb", fontSize: 16, marginTop: 6 },
  queue: { alignItems: "center", marginTop: 35 },
  handle: { width: 32, height: 5, borderRadius: 8, backgroundColor: "#42433b" },
  queueText: { color: "#aaa", fontWeight: "600", fontSize: 15, marginTop: 16 },
});
