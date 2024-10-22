import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const SearchHeader = () => {
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
    <View style={{backgroundColor: "#76ECFC" }}>
      <View style={st.container}>
        <Ionicons name="search" size={20} color="gray" style={st.searchIcon} />
        <TextInput
          placeholder="Enter name of a destination!"
          placeholderTextColor={"grey"}
          style={[st.userInput]}
        />
        <Pressable>
          <Text style={st.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 17,
    padding: 10,
    margin: 10,
  },
  userInput: {
    flex: 1,
    fontFamily: "Nunito-Regular",
    fontSize: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  cancelText: {
    fontFamily: "Nunito-Bold",
    fontSize: 15,
  }
});
export default SearchHeader;
