import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { router } from "expo-router";

const SignInPage = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const handleSignUp = () => {
    console.log("Sign Up Button Pressed");
    router.push("./SignUpPage");
  };

  const handleSignIn = () => {
    console.log("Sign In Button Pressed");
    router.push("./(tabs)/HomePage");
  };

  return (
    <SafeAreaView style={st.container}>
      <View style={st.imageContainer}>
        <Image
          source={require("../assets/images/loginBg.png")}
          style={st.imageStyle}
        />
      </View>
      <View style={st.formContainer}>
        {/* <Text style={st.headerText}>Please Sign In to Continue</Text> */}
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
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 30,

  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Nunito-Regular",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    color: "#095E69",
    alignSelf: "auto",
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
    alignItems: "center",
    justifyContent: "center",
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
