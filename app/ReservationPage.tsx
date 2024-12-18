import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, Router, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import usePlaceStore from "@/store/placeStore";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import TimePickerModal from "@/components/TimePickerModal";
import ReservationModal from "@/components/ReservationModal";
import useTestingStore from "@/store/testingStore";

const ReservationPage = () => {
  const placeName = usePlaceStore((state) => state.placeName);
  const navigation = useNavigation();
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const setSelectedSlot = useSelectedSlot(
    (state) => state.setSelectedSlot as (slot: string | null) => void
  );
  const selectedSlot = useSelectedSlot((state) => state.selectedSlot);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const selectedTime = useSelectedTime((state) => state.selectedTime);
  const setSelectedTime = useSelectedTime((state) => state.setSelectedTime);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationInfo, setReservationInfo] = useState(false);
  const [slotAvailability, setSlotAvailability] = useState<{
    [key: string]: boolean;
  }>({});

  // State to track the currently selected slot
  const [currentSelectedSlot, setCurrentSelectedSlot] = useState<string | null>(
    null
  );

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: placeName + " Reservation",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
    setSelectedTime("Select Time");
    setSelectedSlot("Select Slot");

    const fetchSlotAvailability = async () => {
      try {
        const response = await fetch(
          `http://${iplocalhost}:5000/checkSlotAvailability`
        );
        const data = await response.json();
        setSlotAvailability(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch slot availability");
      }
    };
    fetchSlotAvailability();
  }, [navigation]);

  const handleSlotSelection = (slotId: string) => {
    // If the selected slot is the same as the current, just return (toggle behavior)
    if (currentSelectedSlot === slotId) {
      setCurrentSelectedSlot("Select Slot");
      setSelectedSlot("Select Slot"); // Clear selected slot in Zustand store
    } else {
      // If another slot was selected before, deselect the previous one
      if (currentSelectedSlot) {
        setSelectedSlot(null); // Clear previously selected slot in Zustand store
      }
      setCurrentSelectedSlot(slotId); // Set the newly selected slot
      setSelectedSlot(slotId); // Update Zustand store with the new selection
    }
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleReservation = () => {
    setReservationInfo(!reservationInfo);
  };

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View style={st.legendContainer}>
        {/* Legend components */}
        <View style={st.legendBoxes}>
          <View style={st.availableBox} />
          <Text style={st.legendText}>Available</Text>
        </View>
        <View style={st.legendBoxes}>
          <View style={st.reservedBox} />
          <Text style={st.legendText}>Reserved</Text>
        </View>
        <View style={st.legendBoxes}>
          <View style={st.selectedBox} />
          <Text style={st.legendText}>Selected</Text>
        </View>
      </View>
      <View style={st.mapContainer}>
        {/* Map component */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: 50,
          }}
        >
          <Text style={st.textMapStyle}>Building</Text>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#505050",
                width: 50,
                height: 10,
                borderRadius: 5,
              }}
            />
            <Text style={st.textMapStyle}>Exit</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={st.columnStyle}>
            {/* Render A Row Slots */}
            {["A3", "A2", "A1"].map((slot) => (
              <Pressable
                key={slot}
                style={[
                  slotAvailability[slot] ? st.reservedBox : st.availableBox,
                  { marginBottom: 30 },
                  currentSelectedSlot === slot && st.selectedBox,
                ]}
                onPress={() =>
                  !slotAvailability[slot] && handleSlotSelection(slot)
                }
                disabled={slotAvailability[slot]}
              ></Pressable>
            ))}
          </View>
          <View style={st.columnStyle}>
            {/* Render B Row Slots */}
            {["B2", "B1"].map((slot) => (
              <Pressable
                key={slot}
                style={[
                  slotAvailability[slot] ? st.reservedBox : st.availableBox,
                  { marginBottom: 30 },
                  currentSelectedSlot === slot && st.selectedBox, // Change style if selected
                ]}
                onPress={() =>
                  !slotAvailability[slot] && handleSlotSelection(slot)
                }
                disabled={slotAvailability[slot]}
              ></Pressable>
            ))}
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <View
            style={{
              backgroundColor: "#505050",
              width: "80%",
              height: 10,
              borderRadius: 5,
            }}
          />
          <Text style={st.textMapStyle}>Entrance</Text>
        </View>
      </View>
      <View style={st.confirmationContainer}>
        <View style={st.detailContainer}>
          <Pressable
            style={{ alignItems: "center" }}
            onPress={handleModalVisible}
          >
            <Text style={st.detailText}>Arrival Time</Text>
            <Pressable onPress={handleModalVisible}>
              <Text
                style={[st.detailTextBold, { textDecorationLine: "underline" }]}
              >
                {selectedTime}
              </Text>
            </Pressable>
          </Pressable>
          <View style={{ alignItems: "center" }}>
            <Text style={st.detailText}>Selected Slot</Text>
            <Text style={st.detailTextBold}>{selectedSlot}</Text>
          </View>
        </View>
        <Pressable
          style={[
            // Change the color based on the condition
            st.reserveButton,
            {
              backgroundColor:
                selectedSlot === "Select Slot" || selectedTime === "Select Time"
                  ? "#D9D9D9"
                  : "#095E69",
            },
          ]}
          disabled={
            selectedSlot === "Select Slot" || selectedTime === "Select Time"
          }
          onPress={handleReservation}
        >
          <Text style={st.reserveText}>Reserve</Text>
        </Pressable>
      </View>
      <ReservationModal visible={reservationInfo} onClose={handleReservation} />
      <TimePickerModal visible={modalVisible} onClose={handleModalVisible} />
    </SafeAreaView>
  );
};

export default ReservationPage;

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  legendContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    padding: 10,
    top: 0,
    left: 0,
    right: 0,
    // card style
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendBoxes: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    marginLeft: 5,
  },
  availableBox: {
    width: 50,
    height: 30,
    backgroundColor: "#110F52",
    borderRadius: 5,
  },
  reservedBox: {
    width: 50,
    height: 30,
    backgroundColor: "#505050",
    borderRadius: 5,
  },
  selectedBox: {
    width: 50,
    height: 30,
    backgroundColor: "#76ECFC",
    borderRadius: 5,
  },
  mapContainer: {
    flex: 1,
    marginTop: "20%",
    padding: 10,
    // card style
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 10,
    alignItems: "center",
  },
  textMapStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  confirmationContainer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    width: "100%",
  },
  reserveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#095E69",
    justifyContent: "center",
    alignItems: "center",
  },
  reserveText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "white",
  },
  detailContainer: {
    flexDirection: "row",
    backgroundColor: "#C7F8FF",
    paddingVertical: 15,
    paddingHorizontal: 50,
    justifyContent: "space-between",
  },
  detailText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
  },
  detailTextBold: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },
});
