import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import LocationCard from "@/components/LocationCard";
import useLocationStore from "@/store/locationStore";
import useSearchStore from "@/store/searchStore";

const MallCat = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const navigation = useNavigation();
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: "Mall",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
    setSearchQuery("");
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <View style={st.headerContainer}>
          <SearchHeader />
          <LocationOpt />
          <Text style={st.headerText}>Mall Category</Text>
        </View>
        <View style={st.locationContainer}>
          <LocationCard
            type="mall"
            address={
              selectedLocation === "All Locations" ? "" : selectedLocation
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MallCat;

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexGrow: 0, // Do not grow, stay fixed
    height: 150, // Fixed height for header
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
    alignSelf: "center",
    marginTop: 20,
  },
  locationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});
