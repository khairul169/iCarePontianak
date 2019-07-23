import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "./Icon";

export const HeaderItem = ({ children, onPress }) => {
  if (onPress) {
    return (
      <TouchableOpacity style={styles.headerItemContainer} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={styles.headerItemContainer}>{children}</View>;
};

HeaderItem.propTypes = {
  onPress: PropTypes.func
};

export const HeaderIcon = ({ type, name, onPress }) => {
  return (
    <HeaderItem onPress={onPress}>
      <Icon type={type} name={name} size={24} color="#333" />
    </HeaderItem>
  );
};

HeaderIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

const Header = ({ title, navigation, left, right, backButton }) => {
  const goBack = () => {
    navigation && navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerItem}>
        {backButton && <HeaderIcon name="arrow-left" onPress={goBack} />}
        {left}
      </View>

      <Text style={styles.headerTitle}>{title.toUpperCase()}</Text>

      <View style={styles.headerItem}>{right}</View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element,
  backButton: PropTypes.bool,
  navigation: PropTypes.object
};

Header.defaultProps = {
  backButton: false
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    minHeight: 55,
    backgroundColor: "#fff"
  },
  headerItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerItemContainer: {
    flex: 1,
    alignSelf: "stretch"
  },
  headerTitle: {
    flex: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
    textAlign: "center"
  }
});

export default Header;
