import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import BottomTab from "./Components/BottomTab";
import { fromRight } from "react-navigation-transitions";

// Routes
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Beranda from "./Screens/Beranda";
import Notifikasi from "./Screens/Notifikasi";
import Akun from "./Screens/Akun";
import Gadar from "./Screens/Gadar";
import CariAmbulan from "./Screens/CariAmbulan";
import BuatLayanan from "./Screens/BuatLayanan";
import KonfirmasiLayanan from "./Screens/KonfirmasiLayanan";

// Tabbar icons
const routeIcons = {
  Beranda: "home-plus",
  Notifikasi: "radio",
  Akun: "account-circle"
};

// Beranda navigator
const mainNavigator = createMaterialTopTabNavigator(
  {
    Beranda,
    Notifikasi,
    Akun
  },
  {
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
    KonfirmasiLayanan
  },
  {
    headerMode: "none",
    transitionConfig: () => fromRight(200)
  }
);

// Switch navigator
const switchNavigator = createSwitchNavigator(
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
