import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";

const OtsCode = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={st.container} onLayout={onLayoutRootView}>
      <View>
        <Text>On The Spot Service</Text>
        <Text>
          Forgot to reserve? Don’t worry, open your QR code and scan to the
          scanner!
        </Text>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    // card style
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 20,
  },
});

export default OtsCode;
