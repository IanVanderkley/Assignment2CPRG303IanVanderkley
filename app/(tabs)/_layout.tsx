import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MusicTabBar from "../../components/MusicTabBar";
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <MusicTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#929292",
        tabBarLabelStyle: { fontSize: 10, lineHeight: 14, marginTop: 2 },
        tabBarStyle: {
          backgroundColor: "#212121",
          borderTopWidth: 0,
          height: 72 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="samples"
        options={{
          title: "Samples",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "play-forward" : "play-forward-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.searchIcon}>
              <Ionicons name="search-outline" size={26} color={color} />
              {focused ? <View style={styles.searchCircle} /> : null}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  searchCircle: {
    position: "absolute",
    left: 10,
    top: 9,
    width: 5,
    height: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
  },
});
