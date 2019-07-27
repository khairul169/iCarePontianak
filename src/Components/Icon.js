import React from "react";
import PropTypes from "prop-types";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Icon = props => {
  let Icons = MaterialCommunityIcons;

  switch (props.type) {
    case "Ionicons":
      Icons = Ionicons;
      break;
    case "FontAwesome5":
      Icons = FontAwesome5;
      break;
    default:
      break;
  }

  return (
    <Icons
      name={props.name}
      size={props.size}
      color={props.color}
      style={props.style}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.object
};

Icon.defaultProps = {
  type: "MaterialCommunityIcons",
  size: 24,
  color: "#333"
};

export default Icon;
