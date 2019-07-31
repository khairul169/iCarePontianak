import React, { Component } from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/Routes";
import store from "./src/Store";
import { ONESIGNAL_ID } from "react-native-dotenv";
import OneSignal from "react-native-onesignal";
import { setDeviceId } from "./src/Actions/Auth.action";

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
    // TODO
    return;
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
