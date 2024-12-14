import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SleepTrackingContext } from './SleepTrackingContext';

const SleepTracking = () => {
  const navigation = useNavigation();
  const { sleepLogged, logSleep, sleepTarget, sleepIncrement } = useContext(SleepTrackingContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTargetClick = () => {
    navigation.navigate('SleepModule');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sleep Tracking</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.info}>
        Hours of Sleep Logged: {sleepLogged} / {sleepTarget}
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => logSleep(sleepIncrement)}
      >
        <Text style={styles.addButtonText}>Add {sleepIncrement} Hour(s)</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleTargetClick}
            >
              <Text style={styles.modalButtonText}>Set Target</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  menuButton: {
    padding: 5,
  },
  menuButtonText: {
    fontSize: 28,
    color: '#2C3E50',
  },
  info: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2980B9',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default SleepTracking;
