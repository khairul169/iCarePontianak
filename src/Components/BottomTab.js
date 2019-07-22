import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import TabItem from "./TabItem";

const BottomTab = ({ navigation, icons }) => {
  const navigateTo = route => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {navigation.state.routes.map((item, index) => (
        <TabItem
          key={index}
          title={item.routeName}
          active={index === navigation.state.index}
          icon={icons[item.routeName]}
          onPress={() => navigateTo(item.key)}
        />
      ))}
    </View>
  );
};

BottomTab.propTypes = {
  icons: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#ddd",
    borderTopWidth: 1
  }
});

export default BottomTab;
