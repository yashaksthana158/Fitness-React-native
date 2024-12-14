import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PersonalData from '../screens/Profile/Account/PersonalData';
import Achievement from '../screens/Profile/Account/Achievement';
import ActivityHistory from '../screens/Profile/Account/ActivityHistory';
import Workout from '../screens/Profile/Account/WorkoutProgress';
import ContactUS from '../screens/Profile/other/ContactUS';
import PrivacyPolicy from '../screens/Profile/other/PrivacyPolicy';
import Settings from '../screens/Profile/other/Settings';

const Stack = createStackNavigator();

const ProfileNavigator= ()=>{

    return(
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Personal Data" component={PersonalData}/>
            <Stack.Screen name="Achievement" component={Achievement}/>
            <Stack.Screen name="Activity History" component={ActivityHistory}/>
            <Stack.Screen name="Workout Progress" component={Workout}/>
            <Stack.Screen name="Contact US" component={ContactUS}/>
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicy}/>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    );
}

export default ProfileNavigator;