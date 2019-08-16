import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppContainer from './src/Screens';
import store from './src/Public/Store';
import OneSignal from './src/Public/OneSignal';

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize app
    console.disableYellowBox = true;
    OneSignal.initialize();
  }

  componentDidMount() {
    OneSignal.load();
  }

  componentWillUnmount() {
    OneSignal.clean();
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
