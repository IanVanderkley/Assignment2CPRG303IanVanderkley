import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import CategoryChips from "../../components/CategoryChips";
import PlaylistCard from "../../components/PlaylistCard";
import { library } from "../../data/music";
import { shared } from "../../constants/theme";
export default function LibraryScreen() {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView edges={["top"]} style={shared.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Library" />
        <CategoryChips
          items={[
            "Downloads",
            "Playlists",
            "Songs",
            "Albums",
            "Artists",
            "Profiles",
            "Podcasts",
          ]}
        />
        <View style={styles.sort}>
          <Text style={styles.sortText}>Recent activity</Text>
          <Ionicons name="chevron-down" size={24} color="#fff" />
          <View style={{ flex: 1 }} />
          <Ionicons name="list" size={24} color="#fff" />
        </View>
        <View style={styles.grid}>
          {library.map((item) => (
            <PlaylistCard key={item.id} item={item} width={(width - 48) / 2} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.new}>
        <Ionicons name="add" size={28} color="#000" />
        <Text style={styles.newText}>New</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  sortText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  grid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 24,
    paddingBottom: 30,
  },
  new: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingHorizontal: 23,
    height: 49,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  newText: { color: "#000", fontSize: 18, fontWeight: "600" },
});
