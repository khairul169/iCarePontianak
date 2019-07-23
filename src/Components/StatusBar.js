import React from "react";
import { StatusBar as RNStatusBar, Platform } from "react-native";
import PropTypes from "prop-types";

const lightStatusBar = Platform.OS !== "android" || Platform.Version > 22;

const StatusBar = ({ translucent }) => {
  return (
    <RNStatusBar
      barStyle={lightStatusBar ? "dark-content" : "light-content"}
      backgroundColor={lightStatusBar ? "#fff" : "#454545"}
      translucent={translucent}
    />
  );
};

StatusBar.propTypes = {
  translucent: PropTypes.bool
};

StatusBar.defaultProps = {
  translucent: false
};

export default StatusBar;
