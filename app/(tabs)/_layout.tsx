import { Tabs, Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const TabsLayout = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "default-icon"; // Provide a default value

            // Set different icons for each tab
            switch (route.name) {
              case "HomePage":
                iconName = focused ? "home" : "home-outline";
                break;
              case "ActivityPage":
                iconName = focused ? "list" : "list-outline";
                break;
              case "UserPage":
                iconName = focused ? "person" : "person-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#095E69",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#C7F8FF" },
        })}
      >
        <Tabs.Screen
          name="HomePage"
          options={{
            headerTitle: "Home",
            title: "Home",
            headerStyle: { backgroundColor: "#76ECFC" },
            headerTitleStyle: { fontFamily: "Nunito-Bold" },
            // headerShown: false,
          }}
        />
        <Tabs.Screen
          name="ActivityPage"
          options={{
            headerTitle: "Activity",
            title: "Activity",
            headerStyle: { backgroundColor: "#76ECFC" },
            headerTitleStyle: { fontFamily: "Nunito-Bold" },
          }}
        />
        <Tabs.Screen
          name="UserPage"
          options={{
            headerTitle: "My Account",
            title: "My Account",
            headerStyle: { backgroundColor: "#76ECFC" },
            headerTitleStyle: { fontFamily: "Nunito-Bold" },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
