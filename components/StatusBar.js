import React from "react";
import { View, StatusBar as RNStatusBar, Platform } from "react-native";

export const lightStatusBar =
  Platform.OS !== "android" || Platform.Version > 22;

export const statusBarHeight = lightStatusBar
  ? Platform.OS === "ios"
    ? 20
    : RNStatusBar.currentHeight
  : 0;

const StatusBar = () => {
  return (
    <View>
      <RNStatusBar
        barStyle={lightStatusBar ? "dark-content" : "light-content"}
        backgroundColor={lightStatusBar ? "rgba(0, 0, 0, 0)" : "#424242"}
        translucent={lightStatusBar}
      />
    </View>
  );
};

export default StatusBar;
