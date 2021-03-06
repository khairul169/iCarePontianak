import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

it('renders correctly', () => {
  renderer.create(<App />);
});
