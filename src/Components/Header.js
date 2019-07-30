import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import StatusBar, { statusBarHeight } from "./StatusBar";
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

export const HeaderIcon = ({ type, name, onPress, right }) => {
  return (
    <HeaderItem onPress={onPress}>
      <Icon
        type={type}
        name={name}
        size={24}
        color="#333"
        style={right && styles.right}
      />
    </HeaderItem>
  );
};

HeaderIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  right: PropTypes.bool
};

const Header = ({
  title,
  navigation,
  left,
  right,
  backButton,
  transparent
}) => {
  const goBack = () => {
    navigation && navigation.goBack();
  };

  const containerStyle = [
    styles.header,
    transparent && styles.headerTransparent,
    { paddingTop: statusBarHeight + 16 }
  ];

  return (
    <View style={containerStyle}>
      <StatusBar />

      <View style={styles.headerItem}>
        {backButton && <HeaderIcon name="arrow-left" onPress={goBack} />}
        {left}
      </View>

      <Text style={styles.headerTitle}>{title && title.toUpperCase()}</Text>

      <View style={[styles.headerItem, styles.right]}>{right}</View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  transparent: PropTypes.bool,
  left: PropTypes.element,
  right: PropTypes.element,
  backButton: PropTypes.bool,
  navigation: PropTypes.object
};

Header.defaultProps = {
  backButton: false,
  transparent: false
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
  headerTransparent: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 1
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
  },
  right: {
    alignSelf: "flex-end"
  }
});

export default Header;
