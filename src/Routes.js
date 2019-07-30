import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import BottomTab from "./Components/BottomTab";
import { fromRight } from "react-navigation-transitions";

// Routes
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Beranda from "./Screens/Beranda";
import Notifikasi from "./Screens/Notifikasi";
import Layanan from "./Screens/Layanan";
import Akun from "./Screens/Akun";
import Gadar from "./Screens/Gadar";
import CariAmbulan from "./Screens/CariAmbulan";
import BuatLayanan from "./Screens/BuatLayanan";
import KonfirmasiLayanan from "./Screens/KonfirmasiLayanan";
import PilihLokasi from "./Screens/PilihLokasi";
import PanggilBantuan from "./Screens/PanggilBantuan";
import LihatLokasi from "./Screens/LihatLokasi";
import PengaturanAkun from "./Screens/PengaturanAkun";

// Tabbar icons
const routeIcons = {
  Beranda: "home-plus",
  Notifikasi: "bell-circle",
  Layanan: "radio",
  Akun: "account-circle"
};

// Beranda navigator
const mainNavigator = createMaterialTopTabNavigator(
  {
    Beranda,
    Notifikasi,
    Layanan,
    Akun
  },
  {
    initialRouteName: "Beranda",
    tabBarPosition: "bottom",
    tabBarComponent: props => <BottomTab {...props} icons={routeIcons} />
  }
);

// Main stacks
const mainStack = createStackNavigator(
  {
    Main: mainNavigator,

    // Beranda
    Gadar,
    CariAmbulan,
    BuatLayanan,
    KonfirmasiLayanan,
    PilihLokasi,
    PanggilBantuan,
    LihatLokasi,
    PengaturanAkun
  },
  {
    headerMode: "none",
    transitionConfig: () => fromRight()
  }
);

// Switch navigator
const switchNavigator = createAnimatedSwitchNavigator(
  {
    Splash,
    Login,
    Main: mainStack
  },
  {
    initialRouteName: "Splash"
  }
);

export default createAppContainer(switchNavigator);
