import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SleepTrackingContext = createContext();

export const SleepTrackingProvider = ({ children }) => {
  const [sleepLogged, setSleepLogged] = useState(0);
  const [sleepHistory, setSleepHistory] = useState([]);
  const [dailySleepData, setDailySleepData] = useState([]);
  const [sleepTarget, setSleepTarget] = useState(8); // Default sleep target 8 hours
  const [sleepIncrement, setSleepIncrement] = useState(1); // Default sleep increment 1 hour

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedSleepLogged = await AsyncStorage.getItem('sleepLogged');
        const storedSleepHistory = await AsyncStorage.getItem('sleepHistory');
        const storedDailySleepData = await AsyncStorage.getItem('dailySleepData');
        const storedSleepTarget = await AsyncStorage.getItem('sleepTarget');
        const storedSleepIncrement = await AsyncStorage.getItem('sleepIncrement');

        if (storedSleepLogged !== null) setSleepLogged(JSON.parse(storedSleepLogged));
        if (storedSleepHistory !== null) setSleepHistory(JSON.parse(storedSleepHistory));
        if (storedDailySleepData !== null) setDailySleepData(JSON.parse(storedDailySleepData));
        if (storedSleepTarget !== null) setSleepTarget(JSON.parse(storedSleepTarget));
        if (storedSleepIncrement !== null) setSleepIncrement(JSON.parse(storedSleepIncrement));
      } catch (e) {
        console.error('Failed to load data from storage', e);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('sleepLogged', JSON.stringify(sleepLogged));
        await AsyncStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));
        await AsyncStorage.setItem('dailySleepData', JSON.stringify(dailySleepData));
        await AsyncStorage.setItem('sleepTarget', JSON.stringify(sleepTarget));
        await AsyncStorage.setItem('sleepIncrement', JSON.stringify(sleepIncrement));
      } catch (e) {
        console.error('Failed to save data to storage', e);
      }
    };

    saveData();
  }, [sleepLogged, sleepHistory, dailySleepData, sleepTarget, sleepIncrement]);

  const logSleep = (hours) => {
    const newSleepLogged = Math.min(sleepLogged + hours, sleepTarget);
    setSleepLogged(newSleepLogged);
    setSleepHistory([{ hours, time: new Date().toLocaleTimeString() }, ...sleepHistory]);

    // Update daily sleep data
    const today = new Date();
    const todayKey = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const updatedDailySleepData = dailySleepData.map(day =>
      day.date === todayKey ? { ...day, loggedSleep: newSleepLogged } : day
    );

    if (!updatedDailySleepData.some(day => day.date === todayKey)) {
      updatedDailySleepData.push({ date: todayKey, loggedSleep: newSleepLogged });
    }

    setDailySleepData(updatedDailySleepData);
  };

  const updateSleepTarget = (newSleepTarget) => {
    setSleepTarget(newSleepTarget);
  };

  const updateSleepIncrement = (newSleepIncrement) => {
    setSleepIncrement(newSleepIncrement);
  };

  return (
    <SleepTrackingContext.Provider value={{ 
      sleepLogged, 
      logSleep, 
      sleepHistory, 
      dailySleepData, 
      sleepTarget, 
      updateSleepTarget, 
      sleepIncrement, 
      updateSleepIncrement 
    }}>
      {children}
    </SleepTrackingContext.Provider>
  );
};
