import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { router, useNavigation } from "expo-router";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { useEffect } from "react";
import ConfirmationModal from "@/components/ConfirmationModal"; // Import the modal component

const EditPage = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Profile",
      headerStyle: { backgroundColor: "#76ECFC" },
    });
  }, [navigation]);

  const handleCancelButton = () => {
    setModalVisible(true); // Show the modal when cancel is pressed
  };

  const confirmCancel = () => {
    console.log("Cancel Confirmed");
    setModalVisible(false); // Hide the modal
    router.replace("../UserPage"); // Navigate away
  };

  const dismissModal = () => {
    setModalVisible(false); // Hide the modal if canceled
  };

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={st.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={st.headerContainer}>
            <View style={{ flexDirection: "column" }}>
              <Text style={st.headerText}>Edit your</Text>
              <Text style={st.headerText}>Profile</Text>
            </View>
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
            <Pressable style={st.buttonConfirm}>
              <Text style={st.buttonText}>Confirm Edit</Text>
            </Pressable>
            <Pressable style={st.buttonCancel} onPress={handleCancelButton}>
              <Text style={st.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ConfirmationModal
        visible={isModalVisible} // Show the modal based on state
        onClose={dismissModal} // Close the modal
        onConfirm={confirmCancel} // Handle confirm action
      />
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
  },
  scrollContainer: {
    flexGrow: 1, // Allow the scroll view to grow
    justifyContent: "space-between", // Space out the header and form evenly
  },
  headerContainer: {
    flex: 1, // Allow header to take half of the available space
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  formContainer: {
    flex: 1, // Allow form container to take the other half
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  imageStyle: {
    width: 70,
    height: 70,
    left: 20,
    borderRadius: 35,
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
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
  buttonConfirm: {
    width: "100%",
    height: 50,
    backgroundColor: "#095E69",
    borderRadius: 10,
    padding: 10,
    marginTop: 25,
    marginBottom: 10,
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
  buttonCancel: {
    width: "100%",
    height: 50,
    backgroundColor: "#E24A4A",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditPage;
