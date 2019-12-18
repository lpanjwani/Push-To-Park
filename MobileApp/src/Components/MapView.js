import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import GetUserLocation from "./../Controllers/Location";
import NotificationsPermissions from "./../Controllers/Notifications";
import MenuButton from "./Menu";
import Information from "./Information";
import { ZoneLocations, ParkingisValid } from "../Controllers/Backend";

export default class Map extends Component {
	state = {
		location: null,
		errorMessage: null,
		region: {
			latitude: 25.1034,
			longitude: 55.1643,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		},
		currentParking: null,
		Zones: [
			{
				key: 1,
				location: {
					coordinates: [25.1034, 55.1643],
					radius: 800
				}
			}
		]
	};

	componentDidMount() {
		this._UserLocation();
		NotificationsPermissions();
		this.BackendZoneLocations();
		this.CurrentParking();
	}

	CurrentParking = async () => {
		const response = await ParkingisValid();
		this.setState({
			currentParking: response
		});
	};

	BackendZoneLocations = async () => {
		const res = await ZoneLocations();
		this.setState({
			Zones: res
		});
	};

	_UserLocation = async () => {
		const location = await GetUserLocation();
		this.setState({
			location: location.coords,
			region: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		});
	};

	render() {
		const { region, Zones, currentParking } = this.state;
		return (
			<View style={styles.container}>
				<MapView style={styles.mapStyle} initialRegion={region} region={region} customMapStyle={require("./../../assets/mapStyle.json")} showsUserLocation={true} followsUserLocation={true} showsCompass={false} cacheEnable={true}>
					{this.state.location ? (
						<Marker coordinate={this.state.location}>
							<View style={{}}>
								<Image source={require("./../../assets/images/UserPin.gif")} style={{ flex: 1, width: 80, height: 80 }} />
							</View>
						</Marker>
					) : null}
					{Zones.map((zone, index) => (
						<Circle key={index} center={{ latitude: zone.location.coordinates[0], longitude: zone.location.coordinates[1] }} radius={zone.location.radius} strokeWidth={1} fillColor={"rgba(51,153,255,0.2)"}></Circle>
					))}
				</MapView>
				<MenuButton />
				<Information currentParking={currentParking} />
			</View>
		);
	}
}

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mapStyle: {
		width: windowSize.width,
		height: windowSize.height
	}
});

async function _GetUserLocation() {
	let { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status !== "granted") {
		this.setState({
			errorMessage: "Permission to access location was denied"
		});
	}

	let location = await LocationController.getCurrentPositionAsync({});
	return location;
}
