import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const LocationOpt = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
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
    <View style={st.container}>
      <View style={st.locationPos}>
        <Ionicons name="location-sharp" size={20} color="gray" style={st.locationIcon}/>
        <Text style={st.locationText}>Sleman, Special Region of Yogyakarta</Text>
      </View>
      <View>
        <Pressable>
          <Text style={st.changeText}>Change</Text>
        </Pressable>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "#76ECFC",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
  locationPos: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontFamily: "Nunito-Bold",
    fontSize: 10,
    textDecorationLine: "underline",
  },
  locationText: {
    fontFamily: "Nunito-Bold",
    fontSize: 10,
  },
  locationIcon: {
    marginRight: 10,
    color: "black",
  },
});

export default LocationOpt;
