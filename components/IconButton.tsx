import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
interface Props {
  name: ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
  size?: number;
  color?: string;
}
export default function IconButton({
  name,
  label,
  onPress,
  size = 25,
  color = "#fff",
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.55 : 1 }]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minWidth: 42,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
