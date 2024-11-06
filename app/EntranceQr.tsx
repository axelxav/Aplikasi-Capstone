import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import React, { useEffect } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import usePlaceStore from "@/store/placeStore";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import { router, useNavigation } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import useReservationStore from "@/store/reservationStore";
import useUserStore from "@/store/userStore";
import useTestingStore from "@/store/testingStore";

const EntranceQr = () => {
  const navigation = useNavigation();
  const placeName = usePlaceStore((state) => state.placeName);
  const selectedSlot = useSelectedSlot((state) => state.selectedSlot);
  const selectedTime = useSelectedTime((state) => state.selectedTime);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const reservation_qr = useReservationStore((state) => state.reservation_qr);
  const startCount = useReservationStore((state) => state.startCount);
  const setStartCount = useReservationStore((state) => state.setStartCount);
  const hasArrived = useReservationStore((state) => state.hasArrived);
  const setHasArrived = useReservationStore((state) => state.setHasArrived);
  const user_id = useUserStore((state) => state.userInfo.id);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: `${placeName} Reservation`,
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation, placeName]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startCount && !hasArrived) {
      interval = setInterval(() => {
        handleFetchingArrival();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [startCount, hasArrived]); // dependencies to control fetching

  const handleFetchingArrival = async () => {
    try {
      const response = await fetch(
        `http://${iplocalhost}:5000/hasArrived?user_id=${user_id}`,
        { method: "GET" }
      );

      const data = await response.json();

      if (response.ok) {
        setHasArrived(data.has_arrived); // Update hasArrived in Zustand
        console.log("hasArrived:", data.has_arrived); // Log for debugging
      } else {
        console.log(data.error + data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasArrived) {
      console.log("User has arrived. Stopping the counter.");
      setStartCount(false); // Stop counting when arrived
      router.push("/OpenBollard");
    }
  }, [hasArrived]); // Handles what to do when hasArrived changes

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View style={st.headerContainer}>
        <Text style={st.headerText}>Entrance</Text>
      </View>

      <View style={st.qrContainer}>
        <View style={{ marginTop: 20, padding: 10 }}>
          <Text style={st.qrText}>Scan this QR code at entrance gate</Text>
        </View>
        <View style={st.qrCodeStyle}>
          <QRCode value={reservation_qr} size={250} />
        </View>
        <View>
          <View style={st.detailContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={st.detailText}>Arrival Time</Text>
              <View>
                <Text
                  style={[
                    st.detailTextBold,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  {selectedTime}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={st.detailText}>Slot</Text>
              <Text style={st.detailTextBold}>{selectedSlot}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EntranceQr;

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
