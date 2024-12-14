import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {FontFamily, Color, FontSize, Border} from '../../GlobalStyles';
import {useNavigation, useRoute} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../ImagePath';
import BASE_URL from '../../Navigation/config';

const {height, width} = Dimensions.get('window');

// Combined component to handle all goal types
const GoalComponent = ({goalType, description, imageSource, isSelected, handleCheckboxToggle}) => (
  <View style={styles.card}>
    <View
      style={{
        width: width,
        height: verticalScale(480),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={styles.touchableOpacity}>
        <LinearGradient
          style={styles.linearGradient}
          locations={[0, 1]}
          colors={['#ff7e5f', '#feb47b']}
          useAngle={true}
          angle={-90.0}>
          <View style={styles.innerContent}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                {backgroundColor: isSelected ? '#ff69b4' : 'white'},
              ]}
              onPress={() => handleCheckboxToggle(goalType)}
            />
            <Image
              style={styles.image}
              resizeMode="contain"
              source={imageSource}
            />
            <View style={{alignItems: 'center'}}>
              <View style={styles.cardTitle}>
                <Text style={styles.goalText}>{goalType}</Text>
                <Image
                  style={{alignSelf: 'center', margin: 5, width: moderateScale(50)}}
                  resizeMode="cover"
                  source={ImagePath.lineUnderText}
                />
              </View>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

const ImageSlider = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userEmail = route.params?.userEmail;

  const [currentId, setCurrentId] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pages = [
    {id: '1', goalType: 'Improve Shape', description: 'I have a low amount of body fat and need / want to build more muscle', imageSource: ImagePath.Rvector1},
    {id: '2', goalType: 'Lean & Tone', description: 'I’m “skinny fat”. I look thin but have no shape. I want to add lean muscle in the right way.', imageSource: ImagePath.Rvector2},
    {id: '3', goalType: 'Lose Fat', description: 'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass.', imageSource: ImagePath.Rvector3},
  ];

  const handleCheckboxToggle = goalType => {
    setSelectedGoal(goalType);
  };
  
  const submitGoals = async () => {
    if (!selectedGoal || isLoading) {
      console.warn('No goal selected or already submitting');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch(`${BASE_URL}/update-goal/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_email: userEmail.trim().toLowerCase(),
          goal_type: selectedGoal,
          goal_description: `Description for ${selectedGoal}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigation.reset({
          index: 0,
          routes: [{
            name: 'SuccessRegistration',
            params: {
              userName: data.userName,
            },
          }],
        });        
      } else {
        const errorData = await response.json();
        console.warn('Server response:', errorData);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.whatIsYour}>What is your goal?</Text>
        <Text style={styles.itWillHelp}>
          It will help us to choose the best program for you
        </Text>
      </View>
      <View style={{height: verticalScale(480)}}>
      <FlatList
          data={pages}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            const currentIndex = Math.round(x / width);
            setCurrentId(currentIndex);
          }}
          renderItem={({item}) => (
            <GoalComponent
              goalType={item.goalType}
              description={item.description}
              imageSource={item.imageSource}
              handleCheckboxToggle={handleCheckboxToggle}
              isSelected={selectedGoal === item.goalType}
            />
          )}
          getItemLayout={(data, index) => (
            {length: width, offset: width * index, index}
          )}
          initialScrollIndex={currentId}
          extraData={selectedGoal} // Added to ensure re-render when selectedGoal changes
        />
      </View>

      <View style={styles.indicatorContainer}>
        {pages.map((item, id) => (
          <View
            key={id}
            style={[
              styles.indicator,
              {
                width: currentId === id ? 10 : 8,
                backgroundColor: currentId === id ? 'green' : 'grey',
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.buttonregisterview} onPress={submitGoals} disabled={isLoading}>
        <LinearGradient
          style={styles.buttonregistergradient}
          locations={[0, 1]}
          colors={['#43cea2', '#185a9d']}
          useAngle
          angle={-90.0}>
          <Text style={styles.login}>Confirm</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.backgroundColor,
  },
  titleSection: {
    alignSelf: 'center',
    height: verticalScale(120),
    width: moderateScale(190),
    alignItems: 'center',
  },
  whatIsYour: {
    fontSize: scale(20),
    alignSelf: 'center',
    color: Color.colorGray,
    paddingTop: verticalScale(30),
    fontWeight: '900',
  },
  itWillHelp: {
    alignSelf: 'center',
    fontSize: scale(12),
    paddingTop: verticalScale(10),
    color: Color.gray1,
    textAlign: 'center',
    fontFamily: FontFamily.textSmallTextRegular,
  },
  buttonregisterview: {
    width: moderateScale(350),
    height: verticalScale(50),
    margin: 10,
  },
  buttonregistergradient: {
    borderRadius: Border.br_80xl,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  login: {
    color: 'white',
    fontSize: FontSize.size_4xl,
    fontFamily: FontFamily.robotoRegular,
  },
  card: {
    height: verticalScale(480),
  },
  touchableOpacity: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(70),
  },
  cardTitle: {
    margin: verticalScale(10),
  },
  goalText: {
    fontSize: FontSize.size_5xl,
    color: Color.black,
    fontFamily: FontFamily.robotoRegular,
  },
  descriptionText: {
    textAlign: 'center',
    width: moderateScale(200),
  },
  checkbox: {
    position: 'absolute',
    top: verticalScale(20),
    right: moderateScale(20),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(24),
    borderWidth: moderateScale(2),
    borderColor: '#000',
  },
  image: {
    marginTop: verticalScale(50),
    marginBottom: verticalScale(30),
    height: verticalScale(260),
    width: moderateScale(200),
    aspectRatio: 0.7,
    resizeMode:"contain",
    
  },
});

export default ImageSlider;
