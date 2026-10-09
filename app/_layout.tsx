import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PlayerProvider } from "../context/PlayerContext";
// The player opens above the tabs, and closing it goes back.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#030303" },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="player"
            options={{
              // Slide the player up when it opens.
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
