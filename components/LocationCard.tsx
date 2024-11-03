import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { useState, useEffect } from "react";
import useTestingStore from "@/store/testingStore";
import { router } from "expo-router";
import usePlaceStore from "@/store/placeStore";

interface LocationCardProps {
  type?: string;
  address: string;
}

interface Places {
  id: number;
  places_name: string;
  places_addr: string;
  places_type: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ type, address }) => {
  const [places, setPlaces] = useState<Places[]>([]);
  const [loading, setLoading] = useState(true);
  const { fontsLoaded } = useCustomFonts();
  const [error, setError] = useState("");
  const iplocalhost = useTestingStore((state) => state.iplocalhost);
  const setPlaceName = usePlaceStore((state)=>state.setPlaceName)

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        `http://${iplocalhost}:5000/getPlaces?places_type=${
          type || ""
        }&places_addr=${address || ""}`
      );
      const data = await response.json();
      setPlaces(data);
    } catch {
      setError("failed to fetch data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [type, address]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const handleReserve = (placeName: string) => {
    router.push("/ReservationPage");
    setPlaceName(placeName)
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleReserve(item.places_name)}>
          <SafeAreaView style={st.locationBox}>
            <View style={st.placeImageContainer}>
              <Image
                source={require("@/assets/images/buildillustration.jpg")}
                style={st.imageStyle}
              />
            </View>
            <View style={st.placeInfoContainer}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={st.placeName}
                >
                  {item.places_name}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={st.placeAddr}
                >
                  {item.places_addr}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </Pressable>
      )}
      numColumns={2} // Set number of columns to 2
      columnWrapperStyle={st.columnWrapper} // Add styling for spacing between columns
      contentContainerStyle={st.contentContainer}
      ListFooterComponent={<View style={{ height: 200 }} />}
    />
  );
};

export default LocationCard;

const st = StyleSheet.create({
  locationBox: {
    // card style
    backgroundColor: "#D9FAFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 170,
    height: 250,
    alignItems: "center",
    marginBottom: 25,
  },
  imageStyle: {
    width: 170,
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  placeName: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
  placeAddr: {
    fontFamily: "Nunito-Regular",
    fontSize: 13,
  },
  placeImageContainer: {
    flex: 3,
  },
  placeInfoContainer: {
    flex: 2,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  columnWrapper: {
    justifyContent: "space-between", // Space between columns
    paddingHorizontal: 5, // Optional horizontal padding
  },
  contentContainer: {},
});
