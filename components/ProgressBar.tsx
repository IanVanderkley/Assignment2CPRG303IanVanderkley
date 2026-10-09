import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
interface Props {
  position: number;
  duration: number;
  onSeek: (seconds: number) => void;
}
export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
export default function ProgressBar({ position, duration, onSeek }: Props) {
  // Use the bar width to work out where the user tapped.
  const [width, setWidth] = useState(1);
  const bar = useRef<View>(null);
  return (
    <View>
      <Pressable
        ref={bar}
        accessibilityRole="adjustable"
        accessibilityLabel="Playback progress"
        accessibilityValue={{ min: 0, max: duration, now: position }}
        accessibilityActions={[
          { name: "increment", label: "Forward ten seconds" },
          { name: "decrement", label: "Back ten seconds" },
        ]}
        onAccessibilityAction={(event) =>
          onSeek(
            position +
              (event.nativeEvent.actionName === "increment" ? 10 : -10),
          )
        }
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
        onPress={(event) => {
          const tapX = event.nativeEvent.pageX;
          bar.current?.measureInWindow((left) => {
            onSeek(((tapX - left) / width) * duration);
          });
        }}
        style={styles.touch}
      >
        <View style={styles.track}>
          <View
            style={[styles.fill, { width: `${(position / duration) * 100}%` }]}
          />
        </View>
      </Pressable>
      <View style={styles.times}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  touch: { height: 24, justifyContent: "center" },
  track: {
    height: 4,
    backgroundColor: "#555",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: { height: 4, backgroundColor: "#fff" },
  times: { flexDirection: "row", justifyContent: "space-between" },
  time: { color: "#aaa", fontSize: 12 },
});
