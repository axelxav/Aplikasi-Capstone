import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const RootLayout = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignInPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpPage"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
