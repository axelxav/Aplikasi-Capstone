import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import usePlaceStore from "@/store/placeStore";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useSelectedSlot from "@/store/selectedSlotStore";
import { useState } from "react";
import OpenBollardModal from "@/components/OpenBollardModal";

const OpenBollard = () => {
  const navigation = useNavigation();
  const placeName = usePlaceStore((state) => state.placeName);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const selectedSlot =  useSelectedSlot((state) => state.selectedSlot);
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: `${placeName} Reservation`,
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation, placeName]);

  const handleOpenBollard = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <Text style={[st.text, { marginBottom: 50 }]}>Your Parking Slot Is</Text>
      <Text style={[st.slotText, {textDecorationLine: "underline"}]}>{placeName}</Text>
      <Text style={[st.slotText, { fontSize: 100, marginBottom: 30 }]}>
        {selectedSlot}
      </Text>
      <Text style={st.text}>
        Your parking slot is secured. Tap button below to open your
      </Text>
      <Text style={[st.text, { fontFamily: "Nunito-Bold" }]}>
        parking bollard
      </Text>
      <Pressable style={st.button} onPress={handleOpenBollard}>
        <Text style={st.buttonText}>Tap To</Text>
        <Text style={st.buttonText}>Open</Text>
      </Pressable>
      <OpenBollardModal visible={modalVisible} onClose={handleOpenBollard} />
    </SafeAreaView>
  );
};

export default OpenBollard;

const st = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Nunito-Regular",
    textAlign: "center",
    
  },
  slotText: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
  },
  button: {
    // circle button
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#095E69",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Nunito-Bold",
  },
});
