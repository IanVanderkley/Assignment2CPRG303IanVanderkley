import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { artwork } from "../data/music";
export default function Header({
  title = "Music",
  minimal = false,
}: {
  title?: string;
  minimal?: boolean;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        {title === "Music" ? (
          <View style={styles.logo}>
            <Ionicons name="play-circle-outline" color="#fff" size={25} />
          </View>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {!minimal ? (
        <View style={styles.right}>
          {title === "Library" ? (
            <>
              <Ionicons name="time-outline" size={27} color="#fff" />
              <Ionicons name="search-outline" size={26} color="#fff" />
            </>
          ) : (
            <View>
              <Ionicons name="notifications-outline" size={25} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          )}
          <Image source={artwork.avatar} style={styles.avatar} />
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 4 },
  logo: {
    backgroundColor: "#ff0033",
    width: 27,
    height: 27,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", letterSpacing: -1 },
  right: { flexDirection: "row", gap: 20, alignItems: "center" },
  avatar: { width: 25, height: 25, borderRadius: 20 },
  badge: {
    position: "absolute",
    right: -5,
    top: -4,
    backgroundColor: "red",
    borderRadius: 20,
    width: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "white", fontSize: 11 },
});
