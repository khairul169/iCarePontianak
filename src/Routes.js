import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationActions
} from "react-navigation";
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
