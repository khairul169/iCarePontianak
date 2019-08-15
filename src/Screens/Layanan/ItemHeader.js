import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Icon} from '../../Components';

const ItemHeader = ({title, subtitle, onPress, collapsed}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.header}>
        <Icon name="note-outline" size={18} color="#444" />
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <Icon
          name={collapsed ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#444"
          style={styles.toggleIcon}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    marginLeft: 8,
    color: '#686868',
    fontSize: 14,
  },
  toggleIcon: {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
});

export default ItemHeader;
