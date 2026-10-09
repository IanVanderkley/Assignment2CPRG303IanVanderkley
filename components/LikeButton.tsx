import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
interface Props {
  liked: boolean;
  onPress: () => void;
  label?: string;
}
export default function LikeButton({ liked, onPress, label }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  function press() {
    onPress();
    // Make the like icon pop when it gets tapped.
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }
  return (
    <Pressable
      onPress={press}
      accessibilityRole="button"
      accessibilityLabel={liked ? "Unlike song" : "Like song"}
      accessibilityState={{ selected: liked }}
      style={styles.button}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={liked ? "thumbs-up" : "thumbs-up-outline"}
          size={24}
          color="#fff"
        />
      </Animated.View>
      {label ? <Text style={styles.text}>{label}</Text> : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  text: { fontSize: 15, color: "#fff" },
});
