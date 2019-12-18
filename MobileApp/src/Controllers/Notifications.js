import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { BackendURL, userID } from "./Backend";

const NotificationsPermissions = async () => {
	const { status: existingStatus } = await Permissions.getAsync(
	  Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;
	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== "granted") {
	  // Android remote notification permissions are granted during the app
	  // install, so this will only ask on iOS
	  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	  finalStatus = status;
	}
	// Stop here if the user did not grant permissions
	if (finalStatus !== "granted") {
	  alert("Not Granted");
	  return;
	}
	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();
	const server = await fetch(`${BackendURL}/user/${userID}/push/update`, {
	  method: "POST",
	  headers: {
	    Accept: "application/json",
	    "Content-Type": "application/json"
	  },
	  body: JSON.stringify({
	    token: token
	  })
	})
	  .then(response => response.json())
	  .then(responseJson => {
	    return responseJson.movies;
	  })
	  .catch(error => {
	    console.error(error);
	  });
	// const response = await server.json();
	// console.log(response);
	return token;
};

export default NotificationsPermissions;
