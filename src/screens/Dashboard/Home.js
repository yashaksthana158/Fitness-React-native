import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WaterIntakeProvider} from './Components/WaterIntake/WaterIntakeContext';
import WaterIntakeDashboard from './Components/WaterIntake/WaterIntakeDashboard';
import WaterIntake from './Components/WaterIntake/WaterIntake';
import {SleepTrackingProvider} from './Components/SleepTracking/SleepTrackingContext';
import SleepTrackingDashboard from './Components/SleepTracking/SleepTrackingDashboard';
import BASE_URL from '../../Navigation/config';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({route}) => {
const navigation=useNavigation()

  /* const route = useRoute(); */
  const { userName } = route.params || {}; 
  console.log('Route Params:', route.params);

  const [bmi, setBmi] = useState(20.1);
  const [bmi_category, setbmi_category]=useState('Normal')
  const [age, setage]=useState(0)
  const [waterIntake, setWaterIntake] = useState('4 Liters');
  const [sleep, setSleep] = useState('8h 20m');
  const [calories, setCalories] = useState('760 kCal');


  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/update-health-profile`, {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies) to send the session cookie
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            // Assuming the response contains the user's BMI and other details
            setBmi(data.bmi);
            setbmi_category(data.bmi_category);
            setage(data.age);
            /* setWaterIntake(data.waterIntake);
            setSleep(data.sleep);
            setCalories(data.calories); */
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUserData();
    }, []);
    
    // Mock data update
   /*  const mockData = {
      heartRate: 78,
      bmi: 20.1,
      waterIntake: '4 Liters',
      sleep: '8h 20m',
      calories: '760 kCal',
    };

    setBmi(mockData.bmi);
    setWaterIntake(mockData.waterIntake);
    setSleep(mockData.sleep);
    setCalories(mockData.calories);
  }, [];
 */
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.nameText}>{userName || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('WaterIntakeNavigator',{name:'Notification'})}}>
        <Image
          style={styles.notificationIcon}
          source={require('../../../assets/img/notification_active.png')}
        /></TouchableOpacity>
      </View>

      

      <View style={styles.card}>
        <Text style={styles.cardTitle}>BMI (Body Mass Index)</Text>
        <Text style={styles.cardSubtitle}>You have a {bmi_category} weight category</Text>
        <View style={styles.cardContent}>
          <Text style={styles.bmiText}>{bmi}</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>View More</Text>
        </TouchableOpacity>
      </View>

      <WaterIntakeProvider>
        <WaterIntakeDashboard currentIntake={0} />
      </WaterIntakeProvider>

      <SleepTrackingProvider>
        <SleepTrackingDashboard currentSleep={0} />
      </SleepTrackingProvider>


      {/*<View style={styles.todayTarget}>
        <Text style={styles.todayTargetText}>Today Target</Text>
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>

       <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{waterIntake}</Text>
          <Text style={styles.statLabel}>Water Intake</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{sleep}</Text>
          <Text style={styles.statLabel}>Sleep</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{age} Years</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      <View style={styles.workoutProgress}>
        <Text style={styles.workoutTitle}>Workout Progress</Text>
        <TouchableOpacity style={styles.weeklyButton}>
          <Text style={styles.weeklyButtonText}>Weekly</Text>
        </TouchableOpacity>
      </View> */}

     {/*  <View style={styles.latestWorkout}>
        <Text style={styles.latestWorkoutTitle}>Latest Workout</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreButtonText}>See more</Text>
        </TouchableOpacity>
        <View style={styles.workout}>
          <Image
            style={styles.workoutIcon}
            source={require('../../../assets/img/fullbody.png')}
          />
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutName}>Fullbody Workout</Text>
            <Text style={styles.workoutDetails}>
              180 Calories Burn | 20 minutes
            </Text>
          </View>
        </View>
        <View style={styles.workout}>
          <Image
            style={styles.workoutIcon}
            source={require('../../../assets/img/lowerbody.png')}
          />
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutName}>Lowerbody Workout</Text>
            <Text style={styles.workoutDetails}>
              200 Calories Burn | 30 minutes
            </Text>
          </View>
        </View> 
      </View>*/}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 90, // Added padding to ensure content doesn't overlap with bottom tabs
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 20,
    color: '#888',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bmiText: {
    fontSize: 40,
    color: '#000',
  },
  cardButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#92a3fd',
    borderRadius: 10,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  todayTarget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f0f4ff',
    borderRadius: 20,
  },
  todayTargetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  checkButton: {
    backgroundColor: '#9dceff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  workoutProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  weeklyButton: {
    backgroundColor: '#9dceff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  weeklyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  latestWorkout: {
    marginTop: 20,
  },
  latestWorkoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  seeMoreButton: {
    backgroundColor: '#9dceff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  seeMoreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  workout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  workoutIcon: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default HomeScreen;


/* 
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


const activityLevelMultipliers = {
  Sedentary: 1.2,
  "Lightly active": 1.375,
  "Moderately active": 1.55,
  "Very active": 1.725,
  "Extra active": 1.9,
};

const FitnessCalculatorScreen = () => {
  const [personInfo, setPersonInfo] = useState({
    age: 25,
    sex: 'Male',
    height: 1.65,
    weight: 70,
    activityLevel: 'Moderately active',
    goal: 'Lose Weight',
  });

  const [bmi, setBmi] = useState(null);
  const [bmiClass, setBmiClass] = useState('');
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [macros, setMacros] = useState({ protein: 0, fat: 0, carbs: 0 });

  const calculateBmi = () => {
    const { weight, height } = personInfo;
    const calculatedBmi = weight / height ** 2;
    let classification = '';
    if (calculatedBmi < 18.5) classification = 'underweight';
    else if (calculatedBmi < 25) classification = 'normal weight';
    else if (calculatedBmi < 30) classification = 'overweight';
    else classification = 'obese';
    setBmi(calculatedBmi);
    setBmiClass(classification);
  };

  const energyCalc = () => {
    const { sex, weight, height, age, activityLevel } = personInfo;
    let bmr = 0;
    if (sex === 'Male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.100 * height) - (4.330 * age);
    }
    const tdeeCalculated = bmr * activityLevelMultipliers[activityLevel];
    setBmr(bmr);
    setTdee(tdeeCalculated);
  };

  const macroPerc = (calories) => {
    const { goal } = personInfo;
    let proteinPercentage = 0, fatPercentage = 0;
    if (goal.toLowerCase() === 'lose weight') {
      proteinPercentage = 30;
      fatPercentage = 25;
    } else if (goal.toLowerCase() === 'maintain') {
      proteinPercentage = 25;
      fatPercentage = 30;
    } else if (goal.toLowerCase() === 'gain muscle') {
      proteinPercentage = 35;
      fatPercentage = 20;
    }
    const carbPercentage = 100 - (proteinPercentage + fatPercentage);

    const protein = (proteinPercentage / 100) * calories / 4;
    const fat = (fatPercentage / 100) * calories / 9;
    const carbs = (carbPercentage / 100) * calories / 4;

    setMacros({ protein, fat, carbs });
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>Fitness Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={personInfo.age.toString()}
        onChangeText={(text) => setPersonInfo({ ...personInfo, age: parseInt(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (m)"
        keyboardType="numeric"
        value={personInfo.height.toString()}
        onChangeText={(text) => setPersonInfo({ ...personInfo, height: parseFloat(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={personInfo.weight.toString()}
        onChangeText={(text) => setPersonInfo({ ...personInfo, weight: parseFloat(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Activity Level (Sedentary, Lightly active, etc.)"
        value={personInfo.activityLevel}
        onChangeText={(text) => setPersonInfo({ ...personInfo, activityLevel: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal (Lose Weight, Maintain, Gain Muscle)"
        value={personInfo.goal}
        onChangeText={(text) => setPersonInfo({ ...personInfo, goal: text })}
      />
      <Button title="Calculate BMI" onPress={calculateBmi} />
      <Text>BMI: {bmi ? bmi.toFixed(2) : '-'}</Text>
      <Text>BMI Classification: {bmiClass}</Text>

      <Button title="Calculate Energy Needs" onPress={() => { energyCalc(); macroPerc(tdee); }} />
      <Text>BMR: {bmr ? bmr.toFixed(2) : '-'}</Text>
      <Text>TDEE: {tdee ? tdee.toFixed(2) : '-'}</Text>

      <Text>Macros (g):</Text>
      <Text>Protein: {macros.protein.toFixed(2)}</Text>
      <Text>Fat: {macros.fat.toFixed(2)}</Text>
      <Text>Carbs: {macros.carbs.toFixed(2)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  /* animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  }, */
/* });

export default FitnessCalculatorScreen;
 */

/* import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const activityLevelMultipliers = {
  Sedentary: 1.2,
  "Lightly active": 1.375,
  "Moderately active": 1.55,
  "Very active": 1.725,
  "Extra active": 1.9,
};

const HomeScreen = () => {
  const [personInfo, setPersonInfo] = useState({
    age: 25,
    sex: 'Male',
    height: 1.75,
    weight: 70,
    activityLevel: 'Moderately active',
    goal: 'Lose Weight',
  });

  const [bmi, setBmi] = useState(null);
  const [bmiClass, setBmiClass] = useState('');
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [macros, setMacros] = useState({ protein: 0, fat: 0, carbs: 0 });

  useEffect(() => {
    calculateBmi();
    energyCalc();
  }, [personInfo]);

  const calculateBmi = () => {
    const { weight, height } = personInfo;
    const calculatedBmi = weight / height ** 2;
    let classification = '';
    if (calculatedBmi < 18.5) classification = 'Underweight';
    else if (calculatedBmi < 25) classification = 'Normal Weight';
    else if (calculatedBmi < 30) classification = 'Overweight';
    else classification = 'Obese';
    setBmi(calculatedBmi);
    setBmiClass(classification);
  };

  const energyCalc = () => {
    const { sex, weight, height, age, activityLevel } = personInfo;
    let bmr = 0;
    if (sex === 'Male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.100 * height * 100) - (4.330 * age);
    }
    const tdeeCalculated = bmr * activityLevelMultipliers[activityLevel];
    setBmr(bmr);
    setTdee(tdeeCalculated);
    macroPerc(tdeeCalculated);
  };

  const macroPerc = (calories) => {
    const { goal } = personInfo;
    let proteinPercentage = 0, fatPercentage = 0;
    if (goal.toLowerCase() === 'lose weight') {
      proteinPercentage = 30;
      fatPercentage = 25;
    } else if (goal.toLowerCase() === 'maintain') {
      proteinPercentage = 25;
      fatPercentage = 30;
    } else if (goal.toLowerCase() === 'gain muscle') {
      proteinPercentage = 35;
      fatPercentage = 20;
    }
    const carbPercentage = 100 - (proteinPercentage + fatPercentage);

    const protein = (proteinPercentage / 100) * calories / 4;
    const fat = (fatPercentage / 100) * calories / 9;
    const carbs = (carbPercentage / 100) * calories / 4;

    setMacros({ protein, fat, carbs });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>BMI (Body Mass Index)</Text>
        <Text style={styles.cardValue}>{bmi ? bmi.toFixed(2) : '-'}</Text>
        <Text style={styles.cardSubtitle}>{bmiClass}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>BMR (Basal Metabolic Rate)</Text>
        <Text style={styles.cardValue}>{bmr ? bmr.toFixed(2) : '-'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>TDEE (Total Daily Energy Expenditure)</Text>
        <Text style={styles.cardValue}>{tdee ? tdee.toFixed(2) : '-'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Macros (g)</Text>
        <Text style={styles.cardSubtitle}>Protein: {macros.protein.toFixed(2)}</Text>
        <Text style={styles.cardSubtitle}>Fat: {macros.fat.toFixed(2)}</Text>
        <Text style={styles.cardSubtitle}>Carbs: {macros.carbs.toFixed(2)}</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
 */
