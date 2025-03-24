import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '@shipex/screens/auth/Login';
import {stackScreenOptions} from '@shipex/constants';
import {RootStackParamList} from '../types';
import DashboardBottomTab from '../tabs/DashboardBottomTab';

const Stack = createStackNavigator<RootStackParamList>();

function MainAppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={DashboardBottomTab} />
    </Stack.Navigator>
  );
}

export default MainAppStack;
