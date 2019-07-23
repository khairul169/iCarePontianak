import React from "react";
import renderer from "react-test-renderer";

import { Card, Icon } from "../src/Components";

describe("<Card />", () => {
  const defaultProps = {
    flex: 1,
    margin: 10,
    marginX: 2,
    marginY: 6
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
