import React from 'react';
import {View, StatusBar, Platform} from 'react-native';

export const lightStatusBar =
  Platform.OS !== 'android' || Platform.Version > 22;

export const statusBarHeight = lightStatusBar
  ? Platform.OS === 'ios'
    ? 20
    : StatusBar.currentHeight
  : 0;

const AppStatusBar = () => {
  const barStyle = lightStatusBar ? 'dark-content' : 'light-content';
  const backgroundColor = lightStatusBar ? 'rgba(0, 0, 0, 0)' : '#424242';

  // set statusbar
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(lightStatusBar);
    StatusBar.setBarStyle(barStyle);
    StatusBar.setBackgroundColor(backgroundColor);
  }

  return (
    <View>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={lightStatusBar}
      />
    </View>
  );
};

export default AppStatusBar;
