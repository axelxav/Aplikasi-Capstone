import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";

const HomePage = () => {
  return (
    <SafeAreaView style={st.container}>
      <View style={st.headerContainer}>
        <SearchHeader />
        <LocationOpt />
      </View>
      <View></View>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
});

export default HomePage;
