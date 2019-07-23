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

import GawatDarurat from "./Screens/Beranda/GawatDarurat";

const routeIcons = {
  Beranda: "home-plus",
  Notifikasi: "radio",
  Akun: "account-circle"
};

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

const mainStack = createStackNavigator(
  {
    Main: mainNavigator,
    GawatDarurat
  },
  {
    headerMode: "none",
    transitionConfig: () => fromRight(200)
  }
);

const switchNavigator = createSwitchNavigator({
  Main: mainStack
});

export default createAppContainer(switchNavigator);
