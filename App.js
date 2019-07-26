import React, { Component } from "react";
import AppContainer from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return <AppContainer />;
  }
}

export default App;
