import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SleepTrackingProvider } from '../screens/Dashboard/Components/SleepTracking/SleepTrackingContext';
import Home from '../screens/Dashboard/Home';
import SleepTrackingDashboard from '../screens/Dashboard/Components/SleepTracking/SleepTrackingDashboard';
import SleepTracking from '../screens/Dashboard/Components/SleepTracking/SleepTracking';
import SleepTrackingModule from '../screens/Dashboard/Components/SleepTracking/SleepTrackingModule';

const Stack = createStackNavigator();

const SleepTrackingNavigator = () => {
  return (
    <SleepTrackingProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SleepTrackingDashboard" component={SleepTrackingDashboard} options={{headerShown: false}}/>
        <Stack.Screen name="SleepTracking" component={SleepTracking} options={{headerShown: false}}/>
        <Stack.Screen name="SleepModule" component={SleepTrackingModule} options={{headerShown: false}}/>
      </Stack.Navigator>
    </SleepTrackingProvider>
  );
};

export default SleepTrackingNavigator;
