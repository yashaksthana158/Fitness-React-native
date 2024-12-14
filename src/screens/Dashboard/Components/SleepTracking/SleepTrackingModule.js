import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SleepTrackingContext } from './SleepTrackingContext';

const SleepModule = () => {
  const navigation = useNavigation();
  const { sleepTarget, updateSleepTarget, sleepIncrement, updateSleepIncrement } = useContext(SleepTrackingContext);
  const [target, setTarget] = useState(sleepTarget.toString());
  const [increment, setIncrement] = useState(sleepIncrement.toString());

  const handleSave = () => {
    updateSleepTarget(parseInt(target));
    updateSleepIncrement(parseInt(increment));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Sleep Target</Text>

      <Text style={styles.label}>Daily Sleep Goal (hours):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={target}
        onChangeText={setTarget}
      />

      <Text style={styles.label}>Sleep Increment (hours):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={increment}
        onChangeText={setIncrement}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});

export default SleepModule;
