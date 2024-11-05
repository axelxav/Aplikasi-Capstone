import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import usePlaceStore from "@/store/placeStore";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

interface ReservationModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  visible,
  onClose,
}) => {
  const { fontsLoaded } = useCustomFonts();
  const selectedSlot = useSelectedSlot((state) => state.selectedSlot);
  const selectedTime = useSelectedTime((state) => state.selectedTime);
  const placeName = usePlaceStore((state) => state.placeName);

  if (!fontsLoaded) {
    return null;
  }

  const handleConfirmation = () => {
    router.replace("/EntranceQr");
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
      >
        <BlurView
          style={st.overlay}
          intensity={50}
          tint="systemThickMaterialDark"
        >
          <View style={st.modalContainer}>
            <Text style={st.modalTitle}>Confirmation</Text>
            <Text style={st.modalText}>You will be reserving at:</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <View>
                <Text style={st.modalTextBold}>Place</Text>
                <Text style={st.modalTextBold}>Parking Slot</Text>
                <Text style={st.modalTextBold}>Arrival Time</Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={st.modalTextBold}>:</Text>
                <Text style={st.modalTextBold}>:</Text>
                <Text style={st.modalTextBold}>:</Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text
                  style={[st.modalText, { textDecorationLine: "underline" }]}
                >
                  {placeName}
                </Text>
                <Text
                  style={[st.modalText, { textDecorationLine: "underline" }]}
                >
                  {selectedSlot}
                </Text>
                <Text
                  style={[st.modalText, { textDecorationLine: "underline" }]}
                >
                  {selectedTime}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20, padding: 10 }}>
              <Text style={st.modalText}>
                Please make sure you park according to your reservation location
                and start time. Your reservation will be forfeited if you
                confirm your arrival XX minutes late after your start time.
              </Text>
            </View>

            <View style={st.buttonContainer}>
              <Pressable style={st.confirmButton} onPress={handleConfirmation}>
                <Text style={st.confirmButtonText}>Confirm</Text>
              </Pressable>
              <Pressable style={st.closeButton} onPress={onClose}>
                <Text style={st.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default ReservationModal;

const st = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Nunito-Bold",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Nunito-Regular",
  },
  modalTextBold: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Nunito-Bold",
  },
  buttonContainer: {
    justifyContent: "space-around",
  },

  confirmButton: {
    padding: 10,
    backgroundColor: "#32A4A4",
    borderRadius: 5,
    alignItems: "center",
    width: 150,
    marginBottom: 10,
    marginTop: 50,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#E24A4A",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
