import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Disclaimer from '../screens/Disclaimer';
import UserDetails from '../screens/UserDetails';
import DefectDetails from '../screens/DefectDetails';
import Report from '../screens/Report';
import CameraView from '../components/CameraView';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Disclaimer"
      mode="modal"
      headerMode="none"
    >
      <Stack.Screen name="Disclaimer" component={Disclaimer} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="DefectDetails" component={DefectDetails} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="CameraView" component={CameraView} />
    </Stack.Navigator>
  );
}
