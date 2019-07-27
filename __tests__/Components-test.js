import React from "react";
import renderer from "react-test-renderer";

import * as Component from "../src/Components";

describe("<BottomSheet />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.BottomSheet {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Button />", () => {
  const defaultProps = { title: "This is button" };
  const wrapper = renderer.create(<Component.Button {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Card />", () => {
  const defaultProps = {
    flex: 1,
    margin: 10,
    padding: 10
  };
  const wrapper = renderer.create(<Component.Card {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<DateTimePicker />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(
    <Component.DateTimePicker {...defaultProps} />
  );

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Header />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.Header {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<HomeHeader />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.HomeHeader {...defaultProps} />);

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
  const wrapper = renderer.create(<Component.Icon {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<ItemLayanan />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.ItemLayanan {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<PickerSelect />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.PickerSelect {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<SearchBar />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.SearchBar {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<StatusBar />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.StatusBar {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<TextEdit />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.TextEdit {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Title />", () => {
  const defaultProps = {
    children: "Hello world!"
  };
  const wrapper = renderer.create(<Component.Title {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
