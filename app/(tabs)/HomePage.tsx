import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import OtsCode from "@/components/OtsCode";
import PlaceCategories from "@/components/PlaceCategories";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <SafeAreaView style={st.container}>
      <View style={st.headerContainer}>
        <SearchHeader />
        <LocationOpt />
      </View>
      <View style={st.bodyContainer}>
        <OtsCode />
      </View>
      <View style={st.catContainer}>
        <PlaceCategories />
      </View>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
  catContainer: {
    flex: 3,
  },
});

export default HomePage;
