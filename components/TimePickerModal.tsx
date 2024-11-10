import { Modal, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { BlurView } from "expo-blur";
import useSelectedTime from "@/store/selectedTimeStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
}) => {
  const { fontsLoaded } = useCustomFonts();
  const setSelectedTime = useSelectedTime((state) => state.setSelectedTime);
  const [date, setDate] = useState(new Date()); // Default to current time

  // Calculate minimum and maximum selectable time
  const currentTime = new Date();
  const minTime = currentTime; // Minimum should be now
  const maxTime = new Date();
  maxTime.setHours(maxTime.getHours() + 4); // Maximum should be 4 hours from now

  const handleConfirm = (pickedDate: Date) => {
    // Check if the selected date is within the allowed range
    if (pickedDate.getTime() < minTime.getTime()) {
      Alert.alert("Invalid Time", "You cannot select a time in the past.");
      onClose();
      return; // Prevent selecting past times
    }

    if (pickedDate.getTime() > maxTime.getTime()) {
      Alert.alert(
        "Invalid Time",
        "You can only select a time within 4 hours from now."
      );
      onClose();
      return; // Prevent selecting times beyond 4 hours
    }

    console.log("A date has been picked: ", pickedDate);
    setSelectedTime(
      pickedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ); // Format the time
    onClose();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="time"
      date={date}
      onConfirm={handleConfirm}
      onCancel={() => {
        onClose();
        setSelectedTime("Select Time");
      }}
    />
  );
};

export default TimePickerModal;

const st = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
