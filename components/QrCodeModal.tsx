// components/QrCodeModal.tsx

import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { BlurView } from "expo-blur"; // Import from expo-blur
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useUserStore from "../store/userStore";

interface QrCodeModalProps {
  visible: boolean;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ visible, onClose }) => {
  const { fontsLoaded } = useCustomFonts();
  const user_unique = useUserStore((state) => state.userInfo.user_unique);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView
        style={st.overlay}
        intensity={50} // Set the intensity of the blur effect
        tint="systemThickMaterialDark" // You can change this to 'dark' or 'light'
      >
        <View style={st.modalContainer}>
          <Text style={st.modalTitle}>Your QR Code</Text>
          <View style={st.qrContainer}>
            <QRCode value={user_unique} size={200} />
          </View>
          <Text style={st.tutorText}>
            Scan your own code to the scanner. You will have access to enter and
            exit the parking area
          </Text>
          <Pressable style={st.closeButton} onPress={onClose}>
            <Text style={st.closeButtonText}>Close</Text>
          </Pressable>
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
    backgroundColor: "#2B747E",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Nunito-Bold",
    color: "white",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E24A4A",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontFamily: "Nunito-Bold",
  },
  qrContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  tutorText: {
    fontFamily: "Nunito-Regular",
    color: "white",
    fontSize: 12,
    textAlign: "justify",
  },
});

export default QrCodeModal;
