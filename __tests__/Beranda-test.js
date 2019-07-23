import React from "react";
import renderer from "react-test-renderer";

import Header from "../src/Components/Beranda/Header";
import ItemPelayanan from "../src/Components/Beranda/ItemPelayanan";

describe("<Header />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Header {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<ItemPelayanan />", () => {
  const defaultProps = {
    title: "Item"
  };
  const wrapper = renderer.create(<ItemPelayanan {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
