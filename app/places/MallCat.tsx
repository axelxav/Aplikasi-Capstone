import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

const MallCat = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: "Mall",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation]);

  return (
    <View>
      <Text>MallCat</Text>
    </View>
  );
};

export default MallCat;

const styles = StyleSheet.create({});
