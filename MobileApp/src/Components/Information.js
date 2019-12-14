import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import { ParkingValid } from "../Controllers/Backend";

const isParkingValid = ParkingValid();
const ParkingInformation = () => {
  return (
    <TouchableOpacity style={styles.overlay}>
      <View styles={styles.UserAvatarSection}>
        <Image
          source={{
            uri:
              "https://instagram.ffjr1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/65520643_389908201659602_214104587857035264_n.jpg?_nc_ht=instagram.ffjr1-1.fna.fbcdn.net&oh=5bfe9aad1a41aa7eb147058af3d34bc4&oe=5E7CB634"
          }}
          style={{
            width: "35%",
            height: "100%",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25
          }}
        ></Image>
      </View>
      <View style={styles.UserProfile}>
        <Text>Lavesh Panjwani</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: "7%",
    left: 0,
    height: "20%",
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    backgroundColor: isParkingValid ? "green" : "red",
    borderRadius: 25
  },
  UserAvatarSection: {
    width: "40%"
  },
  UserProfile: {
    width: "80%"
  }
});

export default ParkingInformation;
