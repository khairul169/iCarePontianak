import React from "react";
import renderer from "react-test-renderer";

import { Card, Icon, SearchBar, StatusBar } from "../src/Components";

describe("<Card />", () => {
  const defaultProps = {
    flex: 1,
    margin: 10,
    padding: 10
  };
  const wrapper = renderer.create(<Card {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Icon />", () => {
  const defaultProps = {
    type: "Ionicons",
    name: "ios-home",
    size: 24,
    color: "#333"
  };
  const wrapper = renderer.create(<Icon {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<SearchBar />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<SearchBar {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<StatusBar />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<StatusBar {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
