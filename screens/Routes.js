import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import BottomTab from "../components/BottomTab";
import { fromRight } from "react-navigation-transitions";

// Routes
import * as Beranda from "./Beranda";
import * as Notifikasi from "./Notifikasi";
import * as Akun from "./Akun";

// Tabbar icons
const routeIcons = {
  Beranda: "home-plus",
  Notifikasi: "radio",
  Akun: "account-circle"
};

// Beranda navigator
const mainNavigator = createMaterialTopTabNavigator(
  {
    Beranda: Beranda.Index,
    Notifikasi: Notifikasi.Index,
    Akun: Akun.Index
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
    GawatDarurat: Beranda.GawatDarurat,
    CariAmbulan: Beranda.CariAmbulan,
    Pelayanan: Beranda.Pelayanan
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
