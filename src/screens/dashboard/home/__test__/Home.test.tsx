import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useShipmentList, useShipmentStatus} from '@shipex/hooks/useShipment';
import Home from '../Home';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock useShipmentList hook
jest.mock('@shipex/hooks/useShipment', () => ({
  useShipmentList: jest.fn(),
}));

describe('Home', () => {
  const mockSetItem = jest.spyOn(AsyncStorage, 'getItem');
  const mockUseShipmentList = useShipmentList as jest.Mock;

  beforeEach(() => {
    mockSetItem.mockResolvedValue('John Doe');
    mockUseShipmentList.mockReturnValue({
      shipmentList: [{id: '1', name: 'Sample Shipment'}],
      isLoading: false,
      refresh: jest.fn(),
      refetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all elements and handle interactions', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = render(<Home />);

    // Check if text elements are rendered
    expect(getByText('Hello,')).toBeTruthy();

    // Check if input and buttons are rendered
    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('Add Scan')).toBeTruthy();
    expect(getByText('Mark All')).toBeTruthy();

    // Simulate opening the bottom sheet
    fireEvent.press(getByText('Filters'));
    expect(getByTestId('login-bottom-sheet')).toBeTruthy(); // Adjust this if needed

    // Simulate changing search input
    fireEvent.changeText(getByPlaceholderText('Search'), 'Test Search');
    expect(getByPlaceholderText('Search').props.value).toBe('Test Search');

    // Check if the item in FlatList is rendered
    await waitFor(() => {
      expect(getByText('Sample Shipment')).toBeTruthy();
    });
  });

  it('should handle loading state', () => {
    (useShipmentStatus as jest.Mock).mockReturnValue({
      shipmentList: [],
      isLoading: true,
      refresh: jest.fn(),
      refetching: false,
    });

    const {getByTestId} = render(<Home />);

    // Check if loading indicator is shown
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
