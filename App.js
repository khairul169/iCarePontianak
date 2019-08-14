import React, { Component } from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/Screens";
import store from "./src/Public/Store";
import { setDeviceId } from "./src/Actions/Auth.action";
import { onPushNotification } from "./src/Actions/Beranda.action";

// OneSignal
import { ONESIGNAL_ID } from "react-native-dotenv";
import OneSignal from "react-native-onesignal";

class App extends Component {
  constructor(props) {
    super(props);
    this.store = store;

    // disable warning box
    console.disableYellowBox = true;

    // initialize onesignal
    OneSignal.inFocusDisplaying(2);
    OneSignal.init(ONESIGNAL_ID);
  }

  componentDidMount() {
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onOpened = openResult => {
    const data = openResult.notification.payload.additionalData;
    this.store.dispatch(onPushNotification(data));
  };

  onIds = device => {
    this.store.dispatch(setDeviceId(device.userId));
  };

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
