import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Glass from './Glass';
import { WaterIntakeContext } from './WaterIntakeContext';

const WaterIntakeDashboard = () => {
  const navigation = useNavigation();
  const { waterIntake, addWater, maxIntake, incrementAmount } = useContext(WaterIntakeContext);

  // Function to handle navigation
  const handlePress = () => {
    navigation.navigate('WaterIntakeNavigator', { screen: 'WaterIntake' });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.leftSection}>
        <Glass amount={waterIntake} />
        <Text style={styles.intakeText}>{waterIntake}/{maxIntake} ml</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={() => addWater(incrementAmount)} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>+{incrementAmount} ml</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA', 
    borderRadius: 10,
    padding: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  intakeText: {
    fontSize: 16,
    color: '#3a3a3c', 
    marginLeft: 5,
    marginRight:5,
  },
  addButton: {
    backgroundColor: '#3a3a3c', 
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    
  },
  addButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WaterIntakeDashboard;
