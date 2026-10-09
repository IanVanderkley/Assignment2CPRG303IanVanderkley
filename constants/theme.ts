import { StyleSheet } from "react-native";
export const colors = {
  background: "#030303",
  surface: "#212121",
  muted: "#aaa",
  white: "#fff",
};
export const shared = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  text: { color: colors.white },
  row: { flexDirection: "row", alignItems: "center" },
  title: { color: "#fff", fontWeight: "700", fontSize: 24 },
  muted: { color: colors.muted, fontSize: 14 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
});
