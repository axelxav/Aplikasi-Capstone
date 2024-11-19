import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
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
import CountdownTimer from "@/components/CountdownTimer";
import useOtsStore from "@/store/otsStore";

const EntranceQr = () => {
  const navigation = useNavigation();
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const placeName = usePlaceStore((state) => state.placeName);
  const selectedSlot = useSelectedSlot((state) => state.selectedSlot);
  const selectedTime = useSelectedTime((state) => state.selectedTime);
  const reservation_qr = useReservationStore((state) => state.reservation_qr);
  const startCount = useReservationStore((state) => state.startCount);
  const setStartCount = useReservationStore((state) => state.setStartCount);
  const hasArrived = useReservationStore((state) => state.hasArrived);
  const setHasArrived = useReservationStore((state) => state.setHasArrived);
  const user_id = useUserStore((state) => state.userInfo.id);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const setValidationCount = useOtsStore((state) => state.setValidationCount);

  const [countdown, setCountdown] = React.useState(0);
  const [startSecondCount, setStartSecondCount] = React.useState(false);

  // change the header title
  useEffect(() => {
    navigation.setOptions({
      title: `${placeName} Reservation`,
      headerStyle: { backgroundColor: "#76ECFC" },
    });

    // Find the difference between selectedTime and current time
    const [selectedHour, selectedMinute] = selectedTime.split(".").map(Number);

    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    // Convert selected and current time to minutes for easy difference calculation
    const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    let difference = (selectedTimeInMinutes - currentTimeInMinutes) * 60;

    setCountdown(difference);

    console.log(
      "selectedHour:",
      selectedHour,
      "selectedMinute:",
      selectedMinute,
      "currentHour:",
      currentHour,
      "currentMinute:",
      currentMinute,
      "difference:",
      difference,
      "selected time:",
      selectedTime
    );
  }, [navigation, placeName, selectedTime]);

  // Fetch hasArrived every 2 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startCount && !hasArrived) {
      interval = setInterval(() => {
        handleFetchingArrival();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [startCount, hasArrived]); // dependencies to control fetching

  // Redirect to OpenBollard when hasArrived is true
  useEffect(() => {
    if (hasArrived) {
      console.log("User has arrived. Stopping the counter.");
      setStartCount(false); // Stop counting when arrived
      router.push("/OpenBollard");
    }
  }, [hasArrived]);

  // Handles what to do when hasArrived changes
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

  if (!fontsLoaded) {
    return null;
  }

  const alertFirstCountdown = () => {
    // show modal for alert when user is late using Modal
    setStartSecondCount(!startSecondCount);
  };

  const alertSecondCountdown = async () => {
    Alert.alert("You are late!", "your reservation has been canceled");

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
        setValidationCount(true);
        console.log("Reservation canceled!");
        router.replace("/HomePage");
      } else {
        console.log(data.error + data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <View style={st.counter}>
        <View>
          <Text>Time to Arrival</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              opacity: startSecondCount ? 0.1 : 1,
            }}
          >
            <CountdownTimer
              duration={countdown}
              isPlaying={true}
              onComplete={alertFirstCountdown}
            />
          </View>
        </View>
        <View>
          <Text>Late Tolerance</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              opacity: startSecondCount ? 1 : 0.1,
            }}
          >
            <CountdownTimer
              duration={10}
              isPlaying={startSecondCount}
              onComplete={alertSecondCountdown}
            />
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
    marginBottom: 10,
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
  counter: {
    // card style
    backgroundColor: "white",
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
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    flexDirection: "row",
  },
});
