import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import SearchHeader from "@/components/SearchHeader";
import LocationOpt from "@/components/LocationOpt";
import OtsCode from "@/components/OtsCode";
import PlaceCategories from "@/components/PlaceCategories";
import useOtsStore from "@/store/otsStore";
import useUserStore from "@/store/userStore";
import useSelectedSlot from "@/store/selectedSlotStore";
import useSelectedTime from "@/store/selectedTimeStore";
import usePlaceStore from "@/store/placeStore";
import { router } from "expo-router";
import useTestingStore from "@/store/testingStore";
import useReservationStore from "@/store/reservationStore";

const HomePage = () => {
  const validationCount = useOtsStore((state) => state.validationCount);
  const setValidationCount = useOtsStore((state) => state.setValidationCount);
  const user_id = useUserStore((state) => state.userInfo.id);
  const setSelectedSlot = useSelectedSlot((state) => state.setSelectedSlot);
  const setSelectedTime = useSelectedTime((state) => state.setSelectedTime);
  const setPlaceName = usePlaceStore((state) => state.setPlaceName);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const setReservationQr = useReservationStore(
    (state) => state.setReservationQR
  );

  let errorFetching = "";

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (validationCount) {
      interval = setInterval(() => {
        fetchingOtsStatus();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [validationCount]);

  const fetchingOtsStatus = async () => {
    try {
      const response = await fetch(
        `http://${iplocalhost}:5000/scanSensorData?user_id=${user_id}`,
        { method: "GET" }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.fetched_user_id === user_id) {
          console.log("User ID matched");
          setPlaceName("OTS");
          setSelectedSlot(data.slotAssigned);
          setSelectedTime("OTS");
          setReservationQr(data.slotAssignedQr);
          setValidationCount(false);
          router.push("/OpenBollard");
        }
      } else {
        errorFetching = data.error;
        console.log("error in fetching ots data: ", data.message);
      }
    } catch (errorFetching) {
      console.log(errorFetching);
    }
  };

  return (
    <SafeAreaView style={st.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : "padding"} // Use 'height' for Android
      >
        <ScrollView
          contentContainerStyle={st.scrollContainer}
          keyboardShouldPersistTaps="handled" // Keep keyboard open on tap
          showsVerticalScrollIndicator={false} // Hide scroll indicator
        >
          <View style={st.headerContainer}>
            <SearchHeader />
            <LocationOpt />
          </View>
          <View style={st.bodyContainer}>
            <OtsCode />
          </View>
          <View style={st.catContainer}>
            <PlaceCategories />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1, // Fill the entire screen
  },
  scrollContainer: {
    flexGrow: 1, // Allow scroll view to expand
    justifyContent: "flex-start", // Align items to the start
  },
  headerContainer: {
    flexGrow: 0, // Do not grow, stay fixed
    height: 150, // Fixed height for header
  },
  bodyContainer: {
    flexGrow: 0, // Do not grow, stay fixed
    height: 150, // Fixed height for body
  },
  catContainer: {
    flexGrow: 1, // Allow categories container to grow
    paddingBottom: 20, // Optional padding at the bottom
  },
});

export default HomePage;
