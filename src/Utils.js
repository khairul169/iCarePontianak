import moment from "moment";
import "moment/locale/id";
import { Service } from "./Consts";

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

export const getRoleName = role => {
  const roles = [
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

  return roles[role] || null;
};
