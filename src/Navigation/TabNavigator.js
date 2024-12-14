import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Dashboard/Home';
import Camera from '../screens/foodSuggestion/FoodSuggestion';
import Activity from '../screens/Videoplayer/Activity';
import ImagePath from '../screens/ImagePath';
import FitnessCalculatorScreen from '../screens/foodSuggestion/FoodSuggestion';
import { useRoute } from '@react-navigation/native';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Social_community from '../screens/socialCommunity/Social_community';
import FoodSuggestionScreen from '../screens/foodSuggestion/FoodSuggestion';



const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ff69b4',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = ({route}) => {
  const {userName}=route.params;
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false, // Hide labels for a cleaner look
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={{userName}}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ImagePath.HomeTab}
              style={[
                {height:25, width:25},
                { tintColor: focused ? '#ff69b4' : '#d3d3d3' },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ActivityTab"
        initialParams={{userName}}
        component={Activity}
        options={{
          title: 'Activity',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ImagePath.ExerciseVideoTab}
              style={[
                styles.icon,
                { tintColor: focused ? '#ff69b4' : '#d3d3d3' },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Social_communityTab"
        component={Social_community}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ImagePath.Social_communityTab}
              style={[
                styles.icon,
                { tintColor: '#fff' },
              ]}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="FoodSuggestionScreen"
        component={FoodSuggestionScreen}
        options={{
          title: 'Camera',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ImagePath.FoodSugeestionTab}
              style={[
                styles.icon,
                { tintColor: focused ? '#ff69b4' : '#d3d3d3' },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        initialParams={{userName}}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ImagePath.ProfileTab}
              style={[
                { tintColor: focused ? '#ff69b4' : '#d3d3d3' },
                {height:25, width:25}
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent background
    borderTopWidth: 0,
    elevation: 5,
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
  },
  icon: {
    height: 32,
    width: 32,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
