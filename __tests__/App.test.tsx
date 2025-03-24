/**
 * @format
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../App';

jest.mock('@shipex/navigation/AppNavigation', () => 'AppNavigation');
jest.mock(
  '@shipex/screens/SplashScreen/AnimatedSplashScreen',
  () => 'AnimatedSplashScreen',
);
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
  __esModule: true,
  default: jest.fn().mockImplementation(() => null),
}));

describe('App', () => {
  it('should show splash screen initially and then transition to AppNavigation', async () => {
    const {getByTestId, queryByTestId} = render(<App />);

    // Initially, the splash screen should be visible
    setTimeout(() => {
      expect(getByTestId('splash-screen')).toBeTruthy();

      // Simulate the end of the splash screen animation
      fireEvent(getByTestId('splash-screen'), 'animationEnd');

      // Wait for the splash screen to disappear

      expect(queryByTestId('splash-screen')).toBeNull();

      // Check if AppNavigation is visible
      expect(getByTestId('app-navigation')).toBeTruthy();
    }, 6000);
  });
});
