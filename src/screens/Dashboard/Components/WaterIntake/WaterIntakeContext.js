import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WaterIntakeContext = createContext();

export const WaterIntakeProvider = ({ children }) => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [maxIntake, setMaxIntake] = useState(2000); // Default max intake value
  const [incrementAmount, setIncrementAmount] = useState(100); // Default increment amount

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedWaterIntake = await AsyncStorage.getItem('waterIntake');
        const storedHistory = await AsyncStorage.getItem('intakeHistory');
        const storedDailyData = await AsyncStorage.getItem('dailyData');
        const storedMaxIntake = await AsyncStorage.getItem('maxIntake');
        const storedIncrementAmount = await AsyncStorage.getItem('incrementAmount');

        if (storedWaterIntake !== null) setWaterIntake(JSON.parse(storedWaterIntake));
        if (storedHistory !== null) setIntakeHistory(JSON.parse(storedHistory));
        if (storedDailyData !== null) setDailyData(JSON.parse(storedDailyData));
        if (storedMaxIntake !== null) setMaxIntake(JSON.parse(storedMaxIntake));
        if (storedIncrementAmount !== null) setIncrementAmount(JSON.parse(storedIncrementAmount));
      } catch (e) {
        console.error('Failed to load data from storage', e);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('waterIntake', JSON.stringify(waterIntake));
        await AsyncStorage.setItem('intakeHistory', JSON.stringify(intakeHistory));
        await AsyncStorage.setItem('dailyData', JSON.stringify(dailyData));
        await AsyncStorage.setItem('maxIntake', JSON.stringify(maxIntake));
        await AsyncStorage.setItem('incrementAmount', JSON.stringify(incrementAmount));
      } catch (e) {
        console.error('Failed to save data to storage', e);
      }
    };

    saveData();
  }, [waterIntake, intakeHistory, dailyData, maxIntake, incrementAmount]);

  const addWater = async (amount) => {
    try {
      // Send the water intake data to the backend
      const response = await fetch('http://your-backend-domain/api/water-intake/', {
        method: 'POST',
        credentials: 'include',  // Important for sending cookies with the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add water intake');
      }
  
      const newWaterIntake = await response.json();
  
      // Update local state
      setWaterIntake(prevIntake => Math.min(prevIntake + amount, maxIntake));
      setIntakeHistory([{ amount, time: new Date().toLocaleTimeString() }, ...intakeHistory]);
  
      // Update daily data
      const today = new Date();
      const todayKey = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const updatedDailyData = dailyData.map(day =>
        day.date === todayKey ? { ...day, intake: waterIntake } : day
      );
  
      if (!updatedDailyData.some(day => day.date === todayKey)) {
        updatedDailyData.push({ date: todayKey, intake: waterIntake });
      }
  
      setDailyData(updatedDailyData);
    } catch (error) {
      console.error('Error adding water intake:', error);
    }
  };
  




  

  const updateMaxIntake = (newMaxIntake) => {
    setMaxIntake(newMaxIntake);
  };

  const updateIncrementAmount = (newIncrementAmount) => {
    setIncrementAmount(newIncrementAmount);
  };

  return (
    <WaterIntakeContext.Provider value={{ 
      waterIntake, 
      addWater, 
      intakeHistory, 
      dailyData, 
      maxIntake, 
      updateMaxIntake, 
      incrementAmount, 
      updateIncrementAmount 
    }}>
      {children}
    </WaterIntakeContext.Provider>
  );
};
