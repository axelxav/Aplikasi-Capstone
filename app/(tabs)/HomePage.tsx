import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import OtsCode from "@/components/OtsCode";

const HomePage = () => {
  return (
    <SafeAreaView style={st.container}>
      <View style={st.headerContainer}>
        <SearchHeader />
        <LocationOpt />
      </View>
      <View>
        <OtsCode />
      </View>
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
