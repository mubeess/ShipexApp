import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AvatarIcon,
  BarcodeScanIcon,
  ShipmentIcon,
  WalletIcon,
} from '@assets/svgs/Index';
import Home from '@shipex/screens/dashboard/home/Home';
import ScanHome from '@shipex/screens/dashboard/scan/ScanHome';
import WalletHome from '@shipex/screens/dashboard/wallet/WalletHome';
import ProfileHome from '@shipex/screens/dashboard/profile/ProfileHome';
import {RootTabParamList} from '../types';
import {tabScreenOptions} from '@shipex/constants';

const Tab = createBottomTabNavigator<RootTabParamList>();
const DashboardBottomTab = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions} initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: props => <ShipmentIcon {...props} />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <BarcodeScanIcon {...props} />,
        }}
        name="Scan"
        component={ScanHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <WalletIcon {...props} />,
        }}
        name="Wallet"
        component={WalletHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <AvatarIcon {...props} />,
        }}
        name="Profile"
        component={ProfileHome}
      />
    </Tab.Navigator>
  );
};

export default DashboardBottomTab;
