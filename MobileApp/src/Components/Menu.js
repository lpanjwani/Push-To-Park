import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MenuButton = () => {
  return (
    <TouchableOpacity style={styles.overlay}>
      <MaterialIcons
        styles={styles.wrapper}
        name="menu"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "7%",
    left: "5%"
  }
});

export default MenuButton;
