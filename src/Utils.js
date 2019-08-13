import moment from "moment";
import "moment/locale/id";
import { Service } from "./Consts";
import { PermissionsAndroid } from "react-native";

export const getTimeString = time => {
  moment.locale("id");
  return moment(time).format("DD MMMM YYYY HH.mm");
};

export const getServiceName = id => {
  switch (parseInt(id, 10)) {
    case Service.EMERGENCY:
      return "Gawat Darurat";
    case Service.MEDICALVISIT:
      return "Kunjungan Medis";
    case Service.LABMEDIK:
      return "Lab Medik";
    case Service.GIGI:
      return "Kesehatan Gigi";
    case Service.BIDAN:
      return "Bidan Terampil";
    case Service.LANSIA:
      return "Lansia";
    case Service.SANITASI:
      return "Sanitasi";
    case Service.NUTRISI:
      return "Diet Nutrisi";
    default:
      return "undefined";
  }
};

export const getUserType = type => {
  const userTypes = [
    "",
    "Klien",
    "Ners",
    "Analis Kesehatan",
    "Perawat Gigi",
    "Bidan",
    "Perawat Lansia",
    "Kesehatan Lingkungan",
    "Nutrisionis"
  ];

  return userTypes[type] || null;
};

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
