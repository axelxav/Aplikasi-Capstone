import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { router } from "expo-router";

const SignUpPage = () => {
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

  const handleSignIn = () => {
    console.log("Sign In Button Pressed");
    router.push("./SignInPage");
  };

  return (
    <SafeAreaView style={st.container}>
      <View style={st.headerContainer}>
        <Text style={st.headerText}>Create an Account</Text>
        <Image
          source={require("../assets/images/account.png")}
          style={st.imageStyle}
        />
      </View>
      <View style={st.formContainer}>
        <Text style={st.textStyle}>Username</Text>
        <TextInput style={st.userInput} />
        <Text style={st.textStyle}>Password</Text>
        <TextInput style={st.userInput} />
        <Text style={st.textStyle}>Confirm Password</Text>
        <TextInput style={st.userInput} />
        <Text style={st.textStyle}>Phone Number</Text>
        <TextInput style={st.userInput} />
        <Text style={st.textStyle}>License Plate</Text>
        <TextInput style={st.userInput} />
        <Pressable style={st.buttonSignUp}>
          <Text style={st.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={handleSignIn}>
          <Text style={st.signinText}>
            Already have an account?{" "}
            <Text style={st.signinButton}> Sign in!</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginLeft: 50,
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 28,
  },
  textStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    alignSelf: "flex-start",
  },
  userInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingLeft: 25,
    marginTop: 1,
    marginBottom: 10,
    fontFamily: "Nunito-Regular",
    fontSize: 17,
  },
  buttonSignUp: {
    width: "100%",
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
  signinText: {
    fontFamily: "Nunito-Regular",
  },
  signinButton: {
    fontFamily: "Nunito-Bold",
    textDecorationLine: "underline",
  },
});

export default SignUpPage;
