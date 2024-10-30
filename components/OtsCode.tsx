// components/OtsCode.tsx

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import QrCodeModal from "./QrCodeModal";
import useUserStore from "../store/userStore"; // Import the Zustand store

const OtsCode: React.FC = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [isModalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={st.container} onLayout={onLayoutRootView}>
      <View style={{ flex: 3 }}>
        <Text style={st.headerText}>On The Spot Service</Text>
        <Text style={st.bodyText}>
          Forgot to reserve? Don’t worry, open your QR code and scan to the
          scanner!
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Pressable onPress={handleOpenModal}>
          <Image
            source={require("../assets/images/userQr.png")}
            style={st.imageStyle}
          />
        </Pressable>
      </View>
      <QrCodeModal visible={isModalVisible} onClose={handleCloseModal} />
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
    padding: 15,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  bodyText: {
    fontFamily: "Nunito-Regular",
    fontSize: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
    left: 10,
  },
});

export default OtsCode;
