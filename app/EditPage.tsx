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
import ConfirmationModal from "@/components/ConfirmationModal";
import useUserStore from "@/store/userStore";
import useOtsStore from "@/store/otsStore";
import useTestingStore from "@/store/testingStore";

const EditPage = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const navigation = useNavigation();

  const user_id = useUserStore((state) => state.userInfo.id);
  const username = useUserStore((state) => state.userInfo.username);
  const password = useUserStore((state) => state.userInfo.password);
  const email = useUserStore((state) => state.userInfo.user_email);
  const phone_num = useUserStore((state) => state.userInfo.phone_num);
  const license_plate = useUserStore((state) => state.userInfo.license_plate);
  const iplocalhost = useTestingStore((state) => state.iplocalhost);

  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const setValidationCount = useOtsStore((state) => state.setValidationCount);

  const [isModalVisible, setModalVisible] = useState(false);

  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPhoneNum, setNewPhoneNum] = useState<string>("");
  const [newLicensePlate, setNewLicensePlate] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
    setValidationCount(true);
    setModalVisible(true); // Show the modal when cancel is pressed
  };

  const confirmCancel = () => {
    console.log("Cancel Confirmed");
    setValidationCount(true);
    setModalVisible(false); // Hide the modal
    router.replace("../UserPage"); // Navigate away
  };

  const dismissModal = () => {
    setModalVisible(false); // Hide the modal if canceled
  };

  const handleConfirmButton = async () => {
    console.log(
      newUsername,
      newPassword,
      newEmail,
      newPhoneNum,
      newLicensePlate
    );

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      setNewPassword("");
      return;
    }

    if (newPhoneNum.length > 0) {
      if (!newPhoneNum.startsWith("62")) {
        alert("Phone number must start with '62'");
        setNewPhoneNum("");
        return;
      }
    }

    try {
      const response = await fetch(`http://${iplocalhost}:5000/editProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          newUsername,
          newPassword,
          newEmail,
          newPhoneNum,
          newLicensePlate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User profile edited successfully!");
        if (newUsername.length > 0) {
          setUserInfo({
            ...useUserStore.getState().userInfo,
            username: newUsername,
          });
        }
        if (newPassword.length > 0) {
          setUserInfo({
            ...useUserStore.getState().userInfo,
            password: newPassword,
          });
        }
        if (newEmail.length > 0) {
          setUserInfo({
            ...useUserStore.getState().userInfo,
            user_email: newEmail,
          });
        }
        if (newPhoneNum.length > 0) {
          setUserInfo({
            ...useUserStore.getState().userInfo,
            phone_num: newPhoneNum,
          });
        }
        if (newLicensePlate.length > 0) {
          setUserInfo({
            ...useUserStore.getState().userInfo,
            license_plate: newLicensePlate,
          });
        }

        setValidationCount(true);
        router.replace("../UserPage");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
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
            <TextInput
              style={st.userInput}
              placeholder={username}
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <Text style={st.textStyle}>Password</Text>
            <TextInput
              style={st.userInput}
              secureTextEntry
              placeholder={password}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Text style={st.textStyle}>Confirm Password</Text>
            <TextInput
              style={st.userInput}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Text style={st.textStyle}>Email</Text>
            <TextInput
              style={st.userInput}
              placeholder={email}
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <Text style={st.textStyle}>Phone Number</Text>
            <TextInput
              style={st.userInput}
              keyboardType="phone-pad"
              placeholder={phone_num}
              value={newPhoneNum}
              onChangeText={setNewPhoneNum}
            />
            <Text style={st.textStyle}>License Plate</Text>
            <TextInput
              style={st.userInput}
              placeholder={license_plate}
              value={newLicensePlate}
              onChangeText={setNewLicensePlate}
            />
            <Pressable style={st.buttonConfirm} onPress={handleConfirmButton}>
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
