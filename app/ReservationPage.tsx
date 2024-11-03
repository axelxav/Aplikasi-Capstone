import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import usePlaceStore from '@/store/placeStore';

const ReservationPage = () => {
  const placeName = usePlaceStore((state) => (state.placeName))
  const navigation = useNavigation();

  useEffect(() => {
    // Set custom header title
    navigation.setOptions({
      title: placeName + " Reservation",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation]);

  return (
    <View>
      <Text>ReservationPage</Text>
    </View>
  )
}

export default ReservationPage

const styles = StyleSheet.create({})