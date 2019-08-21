import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {fromRight} from 'react-navigation-transitions';
import BottomTab from 'components/BottomTab';

// Routes
import Loader from './Loader';
import Login from './Login';
import Beranda from './Beranda';
import Layanan from './Layanan';
import EmergencyMap from './EmergencyMap';
import Akun from './Akun';
import Emergency from './Emergency';
import BuatLayanan from './BuatLayanan';
import PilihLokasi from './PilihLokasi';
import LihatLokasi from './LihatLokasi';
import PengaturanAkun from './PengaturanAkun';
import LihatLayanan from './LihatLayanan';

const tabRoutes = {
  Beranda: {screen: Beranda, icon: 'home-plus'},
  Layanan: {screen: Layanan, icon: 'radio'},
  EmergencyMap: {screen: EmergencyMap, icon: 'bell-circle', title: 'Emergency'},
  Akun: {screen: Akun, icon: 'account-circle'},
};

// BottomTab navigator
const TabNavigator = createBottomTabNavigator(tabRoutes, {
  tabBarComponent: props => <BottomTab {...props} routes={tabRoutes} />,
});

// Main stacks
const MainStack = createStackNavigator(
  {
    TabNavigator,
    Emergency,
    BuatLayanan,
    PilihLokasi,
    LihatLokasi,
    PengaturanAkun,
    LihatLayanan,
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromRight(),
  },
);

// Root navigator
const rootNavigator = createSwitchNavigator({
  Loader,
  Login,
  MainStack,
});

export default createAppContainer(rootNavigator);
