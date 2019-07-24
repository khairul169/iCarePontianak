import React from "react";
import PropTypes from "prop-types";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Icon = props => {
  let Icons = MaterialCommunityIcons;

  switch (props.type) {
    case "Ionicons":
      Icons = Ionicons;
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
  type: PropTypes.oneOf(["Ionicons", "MaterialCommunityIcons"]),
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
