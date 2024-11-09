import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import useTestingStore from "@/store/testingStore";
import useUserStore from "@/store/userStore";
import { format, parseISO } from "date-fns";

const ActivityPage = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  const getIconName = (type: string) => {
    switch (type) {
      case "mall": {
        return "bag-outline";
      }
      case "hotel": {
        return "bed-outline";
      }
      case "hospital": {
        return "medkit-outline";
      }
      case "supermarket": {
        return "basket-outline";
      }
      case "bank": {
        return "business-outline";
      }
      default: {
        return "location-outline";
      }
    }
  };

  interface HistoryItem {
    id: number;
    created_at: string;
    places_name: string;
    places_addr: string;
    places_type: string;
  }

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const user_id = useUserStore((state) => state.userInfo.id);

  const formatDate = (date: string) => {
    return format(parseISO(date), "dd MM yyyy");
  };

  if (!fontsLoaded) {
    return null;
  }

  const iplocalhost = useTestingStore((state) => state.iplocalhost);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${iplocalhost}:5000/getHistory?user_id=${user_id}`
        );
        const data = await response.json();
        setHistory(data);
        // format the data.created_at using formatDate function
        const formattedData = data.map((item: { created_at: string }) => ({
          ...item,
          created_at: formatDate(item.created_at),
        }));
        setHistory(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={st.historyCard}>
              <View style={st.firstColumn}>
                <Text style={st.dateText}>{item.created_at}</Text>
                <Ionicons
                  name={getIconName(item.places_type)}
                  size={50}
                  color="black"
                />
              </View>
              <View style={st.secondColumn}>
                <Text style={st.placeNameText}>{item.places_name}</Text>
                <Text style={st.placeAddrText}>{item.places_addr}</Text>
              </View>
            </View>
          )}
        />
    </SafeAreaView>
  );
};

export default ActivityPage;

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyCard: {
    backgroundColor: "#fff",
    padding: 25,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    flexDirection: "row",
  },
  firstColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondColumn: {
    flex: 2,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    marginBottom: 15,
  },
  placeNameText: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
  },
  placeAddrText: {
    fontSize: 15,
    fontFamily: "Nunito-Regular",
  },
});
