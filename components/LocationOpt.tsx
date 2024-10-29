import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { BlurView } from "expo-blur";

const locations = [
  "Kabupaten Sleman",
  "Kabupaten Bantul",
  "Kabupaten Gunung Kidul",
  "Kabupaten Kulon Progo",
  "Kota Yogyakarta",
];

const LocationOpt = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    "Kota Yogyakarta"
  ); // Default location

  if (!fontsLoaded) {
    return null;
  }

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setModalVisible(false); // Close modal after selection
  };

  return (
    <View style={st.container} onLayout={onLayoutRootView}>
      <View style={st.locationPos}>
        <Ionicons
          name="location-sharp"
          size={20}
          color="gray"
          style={st.locationIcon}
        />
        <Text style={st.locationText}>{selectedLocation}</Text>
      </View>
      <View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={st.changeText}>Change</Text>
        </Pressable>
      </View>

      {/* Modal for Location Selection */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <BlurView style={st.overlay} intensity={50} tint="dark">
          <View style={st.modalContainer}>
            <Text style={st.modalTitle}>Select Location</Text>
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <Pressable
                  style={st.locationItem}
                  onPress={() => handleLocationChange(item)}
                >
                  <Text style={st.locationText}>{item}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item}
              style={st.locationList}
            />
            <Pressable
              style={st.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={st.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "#76ECFC",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
  locationPos: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontFamily: "Nunito-Bold",
    fontSize: 10,
    textDecorationLine: "underline",
  },
  locationText: {
    fontFamily: "Nunito-Bold",
    fontSize: 10,
  },
  locationIcon: {
    marginRight: 10,
    color: "black",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationList: {
    width: "100%",
  },
  locationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E24A4A", // Button color
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LocationOpt;
