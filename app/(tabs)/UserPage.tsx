// app/(tabs)/UserPage.tsx

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import QrCodeModal from "@/components/QrCodeModal";
import useUserStore from "@/store/userStore";
import useOtsStore from "@/store/otsStore";

const UserPage: React.FC = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [isModalVisible, setModalVisible] = useState(false);

  const username = useUserStore((state) => state.userInfo.username);
  const user_email = useUserStore((state) => state.userInfo.user_email);
  const phone_num = useUserStore((state) => state.userInfo.phone_num);
  const setValidationCount = useOtsStore((state) => state.setValidationCount);

  if (!fontsLoaded) {
    return null;
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSignOut = () => {
    console.log("Sign Out Button Pressed");
    setValidationCount(false);
    router.replace("../SignInPage");
  };

  const handleActivity = () => {
    router.push("../ActivityPage");
  };

  const handleEditProfile = () => {
    router.push("../EditPage");
  };

  return (
    <SafeAreaView style={st.container} onLayout={onLayoutRootView}>
      <View style={st.headerContainer}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/account.png")}
            style={st.profileImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={st.userName}>{username}</Text>
          <Text style={st.userDetail}>{user_email}</Text>
          <Text style={st.userDetail}>{phone_num}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Pressable style={st.qrButton} onPress={handleOpenModal}>
            <Image
              source={require("../../assets/images/userQr.png")}
              style={st.imageStyle}
            />
          </Pressable>
        </View>
      </View>
      <View style={st.bodyContainer}>
        <Pressable style={st.bodyButton} onPress={handleEditProfile}>
          <Text style={st.bodyText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={st.bodyButton} onPress={handleActivity}>
          <Text style={st.bodyText}>Activity</Text>
        </Pressable>
        <Pressable style={st.bodyButtonSignOut} onPress={handleSignOut}>
          <Text style={st.bodyText}>Sign Out</Text>
        </Pressable>
      </View>
      <QrCodeModal visible={isModalVisible} onClose={handleCloseModal} />
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
    padding: 10,
  },
  userName: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
  },
  userDetail: {
    fontFamily: "Nunito-Regular",
    fontSize: 12,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 70,
    height: 70,
    // circle style
    borderRadius: 35,
  },
  qrButton: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bodyContainer: {
    flex: 3,
    flexDirection: "column",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "white",
  },
  bodyButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#32A4A4",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyButtonSignOut: {
    width: "100%",
    height: 50,
    backgroundColor: "#E24A4A",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 25,
  },
});

export default UserPage;
