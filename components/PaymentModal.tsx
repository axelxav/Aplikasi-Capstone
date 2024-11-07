import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useReservationStore from "@/store/reservationStore";
import useTestingStore from "@/store/testingStore";
import { router } from "expo-router";
import useSelectedSlot from "@/store/selectedSlotStore";
import useUserStore from "@/store/userStore";
import useOtsStore from "@/store/otsStore";

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose }) => {
  const { fontsLoaded } = useCustomFonts();
  const hasArrived = useReservationStore((state) => state.hasArrived);
  const setHasArrived = useReservationStore((state) => state.setHasArrived);
  const hasFinished = useReservationStore((state) => state.hasFinished);
  const setHasFinished = useReservationStore((state) => state.setHasFinished);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const user_id = useUserStore((state) => state.userInfo.id);
  const setValidationCount = useOtsStore((state) => state.setValidationCount);

  if (!fontsLoaded) {
    return null;
  }

  const handleConfirmation = async () => {
    try {
      const response = await fetch(
        `http://${iplocalhost}:5000/finishReservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setHasArrived(false);
        setHasFinished(false);
        setValidationCount(true);
        console.log("Reservation Finished", hasArrived, hasFinished);
        onClose();
        router.replace("/HomePage");
      } else {
        console.log(data.error + data.message);
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
            <Text style={st.modalTitle}>Payment</Text>
            <View>
              <Text style={st.modalText}>Parking duration: xx:xx:xx</Text>
              <Text style={[st.modalText, { marginBottom: 30 }]}>
                Your billing: Rp xx,000,00
              </Text>
            </View>

            <Text style={st.modalText}>
              Proceed your payment to exit from this building. You may use your
              cash, e-wallet, or e-money card to purchase.
            </Text>
            <Pressable style={st.confirmButton} onPress={handleConfirmation}>
              <Text style={st.confirmButtonText}>Confirm Payment</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default PaymentModal;

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
    // alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Nunito-Bold",
    alignSelf: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Nunito-Regular",
  },
  confirmButton: {
    padding: 10,
    backgroundColor: "#32A4A4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 150,
    marginTop: 50,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
