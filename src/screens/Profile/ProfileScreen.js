import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import BASE_URL from '../../Navigation/config';
import ImagePath from '../ImagePath';


const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const { userName } = route.params || {}; 
  console.log('Route Params:', route.params);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            const response = await fetch(`${BASE_URL}/logout/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',  // Ensure cookies/session are sent with the request
            });

            if (response.ok) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
              });
            } else {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          } catch (error) {
            console.error('Logout Error:', error);
            Alert.alert('Error', 'An error occurred during logout.');
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileInfo}>
          <Image source={ImagePath.profile} style={styles.profileImage} />
          <Text style={styles.profileName}>{userName || 'User'}</Text>
          <Text style={styles.profileProgram}>Lose a Fat Program</Text>
          <TouchableOpacity style={styles.editButton} onPress={()=> navigation.navigate('ProfileNavigator', { screen:'Settings'})}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.sectionItem} onPress={()=> navigation.navigate('ProfileNavigator',{ screen:'Personal Data'})}>
            <Text>Personal Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={()=> navigation.navigate('ProfileNavigator', { screen: 'Achievement' })}>
            <Text>Achievement</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}onPress={()=> navigation.navigate('ProfileNavigator', { screen: 'Activity History'})}>
            <Text>Activity History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}onPress={()=> navigation.navigate('ProfileNavigator', { screen:'Workout Progress'})}>
            <Text>Workout Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification</Text>
          <View style={styles.switchContainer}>
            <Text>Pop-up Notification</Text>
            <Switch />
          </View>
        </View>

        {/* Other Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity style={styles.sectionItem}onPress={()=> navigation.navigate('ProfileNavigator', { screen:'Contact US'})}>
            <Text>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}onPress={()=> navigation.navigate('ProfileNavigator', { screen: 'Privacy Policy'})}>
            <Text>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={()=> navigation.navigate('ProfileNavigator', { screen:'Settings'})}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomMargin} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
    flexGrow: 1,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileProgram: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoutButton: {
    marginTop: 'auto',
    padding: 15,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomMargin: {
    height: 50, // This height should match the height of the bottom tabs
    backgroundColor:"none",
  },
});

export default ProfileScreen;
