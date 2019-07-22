import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import BottomTab from "./Components/BottomTab";

// Routes
import Beranda from "./Screens/Beranda";
import Notifikasi from "./Screens/Notifikasi";
import Akun from "./Screens/Akun";

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
    Main: mainNavigator
  },
  {
    headerMode: "none"
  }
);

const switchNavigator = createSwitchNavigator({
  Main: mainStack
});

export default createAppContainer(switchNavigator);
