import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

const ParkingInformation = props => {
	const isParkingValid = props.currentParking;
	return (
		<View style={{ ...styles.overlay, backgroundColor: isParkingValid?.isValid ? "green" : "red" }}>
			<View style={styles.UserAvatarSection}>
				<Image
					source={{
						uri: "https://instagram.ffjr1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/65520643_389908201659602_214104587857035264_n.jpg?_nc_ht=instagram.ffjr1-1.fna.fbcdn.net&oh=5bfe9aad1a41aa7eb147058af3d34bc4&oe=5E7CB634"
					}}
					style={styles.UserAvatarImage}></Image>
			</View>
			<View style={styles.UserProfile}>
				<Text style={styles.UserProfileName}>Welcome Lavesh</Text>
				{isParkingValid?.isValid ? <Text style={styles.ParkingCountdown}>00:{isParkingValid.ticket.remainingTime}</Text> : <Text style={styles.ParkingCountdown}>00:00</Text>}
			</View>
		</View>
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
		borderRadius: 25,
		flexDirection: "row"
	},
	UserAvatarSection: {
		width: "35%",
		height: "100%",
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25
	},
	UserAvatarImage: {
		width: "100%",
		height: "100%",
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25
	},
	UserProfile: {
		width: "60%",
		justifyContent: "center",
		alignItems: "center"
	},
	UserProfileName: {
		color: "white"
	},
	ParkingCountdown: {
		color: "white",
		fontSize: 60
	}
});

export default ParkingInformation;
