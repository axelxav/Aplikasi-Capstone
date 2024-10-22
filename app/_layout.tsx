import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
