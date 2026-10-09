import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../../components/Header";
import CategoryChips from "../../components/CategoryChips";
import PlaylistCard from "../../components/PlaylistCard";
import SongRow from "../../components/SongRow";
import { artwork, songs, speedDial } from "../../data/music";
import { usePlayer } from "../../context/PlayerContext";
import { shared } from "../../constants/theme";
export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tile = (width - 40) / 3;
  const { selectSong } = usePlayer();
  // Pick the song before opening the full player.
  function open(songId: string) {
    selectSong(songId);
    router.push("/player");
  }
  return (
    <SafeAreaView edges={["top"]} style={shared.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.glow} />
        <Header />
        <CategoryChips
          items={[
            "Podcasts",
            "Workout",
            "Energize",
            "Feel good",
            "Relax",
            "Party",
            "Commute",
            "Romance",
            "Sad",
            "Focus",
            "Sleep",
          ]}
        />
        <View style={styles.sectionHeader}>
          <Image source={artwork.user} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.user}>VANDERMOOSE</Text>
            <Text style={[shared.title, styles.speedTitle]}>Speed dial</Text>
          </View>
          <Ionicons name="chevron-forward" color="#fff" size={27} />
        </View>
        <View style={styles.grid}>
          {speedDial.map((item) => (
            <PlaylistCard
              key={item.id}
              item={item}
              width={tile}
              overlay
              onPress={() =>
                open(["liked", "mix"].includes(item.id) ? "thinking" : item.id)
              }
            />
          ))}
        </View>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === 0 ? "#eee" : "#555" },
              ]}
            />
          ))}
        </View>
        <View style={styles.quick}>
          <Text style={shared.title}>Quick picks</Text>
          <Pressable
            onPress={() => open("steady")}
            accessibilityRole="button"
            style={styles.playAll}
          >
            <Text style={styles.buttonText}>Play all</Text>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          {[songs[1], songs[0], songs[2]].map((song) => (
            <SongRow key={song.id} song={song} onPress={() => open(song.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 230,
    backgroundColor: "#160d1f",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 16,
    marginTop: 9,
    marginBottom: 20,
  },
  speedTitle: { fontSize: 21 },
  avatar: { width: 33, height: 33, borderRadius: 30 },
  user: { color: "#aaa", fontSize: 12, marginBottom: 2 },
  grid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 9,
  },
  dot: { width: 8, height: 8, borderRadius: 8 },
  quick: {
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playAll: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: { color: "#fff", fontSize: 13 },
});
