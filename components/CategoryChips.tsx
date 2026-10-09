import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function CategoryChips({ items }: { items: string[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((item) => (
        <View key={item} style={styles.chip}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 8, paddingVertical: 16 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: "rgba(150,150,150,.18)",
  },
  text: { color: "#fff", fontSize: 14, fontWeight: "500" },
});
