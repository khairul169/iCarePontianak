import React, { Component } from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/Routes";
import store from "./src/Store";

class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
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
