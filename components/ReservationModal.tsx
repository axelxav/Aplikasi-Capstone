import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import usePlaceStore from "@/store/placeStore";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import useTestingStore from "@/store/testingStore";
import useUserStore from "@/store/userStore";
import useReservationStore from "@/store/reservationStore";
import useOtsStore from "@/store/otsStore";

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
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const user_id = useUserStore((state) => state.userInfo.id);
  const setReservationQr = useReservationStore(
    (state) => state.setReservationQR
  );
  const setStartCount = useReservationStore((state) => state.setStartCount);

  const setValidationCount = useOtsStore((state) => state.setValidationCount);

  if (!fontsLoaded) {
    return null;
  }

  const handleConfirmation = async () => {
    try {
      const response = await fetch(`http://${iplocalhost}:5000/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, selectedSlot }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        console.log("Reservation confirmed");
        console.log(
          "user id: ",
          user_id,
          "selected slot: ",
          selectedSlot,
          "time af arrival: ",
          selectedTime
        );
        setReservationQr(data.reservation_qr);
        setStartCount(true);
        setValidationCount(false);
        router.navigate("/EntranceQr");
        // print current hour and minute in console
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        console.log("Current time: ", time);
        onClose();
      } else {
        alert(data.error + data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ justifyContent: "space-evenly", marginRight: 15 }}>
                <Text style={st.modalTextBold}>Place</Text>
                <Text style={st.modalTextBold}>Parking Slot</Text>
                <Text style={st.modalTextBold}>Arrival Time</Text>
              </View>
              <View style={{ justifyContent: "space-evenly", marginRight: 15 }}>
                <Text style={st.modalTextBold}>:</Text>
                <Text style={st.modalTextBold}>:</Text>
                <Text style={st.modalTextBold}>:</Text>
              </View>
              <View style={{ justifyContent: "space-evenly" }}>
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

            <View style={{ padding: 10 }}>
              <Text style={st.modalText}>
                Please make sure you park according to your reservation location
                and start time. Your reservation will be forfeited if you
                confirm your arrival 30 minutes late after your start time.
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
