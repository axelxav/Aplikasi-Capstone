import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import React, { useEffect } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import usePlaceStore from "@/store/placeStore";
import { router, useNavigation } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import useReservationStore from "@/store/reservationStore";
import useUserStore from "@/store/userStore";
import useTestingStore from "@/store/testingStore";
import PaymentModal from "@/components/PaymentModal";

const ExitQr = () => {
  const navigation = useNavigation();
  const placeName = usePlaceStore((state) => state.placeName);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const reservation_qr = useReservationStore((state) => state.reservation_qr);
  const startCount = useReservationStore((state) => state.startCount);
  const setStartCount = useReservationStore((state) => state.setStartCount);
  const hasFinished = useReservationStore((state) => state.hasFinished);
  const setHasFinished = useReservationStore((state) => state.setHasFinished);
  const user_id = useUserStore((state) => state.userInfo.id);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const [modalVisible, setModalVisible] = React.useState(false);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startCount && !hasFinished) {
      interval = setInterval(() => {
        handleFetchingFinished();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [startCount, hasFinished]); // dependencies to control fetching

  const handleFetchingFinished = async () => {
    try {
      const response = await fetch(
        `http://${iplocalhost}:5000/hasFinished?user_id=${user_id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setHasFinished(data.has_finished); // Update hasFinished in Zustand
        console.log("hasFinished:", data.has_finished); // Log for debugging
        
      } else {
        console.log(data.error + data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (hasFinished) {
      console.log("User has finish. Stopping the counter.");
      setStartCount(false); // Stop counting when finish
      setModalVisible(!modalVisible);
    }
  }, [hasFinished]); // Handles what to do when hasFinished changes

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View style={st.headerContainer}>
        <Text style={st.headerText}>Exit</Text>
      </View>

      <View style={st.qrContainer}>
        <View style={{ marginTop: 20, padding: 10 }}>
          <Text style={st.qrText}>Scan this QR code at exit gate</Text>
        </View>
        <View style={st.qrCodeStyle}>
          <QRCode value={reservation_qr} size={250} />
        </View>
        <Text style={st.qrText}>Scan this code at exit gate</Text>
        <Text
          style={[
            st.qrText,
            { textAlign: "center", fontSize: 14, marginTop: 20 },
          ]}
        >
          to confirm your billing and proceed your payment
        </Text>
      </View>
      <PaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ExitQr;

const st = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Nunito-Bold",
  },
  headerContainer: {
    marginBottom: 20,
  },
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#074850",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    padding: 30,
  },
  qrText: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    color: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    backgroundColor: "#467479",
    paddingVertical: 15,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
  },
  detailText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: "#fff",
  },
  detailTextBold: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#fff",
  },
  qrCodeStyle: {
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
});
