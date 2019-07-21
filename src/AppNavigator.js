import React from 'react';
import { Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './Login/Login';

// layouts
import Home from './Home/Home';
import Notification from './Notification/Notification';
import Account from './Account/Account';
import Settings from './Settings/Settings';

//
const TestMode = false;

// tab icon
const TabIcon = {
    Home: require('../assets/icon/home.png'),
    Notification: require('../assets/icon/notification.png'),
    Account: require('../assets/icon/account.png'),
    Settings: require('../assets/icon/settings.png')
};

// main stacks
const MainStacks = createMaterialTopTabNavigator({
    // Screens
    Home            : Home,
    Notification    : Notification,
    Account         : Account,
    Settings        : Settings
},
{
    initialRouteName: 'Home',
    
    defaultNavigationOptions: ({ navigation }) => ({
        // Enable swiping
        swipeEnabled: true,

        // Tab icons
        tabBarIcon: ({ tintColor }) => {
            const {routeName} = navigation.state;
            return <Image
                source={TabIcon[routeName]} style={{width: 24, height: 24}} />;
        }
    }),

    // Tab bar styling
    tabBarPosition: 'bottom',

    // Tab bar options
    tabBarOptions: {
        // colors
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',

        // indicator bar
        indicatorStyle: {
            backgroundColor: '#fff'
        },

        // tab style
        style: {
            backgroundColor: '#34495e',
            padding: 0
        },
        showIcon: true,
        showLabel: false
    }
});

// base navigator
const AppNavigator = createSwitchNavigator({
    Login   : LoginScreen,
    Main    : MainStacks
},
{
    initialRouteName: TestMode ? 'Main' : 'Login',
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
