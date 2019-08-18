import React from 'react';
import {View, Text} from 'react-native';
import Icon from './Icon';
import PropTypes from 'prop-types';

const ItemDetail = ({children, title, icon, text, margin, border}) => {
  const containerStyle = {
    flexDirection: 'row',
    marginTop: margin ? 16 : 0,
  };

  const contentStyle = [
    {
      flex: 1,
      marginHorizontal: 12,
    },
    border && {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 16,
    },
  ];

  const titleStyle = {
    fontSize: 12,
    color: '#686868',
    marginBottom: 8,
  };

  const textStyle = {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  };

  return (
    <View style={containerStyle}>
      <Icon name={icon} size={18} color="#626262" />
      <View style={contentStyle}>
        <Text style={titleStyle}>{title}</Text>
        {text ? <Text style={textStyle}>{text}</Text> : null}
        {children}
      </View>
    </View>
  );
};

ItemDetail.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  margin: PropTypes.bool,
  border: PropTypes.bool,
};

ItemDetail.defaultProps = {
  margin: true,
};

export default ItemDetail;
