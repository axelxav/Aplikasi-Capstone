import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { BlurView } from "expo-blur";
import useTestingStore from "@/store/testingStore";
import useUserStore from "@/store/userStore";
import { router } from "expo-router";

interface OpenBollardModalProps {
  visible: boolean;
  onClose: () => void;
}

const OpenBollardModal: React.FC<OpenBollardModalProps> = ({
  visible,
  onClose,
}) => {
  const { fontsLoaded } = useCustomFonts();
  const user_id = useUserStore((state) => state.userInfo.id);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);

  if (!fontsLoaded) {
    return null;
  }

  const handleConfirmation = async () => {
    try {
      const response = await fetch(`http://${iplocalhost}:5000/has_open`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Bollard opened");
        onClose();
        router.navigate("/ExitQr");
      } else {
        console.log(data.error + data.message);
      }
    } catch (error) {}
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
          <View style={st.container}>
            <Text style={st.headerText}>Are You Sure?</Text>
            <Text style={st.textRegular}>
              Your parking spot's bollard will be{" "}
              <Text style={st.textBold}>opened.</Text>
            </Text>
            <Text style={st.textRegular}>
              This action can't be <Text style={st.textBold}>undone.</Text>
            </Text>
            <Pressable style={st.confirmButton} onPress={handleConfirmation}>
              <Text style={st.buttonText}>Confirm</Text>
            </Pressable>
            <Pressable style={st.closeButton} onPress={onClose}>
              <Text style={st.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default OpenBollardModal;

const st = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // card style
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
  closeButton: {
    padding: 10,
    backgroundColor: "#E24A4A",
    borderRadius: 5,
    alignItems: "center",
    width: 150,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Nunito-Bold",
  },
  textRegular: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Nunito-Regular",
  },
  textBold: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Nunito-Bold",
  },
});
