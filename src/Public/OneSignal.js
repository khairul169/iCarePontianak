import {ONESIGNAL_ID} from 'react-native-dotenv';
import RNOneSignal from 'react-native-onesignal';
import store from 'public/Store';
import {navigateToMainStack} from 'public/Utils';
import {UserAPI} from 'public/API';

const OneSignal = (() => {
  // vars
  let deviceId = null;

  const onNotificationPress = (data, navigation) => {
    //navigation.navigate('Layanan');
    navigateToMainStack('Layanan');
  };

  const onOpened = openResult => {
    const data = openResult.notification.payload.additionalData;
    const navigation = store.getState().beranda.navigation;

    if (data && navigation) {
      onNotificationPress(data, navigation);
    }
  };

  const onIds = device => {
    deviceId = device.userId;
  };

  const updateDeviceId = async () => {
    try {
      await UserAPI.setDeviceId(deviceId);
    } catch (error) {
      console.log(error);
    }
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
