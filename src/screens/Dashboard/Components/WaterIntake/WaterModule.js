import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WaterModule = () => {
  const [dailyIntake, setDailyIntake] = useState('12');
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [startTime, setStartTime] = useState(new Date(2021, 0, 1, 9, 0)); // default 9:00 am
  const [endTime, setEndTime] = useState(new Date(2021, 0, 1, 21, 0)); // default 9:00 pm
  const [reminderInterval, setReminderInterval] = useState(1); // default 1 hour
  const [selectedDays, setSelectedDays] = useState([true, true, true, true, true, true, true]); // All days selected by default
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const toggleDaySelection = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  // Function to save settings and schedule notifications if enabled
  const saveSettings = async () => {
    try {
      // Save settings to AsyncStorage
      await AsyncStorage.setItem('dailyIntake', dailyIntake);
      await AsyncStorage.setItem('remindersEnabled', JSON.stringify(remindersEnabled));
      await AsyncStorage.setItem('startTime', startTime.toString());
      await AsyncStorage.setItem('endTime', endTime.toString());
      await AsyncStorage.setItem('reminderInterval', reminderInterval.toString());
      await AsyncStorage.setItem('selectedDays', JSON.stringify(selectedDays));

      // Schedule notifications if reminders are enabled
      if (remindersEnabled) {
        scheduleNotifications();
      }

      Alert.alert('Settings saved successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  // Function to schedule notifications
  const scheduleNotifications = () => {
    PushNotification.cancelAllLocalNotifications(); // Clear existing notifications

    // Ensure notification channel exists (Android)
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'water-reminder-channel', // Ensure this matches the channelId in notifications
          channelName: 'Water Reminder Channel',
          channelDescription: 'A channel to categorise water reminder notifications',
          importance: 4, // High importance for heads-up notifications
          vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created
      );
    }

    const startHour = startTime.getHours();
    const endHour = endTime.getHours();

    // Schedule notifications for each interval on selected days
    for (let day = 0; day < selectedDays.length; day++) {
      if (selectedDays[day]) {
        for (let i = startHour; i <= endHour; i += reminderInterval) {
          const notificationTime = new Date();
          notificationTime.setHours(i);
          notificationTime.setMinutes(0);
          notificationTime.setSeconds(0);
          notificationTime.setDate(notificationTime.getDate() + ((day - notificationTime.getDay() + 7) % 7)); // Set the day of the notification

          // If the calculated time is in the past, add a week
          if (notificationTime <= new Date()) {
            notificationTime.setDate(notificationTime.getDate() + 7);
          }

          PushNotification.localNotificationSchedule({
            channelId: 'water-reminder-channel', // Android specific
            message: 'Time to drink water!', // Notification message
            date: notificationTime, // Schedule at the calculated time
            repeatType: 'week', // Repeat weekly
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Daily Water Intake Target</Text>
      <Text style={styles.subtitle}>
        Good health starts with staying hydrated! Set a daily water intake target to stay on track. 1 glass is 250 ml.
      </Text>

      <Picker
        selectedValue={dailyIntake}
        onValueChange={(itemValue) => setDailyIntake(itemValue)}
        style={styles.picker}
        prompt="Select your daily water intake"
      >
        {Array.from({ length: 20 }, (_, i) => (i + 1).toString()).map((val) => (
          <Picker.Item label={`${val} Glasses`} value={val} key={val} />
        ))}
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Get reminders to drink water</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
          trackColor={{ false: '#767577', true: '#4CAF50' }}
          thumbColor={remindersEnabled ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      {/* Days of the Week Selection */}
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleDaySelection(index)}
            style={[
              styles.dayButton,
              { backgroundColor: selectedDays[index] ? '#4CAF50' : '#DDD' },
            ]}
          >
            <Text style={{ color: selectedDays[index] ? '#FFF' : '#000', fontSize: 16 }}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Start Time: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Button title="Set Start Time" onPress={() => setShowStartPicker(true)} />
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setStartTime(date);
            }}
          />
        )}
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>End Time: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Button title="Set End Time" onPress={() => setShowEndPicker(true)} />
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setEndTime(date);
            }}
          />
        )}
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Remind me every: {reminderInterval} hour(s)</Text>
        <Picker
          selectedValue={reminderInterval.toString()}
          onValueChange={(itemValue) => setReminderInterval(parseInt(itemValue))}
          style={styles.picker}
          prompt="Select reminder interval"
        >
          {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((val) => (
            <Picker.Item label={`${val} hour${val > 1 ? 's' : ''}`} value={val} key={val} />
          ))}
        </Picker>
      </View>

      <Button
        title="Save Settings"
        onPress={saveSettings}
        color="#4CAF50"
        accessibilityLabel="Save your water intake settings"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  dayButton: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default WaterModule;
