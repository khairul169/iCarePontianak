import {PermissionsAndroid, Linking} from 'react-native';
import {NavigationActions, createStackNavigator} from 'react-navigation';
import {fromRight} from 'react-navigation-transitions';
import {Service} from './Consts';
import store from 'public/Store';

// momentjs
import moment from 'moment';
import 'moment/locale/id';

export const getTimeString = time => {
  moment.locale('id');
  return moment(time * 1000).format('DD MMMM YYYY HH.mm');
};

export const getServiceName = id => {
  switch (parseInt(id, 10)) {
    case Service.EMERGENCY:
      return 'Gawat Darurat';
    case Service.MEDICALVISIT:
      return 'Kunjungan Medis';
    case Service.LABMEDIK:
      return 'Lab Medik';
    case Service.GIGI:
      return 'Kesehatan Gigi';
    case Service.BIDAN:
      return 'Bidan Terampil';
    case Service.LANSIA:
      return 'Lansia';
    case Service.SANITASI:
      return 'Sanitasi';
    case Service.NUTRISI:
      return 'Diet Nutrisi';
    default:
      return 'undefined';
  }
};

export const getUserType = type => {
  const userTypes = [
    '',
    'Klien',
    'Ners',
    'Analis Kesehatan',
    'Perawat Gigi',
    'Bidan',
    'Perawat Lansia',
    'Kesehatan Lingkungan',
    'Nutrisionis',
  ];

  return userTypes[type] || null;
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'iCare Pontianak',
        message: 'iCare Pontianak membutuhkan izin lokasi anda',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log("You can use the location");
    } else {
      //console.log("location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const navigateToMainStack = route => {
  const navigation = store.getState().beranda.navigation;

  if (!navigation) {
    return;
  }

  const action = NavigationActions.navigate({
    routeName: 'TabNavigator',
    action: route && NavigationActions.navigate({routeName: route}),
  });

  navigation.reset([action], 0);
};

export const openPhoneNumber = number => {
  number && Linking.openURL(`tel:${number}`);
};

export const regionContainingPoints = (points, zoom = 1.0) => {
  if (!points || points.length <= 1) return points[0];

  let minLat, maxLat, minLng, maxLng;

  // init first point
  (point => {
    minLat = point.latitude;
    maxLat = point.latitude;
    minLng = point.longitude;
    maxLng = point.longitude;
  })(points[0]);

  // calculate rect
  points.forEach(point => {
    minLat = Math.min(minLat, point.latitude);
    maxLat = Math.max(maxLat, point.latitude);
    minLng = Math.min(minLng, point.longitude);
    maxLng = Math.max(maxLng, point.longitude);
  });

  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;

  const deltaLat = (maxLat - minLat) * zoom;
  const deltaLng = (maxLng - minLng) * zoom;

  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: deltaLat,
    longitudeDelta: deltaLng,
  };
};

export const createScreenStack = routes =>
  createStackNavigator(routes, {
    headerMode: 'none',
    transitionConfig: () => fromRight(),
  });
