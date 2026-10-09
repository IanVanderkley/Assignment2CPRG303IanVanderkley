import { BottomTabBar, BottomTabBarProps } from "expo-router/tabs";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import MiniPlayer from "./MiniPlayer";
export default function MusicTabBar(props: BottomTabBarProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true),
    );
    const hide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const route = props.state.routes[props.state.index].name;
  // Hide the bottom bar while the search keyboard is open.
  if (route === "search" && keyboardOpen) {
    return null;
  }
  return (
    <View>
      {route !== "samples" ? <MiniPlayer /> : null}
      <BottomTabBar {...props} />
    </View>
  );
}
