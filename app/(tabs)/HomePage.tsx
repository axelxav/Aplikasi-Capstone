import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import OtsCode from "@/components/OtsCode";
import PlaceCategories from "@/components/PlaceCategories";

const HomePage = () => {
  return (
    <SafeAreaView style={st.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : "padding"} // Use 'height' for Android
      >
        <ScrollView
          contentContainerStyle={st.scrollContainer}
          keyboardShouldPersistTaps="handled" // Keep keyboard open on tap
          showsVerticalScrollIndicator={false} // Hide scroll indicator
        >
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1, // Fill the entire screen
  },
  scrollContainer: {
    flexGrow: 1, // Allow scroll view to expand
    justifyContent: "flex-start", // Align items to the start
  },
  headerContainer: {
    flexGrow: 0, // Do not grow, stay fixed
    height: 150, // Fixed height for header
  },
  bodyContainer: {
    flexGrow: 0, // Do not grow, stay fixed
    height: 150, // Fixed height for body
  },
  catContainer: {
    flexGrow: 1, // Allow categories container to grow
    paddingBottom: 20, // Optional padding at the bottom
  },
});

export default HomePage;
