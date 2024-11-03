// frontend/app/SignInPage.tsx
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { router } from "expo-router";
import useUserStore from "../store/userStore";
import useTestingStore from "@/store/testingStore";

const SignInPage: React.FC = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  const [username, setUsername] = useState<string>(""); // State for username
  const [password, setPassword] = useState<string>(""); // State for password

  const setUserInfo = useUserStore((state) => state.setUserInfo); // Zustand setter

  const iplocalhost = useTestingStore((state) => state.iplocalhost);

  if (!fontsLoaded) {
    return null;
  }

  const handleSignIn = async () => {
    console.log("Sign In Button Pressed");
    try {
      const response = await fetch(`http://${iplocalhost}:5000/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message

        // Save user info to Zustand store
        setUserInfo({
          username: data.username,
          user_email: data.user_email,
          phone_num: data.phone_num,
          license_plate: data.license_plate,
          user_unique: data.user_unique,
        });

        router.replace("./(tabs)/HomePage"); // Navigate to HomePage
      } else {
        alert(`Error: ${data.message}`); // Show error message
      }
    } catch (error) {
      alert("An error occurred while signing in");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <View style={st.innerContainer}>
          <ScrollView
            contentContainerStyle={st.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={st.imageContainer}>
              <Image
                source={require("../assets/images/loginBg.png")}
                style={st.imageStyle}
              />
            </View>
            <View style={st.formContainer}>
              <TextInput
                placeholder="Enter your Username"
                placeholderTextColor={"grey"}
                style={st.userInput}
                value={username}
                onChangeText={setUsername} // Update username state
              />
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor={"grey"}
                secureTextEntry={true}
                style={st.userInput}
                value={password}
                onChangeText={setPassword} // Update password state
              />
              <Pressable style={st.buttonSignIn} onPress={handleSignIn}>
                <Text style={st.buttonText}>Sign In</Text>
              </Pressable>
              <Pressable onPress={() => router.replace("./SignUpPage")}>
                <Text style={st.signupText}>
                  Don't have an account?{" "}
                  <Text style={st.signupButton}> Sign Up!</Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  userInput: {
    width: "80%",
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingLeft: 25,
    margin: 10,
    fontFamily: "Nunito-Regular",
    fontSize: 17,
  },
  buttonSignIn: {
    width: "80%",
    height: 50,
    backgroundColor: "#095E69",
    borderRadius: 10,
    padding: 10,
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 17,
  },
  signupText: {
    fontFamily: "Nunito-Regular",
  },
  signupButton: {
    fontFamily: "Nunito-Bold",
    textDecorationLine: "underline",
  },
});

export default SignInPage;
