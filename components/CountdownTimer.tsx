import { useCustomFonts } from "@/hooks/useCustomFonts";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const CountdownTimer = (props: { duration: number, isPlaying: boolean, onComplete: () => void }) => {
  const { duration, isPlaying, onComplete } = props; // Duration in seconds, e.g., 2 minutes
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#A30000', '#F7B801']}
        colorsTime={[40, 20, 0]}
        onComplete={onComplete}
        size={100}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <Text style={styles.text}>
              {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
            </Text>
          );
        }}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "black",
    fontFamily: "Nunito-Bold",
  },
});

export default CountdownTimer;
