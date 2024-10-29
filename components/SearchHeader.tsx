import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { useState } from "react";

const SearchHeader = () => {
  const [input, setInput] = useState("");
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const handleCancelButton = () => {
    setInput("");
  };

  return (
    <View style={{ backgroundColor: "#76ECFC" }} onLayout={onLayoutRootView}>
      <View style={st.container}>
        <Ionicons name="search" size={20} color="gray" style={st.searchIcon} />
        <TextInput
          placeholder="Enter name of a destination!"
          placeholderTextColor={"grey"}
          style={[st.userInput]}
          value={input}
          onChangeText={setInput}
        />
        <Pressable onPress={handleCancelButton}>
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
  },
});
export default SearchHeader;
