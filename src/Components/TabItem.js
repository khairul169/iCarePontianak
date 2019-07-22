import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "./Icon";

const TabItem = ({ icon, active, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && (
        <Icon name={icon} size={20} color={active ? "#383838" : "#ccc"} />
      )}
      <Text style={styles.tabTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

TabItem.propTypes = {
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func
};

TabItem.defaultProp = {
  active: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6
  },
  tabTitle: {
    color: "#626262",
    fontSize: 11,
    marginTop: 1
  }
});

export default TabItem;
