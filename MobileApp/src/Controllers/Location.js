import * as LocationController from "expo-location";
import * as Permissions from "expo-permissions";

const GetUserLocation = async () => {
	let { status } = await Permissions.askAsync(Permissions.LOCATION);
	let location = await LocationController.getCurrentPositionAsync({});
	return location;
};

export default GetUserLocation;
