import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import usePlaceStore from "@/store/placeStore";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import { useNavigation } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import useReservationStore from "@/store/reservationStore";

const EntranceQr = () => {
  const navigation = useNavigation();
  const placeName = usePlaceStore((state) => state.placeName);
  const selectedSlot = useSelectedSlot((state) => state.selectedSlot);
  const selectedTime = useSelectedTime((state) => state.selectedTime);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const reservation_qr = useReservationStore((state) => state.reservation_qr);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: placeName + " Reservation",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View style={st.headerContainer}>
        <Text style={st.headerText}>Entrance</Text>
      </View>

      <View style={st.qrContainer}>
        <View style={{marginTop: 20, padding: 10}}>
          <Text style={st.qrText}>Scan this qr code at entrance gate</Text>
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
    // card style
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
    bottom: 0,
    left: 0,
    right: 0,
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
