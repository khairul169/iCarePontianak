import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationActions
} from "react-navigation";
import { fromRight } from "react-navigation-transitions";
import BottomTab from "../Components/BottomTab";

// Routes
import Splash from "./Splash";
import Login from "./Login";
import Beranda from "./Beranda";
import Notifikasi from "./Notifikasi";
import Layanan from "./Layanan";
import Akun from "./Akun";
import Gadar from "./Gadar";
import CariAmbulan from "./CariAmbulan";
import BuatLayanan from "./BuatLayanan";
import KonfirmasiLayanan from "./KonfirmasiLayanan";
import PilihLokasi from "./PilihLokasi";
import PanggilBantuan from "./PanggilBantuan";
import LihatLokasi from "./LihatLokasi";
import PengaturanAkun from "./PengaturanAkun";

// Tabbar icons
const routeIcons = {
  Beranda: "home-plus",
  Notifikasi: "bell-circle",
  Layanan: "radio",
  Akun: "account-circle"
};

const tabRoutes = {
  Beranda,
  Notifikasi,
  Layanan,
  Akun
};

// BottomTab navigator
const TabNavigator = createMaterialTopTabNavigator(tabRoutes, {
  tabBarPosition: "bottom",
  tabBarComponent: props => <BottomTab {...props} icons={routeIcons} />
});

// Main stacks
const MainStack = createStackNavigator(
  {
    TabNavigator,
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

// Root navigator
const rootNavigator = createSwitchNavigator({
  Splash,
  Login,
  MainStack
});

export const navigateToMainStack = route => {
  const action = NavigationActions.navigate({
    routeName: "TabNavigator",
    action: NavigationActions.navigate({ routeName: route })
  });
  return [action];
};

export default createAppContainer(rootNavigator);
