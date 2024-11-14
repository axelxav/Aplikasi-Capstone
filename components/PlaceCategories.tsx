import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

const PlaceCategories = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const handleMallCat = () => {
    router.push("/places/MallCat");
  };

  const handleHotelCat = () => {
    router.push("/places/HotelCat");
  };

  const handleHospitalCat = () => {
    router.push("/places/HospitalCat");
  };

  const handleSupermarketCat = () => {
    router.push("/places/SupermarketCat");
  }

  return (
    <View style={st.container} onLayout={onLayoutRootView}>
      <View style={st.headerContainer}>
        <Text style={st.headerText}>Place by Categories</Text>
      </View>
      {/* category column */}
      <View style={st.categories}>
        <View style={st.columnStyle}>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon} onPress={handleMallCat}>
              <Ionicons name="bag-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Mall</Text>
          </View>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon} onPress={handleSupermarketCat}>
              <Ionicons name="basket-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Supermarket</Text>
          </View>
        </View>
        <View style={st.columnStyle}>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon} onPress={handleHotelCat}>
              <Ionicons name="bed-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Hotel</Text>
          </View>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon}>
              <Ionicons name="business-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Bank</Text>
          </View>
        </View>
        <View style={st.columnStyle}>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon} onPress={handleHospitalCat}>
              <Ionicons name="medkit-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Hospital</Text>
          </View>
          <View style={st.singleCategory}>
            <Pressable style={st.buttonIcon}>
              <Ionicons name="apps-outline" size={35} color="black" />
            </Pressable>
            <Text style={st.bodyText}>Other</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlaceCategories;

const st = StyleSheet.create({
  container: {
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
    padding: 15,
    margin: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  bodyText: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  categories: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 10,
    alignItems: "center",
  },
  buttonIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#C7F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  singleCategory: {
    alignItems: "center",
    marginBottom: 35,
    marginHorizontal: 15,
  },
});
