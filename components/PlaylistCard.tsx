import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Playlist } from "../types/music";
interface Props {
  item: Playlist;
  width: number;
  overlay?: boolean;
  onPress?: () => void;
}
export default function PlaylistCard({
  item,
  width,
  overlay = false,
  onPress,
}: Props) {
  const showTitle = Boolean(item.title) && !item.hideTitle;
  const content = overlay ? (
    <ImageBackground
      source={item.artwork}
      style={{ width, height: width }}
      imageStyle={styles.image}
    >
      {showTitle ? (
        <Image
          source={require("../assets/images/title-fade.png")}
          style={styles.shade}
        />
      ) : null}
      {showTitle ? (
        <Text numberOfLines={1} style={styles.overlay}>
          {item.title}
        </Text>
      ) : null}
    </ImageBackground>
  ) : (
    <>
      <Image
        source={item.artwork}
        style={[styles.image, { width, height: width }]}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      {item.subtitle ? (
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      ) : null}
    </>
  );
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.title}`}
      onPress={onPress}
      style={{ width }}
    >
      {content}
    </Pressable>
  ) : (
    <View style={{ width }}>{content}</View>
  );
}
const styles = StyleSheet.create({
  image: { borderRadius: 7 },
  shade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  overlay: {
    position: "absolute",
    bottom: 5,
    left: 8,
    right: 5,
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  title: { color: "#fff", fontWeight: "600", fontSize: 15, marginTop: 8 },
  subtitle: { color: "#aaa", fontSize: 14, marginTop: 3, lineHeight: 19 },
});
