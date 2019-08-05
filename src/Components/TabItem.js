import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "./Icon";

const TabItem = ({ icon, active, title, onPress }) => {
  const tintColorStyle = { color: active ? "#43A047" : "#676767" };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Icon name={icon} size={20} style={tintColorStyle} />}
      <Text style={[styles.tabTitle, tintColorStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

TabItem.propTypes = {
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func
};

TabItem.defaultProps = {
  active: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8
  },
  tabTitle: {
    color: "#333",
    fontSize: 12,
    marginTop: 2
  }
});

export default TabItem;
