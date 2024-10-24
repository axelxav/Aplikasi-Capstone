// components/ConfirmationModal.tsx
import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur"; // Import BlurView
import { useCustomFonts } from "@/hooks/useCustomFonts";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView
        style={st.overlay}
        intensity={50} // Adjust blur intensity as needed
        tint="dark" // You can also change this to "light" for a lighter look
      >
        <View style={st.modalContainer}>
          <Text style={st.modalTitle}>Confirm Cancel</Text>
          <Text style={st.modalMessage}>
            Are you sure you want to cancel your edits?
          </Text>
          <View style={st.buttonContainer}>
            <Pressable style={st.button} onPress={onConfirm}>
              <Text style={st.buttonText}>Yes, Cancel</Text>
            </Pressable>
            <Pressable style={st.button} onPress={onClose}>
              <Text style={st.buttonText}>No, Go Back</Text>
            </Pressable>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const st = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white", // Semi-transparent background
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Shadow effect for Android
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
    fontFamily: "Nunito-Bold",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
    fontFamily: "Nunito-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#32A4A4", // Button color
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ConfirmationModal;
