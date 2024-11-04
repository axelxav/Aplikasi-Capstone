import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import usePlaceStore from "@/store/placeStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomFonts } from "@/hooks/useCustomFonts";

const ReservationPage = () => {
  const placeName = usePlaceStore((state) => state.placeName);
  const navigation = useNavigation();
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

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
      <View style={st.legendContainer}>
        {/* legend components */}
        <View style={st.legendBoxes}>
          <View style={st.availableBox} />
          <Text style={st.legendText}>Available</Text>
        </View>
        <View style={st.legendBoxes}>
          <View style={st.reservedBox} />
          <Text style={st.legendText}>Reserved</Text>
        </View>
        <View style={st.legendBoxes}>
          <View style={st.selectedBox} />
          <Text style={st.legendText}>Selected</Text>
        </View>
      </View>
      <View style={st.mapContainer}>
        {/* Map component */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: 50,
          }}
        >
          <Text style={st.textMapStyle}>Building</Text>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#505050",
                width: 50,
                height: 10,
                borderRadius: 5,
              }}
            />
            <Text style={st.textMapStyle}>Exit</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={st.columnStyle}>
            <Pressable
              style={[st.availableBox, { marginBottom: 30 }]}
            ></Pressable>
            <Pressable
              style={[st.availableBox, { marginBottom: 30 }]}
            ></Pressable>
            <Pressable
              style={[st.availableBox, { marginBottom: 30 }]}
            ></Pressable>
          </View>
          <View style={st.columnStyle}>
            <Pressable
              style={[st.availableBox, { marginBottom: 30 }]}
            ></Pressable>
            <Pressable
              style={[st.availableBox, { marginBottom: 30 }]}
            ></Pressable>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <View
            style={{
              backgroundColor: "#505050",
              width: "80%",
              height: 10,
              borderRadius: 5,
            }}
          />
          <Text style={st.textMapStyle}>Entrance</Text>
        </View>
      </View>
      <View style={st.confirmationContainer}>
        <View style={st.detailContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={st.detailText}>Arrival Time</Text>
            <Pressable>
              <Text style={[st.detailTextBold, {textDecorationLine: "underline"}]}>Select Time</Text>
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={st.detailText}>Selected Slot</Text>
            <Text style={st.detailTextBold}>A1</Text>
          </View>
        </View>
        <Pressable style={st.reserveButton}>
          <Text style={st.reserveText}>Reserve</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ReservationPage;

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  legendContainer: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    padding: 10,
  },
  legendBoxes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    marginLeft: 5,
  },
  availableBox: {
    width: 50,
    height: 30,
    backgroundColor: "#110F52",
    borderRadius: 5,
  },
  reservedBox: {
    width: 50,
    height: 30,
    backgroundColor: "#505050",
    borderRadius: 5,
  },
  selectedBox: {
    width: 50,
    height: 30,
    backgroundColor: "#76ECFC",
    borderRadius: 5,
  },
  mapContainer: {
    flex: 1,
    marginTop: "40%",
    padding: 10,
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 10,
    alignItems: "center",
  },
  textMapStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  confirmationContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  reserveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#095E69",
    justifyContent: "center",
    alignItems: "center",
  },
  reserveText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "white",
  },
  detailContainer: {
    flexDirection: "row",
    backgroundColor: "#C7F8FF",
    paddingVertical: 20,
    paddingHorizontal: 50,
    justifyContent: "space-between",
  },
  detailText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
  },
  detailTextBold: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  }
});
