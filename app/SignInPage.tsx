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
import React from "react";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { router } from "expo-router";

const SignInPage = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const handleSignUp = () => {
    console.log("Sign Up Button Pressed");
    router.replace("./SignUpPage");
  };

  const handleSignIn = () => {
    console.log("Sign In Button Pressed");
    router.replace("./(tabs)/HomePage");
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
              />
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor={"grey"}
                secureTextEntry={true}
                style={st.userInput}
              />
              <Pressable style={st.buttonSignIn} onPress={handleSignIn}>
                <Text style={st.buttonText}>Sign In</Text>
              </Pressable>
              <Pressable onPress={handleSignUp}>
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
    flex: 1, // Fill the entire screen
  },
  innerContainer: {
    flex: 1, // Allow inner container to fill
    flexDirection: "column", // Arrange children vertically
  },
  scrollContainer: {
    flexGrow: 1, // Allow scrolling if inner container overflows
    justifyContent: "space-between", // Space evenly between items
  },
  imageContainer: {
    flex: 3, // Allow image container to take half of the available space
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1, // Allow form container to take half of the available space
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
