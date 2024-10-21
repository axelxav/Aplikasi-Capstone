import { Tabs, Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
      <Tabs>
        <Tabs.Screen
          name="HomePage"
          options={{
            headerTitle: "Home",
            headerStyle: {
              backgroundColor: "#76ECFC", // Set the header background color to #76ECFC
            },
            headerTitleStyle: {
              fontFamily: "Nunito-Bold", // Change this to your desired font family
            },
          }}
        />
        <Tabs.Screen
          name="ActivityPage"
          options={{
            headerTitle: "Activity Page",
            headerStyle: {
              backgroundColor: "#76ECFC", // Set the header background color to #76ECFC
            },
            headerTitleStyle: {
              fontFamily: "Nunito-Bold", // Change this to your desired font family
            },
          }}
        />
        <Tabs.Screen
          name="UserPage"
          options={{
            headerTitle: "My Account",
            headerStyle: {
              backgroundColor: "#76ECFC", // Set the header background color to #76ECFC
            },
            headerTitleStyle: {
              fontFamily: "Nunito-Bold", // Change this to your desired font family
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
