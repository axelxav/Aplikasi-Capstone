import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { BlurView } from "expo-blur";
import useSelectedTime from "@/store/selectedTimeStore";

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
}) => {
  const { fontsLoaded } = useCustomFonts();
  useSelectedTime((state)=>state.setSelectedTime)

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
        intensity={50} // Set the intensity of the blur effect
        tint="systemThickMaterialDark" // You can change this to 'dark' or 'light'
      >
        <View style={st.container}>
          <Text style={st.headerText}>Estimate Arrival Time</Text>
          <Text style={st.bodyText}>Estimate when you will occupy this parking slot.</Text>
          <Pressable onPress={onClose} style={st.confirmationButton}>
            <Text style={st.buttonText}>Confirm</Text>
          </Pressable>
          <Pressable onPress={onClose} style={st.cancelButton}>
            <Text style={st.buttonText}>Close</Text>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
};

export default TimePickerModal;

const st = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmationButton: {
    backgroundColor: "#32A4A4",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E24A4A",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 30,
  },
  bodyText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    marginBottom: 30,
  },
});
