import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { fromRight } from "react-navigation-transitions";

// Routes
import Beranda from "./Screens/Beranda";

const mainNavigator = createBottomTabNavigator({
  Beranda
});

const mainStack = createStackNavigator(
  {
    Main: mainNavigator
  },
  {
    headerMode: "none",
    transitionConfig: fromRight
  }
);

const switchNavigator = createSwitchNavigator({
  Main: mainStack
});

export default createAppContainer(switchNavigator);
