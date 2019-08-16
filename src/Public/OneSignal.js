import {ONESIGNAL_ID} from 'react-native-dotenv';
import RNOneSignal from 'react-native-onesignal';
import store from './Store';
import {setDeviceId} from '../Redux/Actions/OneSignal';
import {setUserDeviceId} from '../Redux/Actions/Akun';

const OneSignal = (() => {
  const onNotificationPress = (data, navigation) => {
    navigation.navigate('Layanan');
  };

  const onOpened = openResult => {
    const data = openResult.notification.payload.additionalData;
    const navigation = store.getState().oneSignal.navProps;

    if (data && navigation) {
      onNotificationPress(data, navigation);
    }
  };

  const onIds = device => {
    store.dispatch(setDeviceId(device.userId));
  };

  const updateDeviceId = () => {
    const deviceId = store.getState().oneSignal.deviceId;
    store.dispatch(setUserDeviceId(deviceId));
  };

  return {
    initialize: () => {
      // initialize onesignal
      RNOneSignal.inFocusDisplaying(2);
      RNOneSignal.init(ONESIGNAL_ID);
    },

    load: () => {
      RNOneSignal.addEventListener('opened', onOpened);
      RNOneSignal.addEventListener('ids', onIds);
    },

    clean: () => {
      RNOneSignal.removeEventListener('opened', onOpened);
      RNOneSignal.removeEventListener('ids', onIds);
    },

    onLoggedIn: () => {
      updateDeviceId();
    },
  };
})();

export default OneSignal;
