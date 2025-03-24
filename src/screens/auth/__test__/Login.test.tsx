import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import Login from '@shipex/screens/auth/Login';

describe('Login Screen', () => {
  const renderWithNavigation = (component: React.ReactElement) => {
    return render(<NavigationContainer>{component}</NavigationContainer>);
  };

  it('should render the logo, button, and bottom sheet modal', () => {
    const {getByTestId} = renderWithNavigation(<Login />);

    // Check if the logo is rendered
    expect(getByTestId('login-logo')).toBeTruthy();

    // Check if the login button is rendered
    const loginButton = getByTestId('login-button');
    expect(loginButton).toBeTruthy();

    // Simulate button press to open bottom sheet
    fireEvent.press(loginButton);

    // Check if the bottom sheet modal is opened
    const bottomSheetModal = getByTestId('login-bottom-sheet');
    expect(bottomSheetModal).toBeTruthy();
  });
});
