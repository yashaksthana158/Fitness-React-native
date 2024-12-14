import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SleepTrackingContext } from './SleepTrackingContext';

const SleepTrackingDashboard = () => {
  const navigation = useNavigation();
  const { dailySleepData, sleepTarget } = useContext(SleepTrackingContext);

  const handlePress = () => {
    navigation.navigate('SleepTrackingNavigator', { screen: 'SleepTracking' });
  };

  const renderSleepEntry = ({ item }) => (
    <Animated.View style={styles.entry}>
      <Text style={styles.entryText}>{item.date} - {item.loggedSleep} hours</Text>
    </Animated.View>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sleep Tracking</Text>
        <Text style={styles.info}>Daily Sleep Goal: {sleepTarget} hours</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Sleep History</Text>
        <FlatList
          data={dailySleepData}
          renderItem={renderSleepEntry}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 12,
    marginHorizontal: 18,
    transition: 'background-color 0.3s ease-in-out',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A2A2A',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2A2A2A',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  entry: {
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    transition: 'transform 0.2s ease-in-out',
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SleepTrackingDashboard;
