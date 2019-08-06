import { PermissionsAndroid } from "react-native";

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "iCare Pontianak",
        message: "iCare Pontianak membutuhkan izin lokasi anda"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log("You can use the location");
    } else {
      //console.log("location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
