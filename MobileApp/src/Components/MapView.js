import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import GetUserLocation from "./../Controllers/Location";
import NotificationsPermissions from "./../Controllers/Notifications";
import MenuButton from "./Menu";
import Information from "./Information";

export default class Map extends Component {
  state = {
    location: null,
    errorMessage: null,
    initialRegion: {
      latitude: 25.1034,
      longitude: 55.1643,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  componentDidMount() {
    this._UserLocation();
    NotificationsPermissions();
  }

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
    const parkingZones = [
      {
        key: 1,
        latitude: 25.1034,
        longitude: 55.1643,
        radius: 800
      },
      {
        key: 2,
        latitude: 25.2894,
        longitude: 55.3811,
        radius: 980
      }
    ];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={this.state.region}
          customMapStyle={require("./../../assets/mapStyle.json")}
        >
          {this.state.location ? (
            <Marker coordinate={this.state.location}>
              <View style={{}}>
                <Image
                  source={require("./../../assets/images/UserPin.gif")}
                  style={{ flex: 1, width: 80, height: 80 }}
                />
              </View>
            </Marker>
          ) : null}
          {parkingZones.map(zone => (
            <Circle
              key={zone.key}
              center={{ latitude: zone.latitude, longitude: zone.longitude }}
              radius={zone.radius}
              strokeWidth={1}
              fillColor={"rgba(51,153,255,0.2)"}
            ></Circle>
          ))}
        </MapView>
        <MenuButton />
        <Information />
      </View>
    );
  }
}

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#fff",
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
