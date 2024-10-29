import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import { useCustomFonts } from "@/hooks/useCustomFonts";

const MallCat = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const navigation = useNavigation();

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: "Mall",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View>
        <SearchHeader />
        <LocationOpt />
      </View>
      <View>
        <Text>Mall Category</Text>
      </View>
    </SafeAreaView>
  );
};

export default MallCat;

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
