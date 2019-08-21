import React from 'react';
import renderer from 'react-test-renderer';

import BottomTab from 'components/BottomTab';
import TabItem from 'components/TabItem';

describe('<BottomTab />', () => {
  const defaultProps = {
    navigation: {state: {routes: []}},
  };
  const wrapper = renderer.create(<BottomTab {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TabItem />', () => {
  const defaultProps = {
    title: 'TabItem',
    icon: 'home',
  };
  const wrapper = renderer.create(<TabItem {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
