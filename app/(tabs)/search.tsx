import { useCallback, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { recentSearches, searchCards } from "../../data/music";
import { shared } from "../../constants/theme";
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const input = useRef<TextInput>(null);
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => input.current?.focus(), 200);
      return () => {
        clearTimeout(timer);
        input.current?.blur();
      };
    }, []),
  );
  function fill(value: string) {
    setQuery(value);
    input.current?.focus();
  }
  return (
    <SafeAreaView edges={["top"]} style={shared.screen}>
      <View style={styles.top}>
        <View style={styles.field}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Home"
            onPress={() => {
              Keyboard.dismiss();
              router.navigate("/");
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <TextInput
            ref={input}
            value={query}
            onChangeText={setQuery}
            placeholder="Type to search"
            placeholderTextColor="#aaa"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
          <Ionicons name="mic-outline" size={24} color="#fff" />
        </View>
        <View style={styles.sound}>
          <Ionicons name="pulse" size={23} color="#fff" />
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.recent}>Recent searches</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cards}
        >
          {searchCards.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => fill(item.title)}
              accessibilityRole="button"
              style={{ width: 84 }}
            >
              <Image source={item.artwork} style={styles.cover} />
              <Text numberOfLines={1} style={styles.cardTitle}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {recentSearches.map((text) => (
          <SearchRow key={text} text={text} onPress={() => fill(text)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
// Only the search page uses this row, so I kept it in this file.
function SearchRow({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.history}
    >
      <Ionicons name="time-outline" size={26} color="#fff" />
      <Text style={styles.historyText}>{text}</Text>
      <Ionicons
        name="arrow-up-outline"
        size={24}
        color="#fff"
        style={{ transform: [{ rotate: "-45deg" }] }}
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  field: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#212121",
    borderRadius: 40,
    paddingHorizontal: 14,
    height: 48,
  },
  input: { flex: 1, color: "#fff", fontSize: 17, height: 48 },
  sound: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
  recent: { color: "#aaa", fontSize: 14, margin: 16, marginTop: 20 },
  cards: { paddingHorizontal: 16, gap: 16, marginBottom: 20 },
  cover: { width: 84, height: 84, borderRadius: 4 },
  cardTitle: { color: "#fff", fontSize: 12, marginTop: 8 },
  history: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 28,
    minHeight: 49,
    paddingVertical: 8,
  },
  historyText: { flex: 1, fontSize: 16, color: "#fff", lineHeight: 21 },
});
