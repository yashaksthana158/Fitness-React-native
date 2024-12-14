import {Text, StyleSheet, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Onboarding from '../screens/Onboarding/Onboarding';
import Onboarding3 from '../screens/Onboarding/Onboarding3';
import Onboarding2 from '../screens/Onboarding/Onboarding2';
import Onboarding1 from '../screens/Onboarding/Onboarding1';
import LoginPage from '../screens/Signup&login/LoginPage';
import RegisterPage1 from '../screens/Signup&login/RegisterPage1';
import RegisterPage from '../screens/Signup&login/RegisterPage';
import SuccessRegistration from '../screens/Signup&login/SuccessRegistration';
import WelcomeScreen from '../WelcomeScreen';
import ImageSlider from '../screens/Signup&login/ImageSlider';
import TabNavigator from './TabNavigator'; // Import the TabNavigator
import WaterIntakeNavigator from './WaterIntakeNavigator';
import SleepTrackingNavigator from './SleepTrackingNavigator';
import ProfileNavigator from './ProfileNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
         <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RegisterPage1"
          component={RegisterPage1}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ImageSlider"
          component={ImageSlider}
          options={{headerShown: false}}
        />  

        <Stack.Screen
          name="SuccessRegistration"
          component={SuccessRegistration}
          options={{headerShown: false}}
        />  

        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        {/* Add the TabNavigator here */}
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaterIntakeNavigator"
          component={WaterIntakeNavigator}
          options={{headerShown: false}}
        />

        {/*  <Stack.Screen
          name="WaterIntakeDashboard"
          component={WaterIntakeDashboard}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="WaterIntake"
          component={WaterIntake}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="WaterModule"
          component={WaterModule}
          options={{headerShown: false}}
        /> */}
            <Stack.Screen
          name="SleepTrackingNavigator"
          component={SleepTrackingNavigator}
          options={{ headerShown: false }}
        /> 


         <Stack.Screen
          name="ProfileNavigator"
          component={ProfileNavigator}
          options={{ headerShown: false }}
        />  
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigator;
