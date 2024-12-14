import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WaterIntakeContext} from './WaterIntakeContext';
import Glass from './Glass';
import {
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const WaterIntake = () => {
  const navigation = useNavigation();
  const {
    waterIntake,
    addWater,
    maxIntake,
    dailyData,
    intakeHistory,
    incrementAmount,
  } = useContext(WaterIntakeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTargetClick = () => {
    navigation.navigate('WaterModule');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Intake</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dailyTracking}>
        {dailyData.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.date.split('-')[0]}</Text>
            <Text style={styles.monthText}>{day.date.split('-')[1]}</Text>
            <Text style={styles.intakeText}>
              {day.intake}/{maxIntake}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.glass}>
        <Glass amount={waterIntake} />
        <Text style={styles.waterIntake}>
          {waterIntake}/{maxIntake} ml
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addWater(incrementAmount)}>
        <Text style={styles.buttonText}>+{incrementAmount} ml</Text>
      </TouchableOpacity>

      {/* History Container */}
      <View style={styles.historyContainer}>
        <Text style={{backgroundColor:"grey",paddingHorizontal:10,paddinVertical:10,borderWidth:1,fontSize:20,fontWeight:"400"}}>History</Text>
        <FlatList
          data={intakeHistory}
          renderItem={({item}) => (
            <View style={styles.historyItemContainer}>
              <Text style={styles.historyItem}>
                {item.amount} ml {item.time}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.historyList}
        />
      </View>

      {/* Modal for Popup View */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleTargetClick}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: verticalScale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 0,
  },
  menuButtonText: {
    fontSize: scale(24),
  },
  dailyTracking: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    height: verticalScale(50),
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(10),
    height: verticalScale(70),
  },
  dayText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: scale(14),
    color: '#555',
  },
  glass: {
    height: verticalScale(240),
    justifyContent: 'center',
    alignItems: 'center',
  },
  intakeText: {
    fontSize: scale(12),
    color: '#888',
  },
  waterIntake: {
    fontSize: scale(25),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(18),
  },
  historyContainer: {
    flex: 1,
    width: '100%',
    marginVertical:verticalScale(5),
    paddingHorizontal: moderateScale(0),
    paddingVertical:verticalScale(0),
    borderWidth:1
   
  },
  historyItemContainer: {
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  historyList: {
    marginTop: verticalScale(5),
  },
  historyItem: {
    fontSize: scale(17),
    marginVertical: verticalScale(2),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: verticalScale(30),
    marginRight: moderateScale(10),
  },
  modalContainer: {
    width: moderateScale(150),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(10),
    elevation: 5,
    marginRight: moderateScale(18),
    marginVertical: verticalScale(0),
  },
  modalButton: {
    paddingVertical: verticalScale(0),
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: scale(18),
    color: '#007bff',
  },
});

export default WaterIntake;
