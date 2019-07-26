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
import Beranda from "./Screens/Beranda";
import Notifikasi from "./Screens/Notifikasi";
import Akun from "./Screens/Akun";
import Gadar from "./Screens/Gadar";
import CariAmbulan from "./Screens/CariAmbulan";
import BuatLayanan from "./Screens/BuatLayanan";

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
    BuatLayanan
  },
  {
    headerMode: "none",
    transitionConfig: () => fromRight(200)
  }
);

// Switch navigator
const switchNavigator = createSwitchNavigator({
  Main: mainStack
});

export default createAppContainer(switchNavigator);
