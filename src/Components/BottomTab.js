import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import TabItem from './TabItem';

const BottomTab = ({navigation, routes}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigateTo = route => {
    navigation.navigate(route);
  };

  if (keyboardVisible) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      {navigation.state.routes.map((item, index) => (
        <TabItem
          key={index}
          title={routes[item.key].title || item.routeName}
          active={index === navigation.state.index}
          icon={routes[item.key].icon}
          onPress={() => navigateTo(item.key)}
        />
      ))}
    </View>
  );
};

BottomTab.propTypes = {
  icons: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderTopColor: '#CFD8DC',
    //borderTopWidth: 1,
    elevation: 18,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});

export default BottomTab;
