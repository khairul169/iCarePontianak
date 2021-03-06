import React from 'react';
import renderer from 'react-test-renderer';
import * as Component from 'components';

jest.mock('react-navigation', () => ({withNavigation: component => component}));

describe('<Button />', () => {
  const defaultProps = {title: 'This is button'};
  const wrapper = renderer.create(<Component.Button {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<DateTimePicker />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(
    <Component.DateTimePicker {...defaultProps} />,
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Dialog />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.Dialog {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Header />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.Header {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<HomeHeader />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.HomeHeader {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  const defaultProps = {
    type: 'Ionicons',
    name: 'ios-home',
    size: 24,
    color: '#333',
  };
  const wrapper = renderer.create(<Component.Icon {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<PickerSelect />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.PickerSelect {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<SearchBar />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.SearchBar {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<StatusBar />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.StatusBar {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TextEdit />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Component.TextEdit {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
