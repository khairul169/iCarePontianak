import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Icon } from "../../Components";

const ItemHeader = ({
  title,
  subtitle,
  border,
  onPress,
  collapsed = false
}) => {
  const headerStyle = [
    styles.content,
    {
      flexDirection: "row",
      alignItems: "center"
    },
    border && {
      borderColor: "#ddd",
      borderBottomWidth: 1,
      paddingBottom: 12
    }
  ];

  const layananTextStyle = { marginLeft: 16, fontSize: 18, color: "#444" };
  const layananIdStyle = {
    marginLeft: 8,
    fontSize: 16,
    color: "#727272"
  };
  const iconStyle = {
    flex: 1,
    alignSelf: "flex-end",
    textAlign: "right"
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={headerStyle}>
        <Icon name="note-outline" size={20} color="#525252" />
        {title && <Text style={layananTextStyle}>{title}</Text>}
        {subtitle && <Text style={layananIdStyle}>{subtitle}</Text>}
        <Icon
          name={collapsed ? "chevron-up" : "chevron-down"}
          size={24}
          color="#525252"
          style={iconStyle}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16
  }
});

export default ItemHeader;
