import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WaterIntakeProvider } from '../screens/Dashboard/Components/WaterIntake/WaterIntakeContext';
import Home from '../screens/Dashboard/Home';
import WaterIntakeDashboard from '../screens/Dashboard/Components/WaterIntake/WaterIntakeDashboard';
import WaterIntake from '../screens/Dashboard/Components/WaterIntake/WaterIntake';
import WaterModule from '../screens/Dashboard/Components/WaterIntake/WaterModule';
import Notificationstore from '../screens/Dashboard/Components/Notificationstore';

const Stack = createStackNavigator();

const WaterIntakeNavigator= ()=> {
  return (
    <WaterIntakeProvider>
     
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="WaterIntakeDashboard" component={WaterIntakeDashboard} />
          <Stack.Screen name="WaterIntake" component={WaterIntake} options={{headerShown: false}}/>
          <Stack.Screen name="WaterModule" component={WaterModule} options={{headerShown: false}}/>
          <Stack.Screen name="Notification" component={Notificationstore} options={{headerShown: false}}/>

        </Stack.Navigator>
      
    </WaterIntakeProvider>
  );
}

export default WaterIntakeNavigator;
