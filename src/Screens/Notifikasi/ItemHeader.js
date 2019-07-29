import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Icon } from "../../Components";

const ItemHeader = ({
  title,
  subtitle,
  border,
  onPress,
  collapsed = false,
  emergency
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
    },
    emergency && {
      backgroundColor: "#f44336",
      borderBottomWidth: 0
    }
  ];

  const color = emergency ? "#fff" : "#444";
  const layananTextStyle = [
    {
      marginLeft: 16,
      fontSize: 16,
      color
    },
    emergency && {
      marginLeft: 0,
      flex: 1,
      textAlign: "center"
    }
  ];
  const layananIdStyle = {
    marginLeft: 8,
    color: "#686868",
    fontSize: 14
  };
  const iconStyle = {
    flex: emergency ? 0 : 1,
    alignSelf: "flex-end",
    textAlign: "right"
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={headerStyle}>
        <Icon name="note-outline" size={18} color={color} />
        {title && <Text style={layananTextStyle}>{title}</Text>}
        {subtitle && <Text style={layananIdStyle}>{subtitle}</Text>}
        <Icon
          name={collapsed ? "chevron-up" : "chevron-down"}
          size={20}
          color={color}
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
