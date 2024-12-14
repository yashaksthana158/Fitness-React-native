import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {
  scale,
  moderateScale,
  verticalScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {Color, FontFamily, FontSize} from '../../GlobalStyles';
import {useNavigation, useRoute} from '@react-navigation/core';
import ImagePath from '../ImagePath';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BASE_URL from '../../Navigation/config';

const RegisterPage1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userEmail = route.params?.userEmail;
  const Genderdata = [
    {id: 1, Gender: 'Male'},
    {id: 2, Gender: 'Female'},
  ];
  const [Selecteditem, SetSelecteditem] = useState('Choose Gender');
  const [IsClicked, SetIsClicked] = useState(false);
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [Weight, SetWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('KG');
  const [height, Setheight] = useState('');
  const [heightUnit, setHeightUnit] = useState('CM');

  const showicon = () => {
    return !IsClicked ? ImagePath.dropdownicon : ImagePath.updownicon;
  };

  const toggleWeightUnit = () => {
    if (Weight !== '') {
      if (weightUnit === 'KG') {
        const lbs = parseFloat(Weight) * 2.20462; // Convert KG to LB
        SetWeight(lbs.toFixed(2));
        setWeightUnit('LB');
      } else {
        const kgs = parseFloat(Weight) / 2.20462; // Convert LB to KG
        SetWeight(kgs.toFixed(2));
        setWeightUnit('KG');
      }
    } else {
      setWeightUnit(weightUnit === 'KG' ? 'LB' : 'KG');
    }
  };

  const toggleHeightUnit = () => {
    if (height !== '') {
      if (heightUnit === 'CM') {
        const inches = parseFloat(height) * 0.393701; // Convert CM to IN
        Setheight(inches.toFixed(2));
        setHeightUnit('IN');
      } else {
        const cms = parseFloat(height) / 0.393701; // Convert IN to CM
        Setheight(cms.toFixed(2));
        setHeightUnit('CM');
      }
    } else {
      setHeightUnit(heightUnit === 'CM' ? 'IN' : 'CM');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setIsDatePickerVisible(false);
    setDob(currentDate.toISOString().split('T')[0]); // Format to YYYY-MM-DD
  };

  const handleProfileCompletion = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user-details/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          gender: Selecteditem.toLowerCase(),
          date_of_birth: dob,
          weight: Weight,
          weight_unit: weightUnit.toLowerCase(),
          height: height,
          height_unit: heightUnit.toLowerCase(),
        }),
      });

      const data = await response.json();
      console.log('Profile Completion Response:', data); // Log response data

      if (response.ok) {
        navigation.reset({
          index: 0,
          routes: [{name: 'ImageSlider', params: {userEmail: data.user_email}}],
        });
      } else {
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.registerPage2}
      keyboardShouldPersistTaps="handled">
      <View style={styles.vectorSectionIcon}>
        <Image
          resizeMode="cover"
          source={require('../../../assets/vectorsection.png')}
        />
      </View>

      <View style={styles.profileText}>
        <Text style={styles.letsCompleteYour}>Let’s complete your profile</Text>
        <Text style={styles.itWillHelp}>
          It will help us to know more about you!
        </Text>
      </View>

      <View style={styles.Inputcontainer}>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => SetIsClicked(!IsClicked)}>
          <Text style={{fontSize: 20}}>{Selecteditem}</Text>
          <Image style={styles.dropicon} source={showicon()} />
        </TouchableOpacity>

        {IsClicked ? (
          <Modal
            transparent={true}
            animationType="none"
            visible={IsClicked}
            onRequestClose={() => SetIsClicked(false)}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPressOut={() => SetIsClicked(false)}>
              <View style={styles.dropdownModal}>
                <TouchableOpacity
                  onPress={() => {
                    SetSelecteditem('Choose Gender');
                    SetIsClicked(false);
                  }}>
                  <Text style={styles.searchInput}>Choose Gender</Text>
                </TouchableOpacity>

                <FlatList
                  data={Genderdata}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={styles.renderdropitem}
                        onPress={() => {
                          SetSelecteditem(item.Gender);
                          SetIsClicked(false);
                        }}>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>
                          {item.Gender}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        ) : null}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.calendaricon} />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              onFocus={() => setIsDatePickerVisible(true)}
              onChangeText={text => setDob(text)}
            />

            {isDatePickerVisible && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()} // Optional: limit to current date
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.InptFields}>
          <Image style={styles.icon} source={ImagePath.weightscaleicon} />
          <TextInput
            style={styles.input}
            placeholder="Your Weight"
            value={Weight}
            onChangeText={text => SetWeight(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.right_text}
            activeOpacity={0.8}
            onPress={toggleWeightUnit}>
            <LinearGradient
              style={styles.right_text_gradient}
              locations={[0, 1]}
              colors={['#C58BF2', '#B4C0FE']}
              useAngle={true}
              angle={-90.0}>
              <Text>{weightUnit}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.InptFields}>
          <Image style={styles.icon} source={ImagePath.heighticon} />
          <TextInput
            style={styles.input}
            placeholder="Your Height"
            value={height}
            onChangeText={text => Setheight(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.right_text}
            activeOpacity={0.8}
            onPress={toggleHeightUnit}>
            <LinearGradient
              style={styles.right_text_gradient}
              locations={[0, 1]}
              colors={['#C58BF2', '#B4C0FE']}
              useAngle={true}
              angle={-90.0}>
              <Text>{heightUnit}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={handleProfileCompletion}>
          <LinearGradient
            style={styles.buttonLoginChild}
            locations={[0, 1]}
            colors={['#fff7ad', '#ffa9f9']}
            useAngle={true}
            angle={-90.0}>
            <View style={styles.iconlyboldloginParent}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  registerPage2: {
    flexGrow: 1,
    backgroundColor: Color.backgroundColor,
    padding: moderateScale(20),
    alignItems: 'center',
  },

  vectorSectionIcon: {
    width: moderateScale(375),
    height: verticalScale(220),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginTop: verticalScale(40),
  },
  letsCompleteYour: {
    fontSize: FontSize.titleH4Bold_size,
    color: Color.colorGray,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: '700',
  },
  itWillHelp: {
    marginTop: verticalScale(5),
    color: Color.gray1,
    textAlign: 'center',
    fontFamily: FontFamily.textSmallTextRegular,
    fontSize: FontSize.textSmallTextMedium_size,
  },

  Inputcontainer: {
    alignItems: 'center',
    width: moderateScale(340),
    height: verticalScale(250),
  },

  InptFields: {
    width: moderateScale(330),
    height: verticalScale(50),
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: moderateScale(10),
    borderRadius: 10,
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    fontSize: scale(18),
    height: verticalScale(50),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#f7f8f8',
  },

  icon: {
    width: moderateScale(20),
    height: verticalScale(20),
    marginLeft: moderateScale(10),
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    margin: moderateScale(20),
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: 10,
  },

  dropdownContainer: {
    marginTop: verticalScale(30),
    width: moderateScale(330),
    height: verticalScale(50),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
  },

  dropicon: {
    width: moderateScale(20),
    height: verticalScale(20),
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownModal: {
    width: moderateScale(320),
    borderRadius: 10,
    backgroundColor: Color.borderColor,
    padding: moderateScale(10),
  },

  searchInput: {
    height: verticalScale(40),
    fontSize: scale(18),
    borderBottomWidth: 1,
    borderColor: Color.gray1,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    backgroundColor: Color.borderColor,
  },

  renderdropitem: {
    height: verticalScale(40),
    borderBottomWidth: 1,
    borderColor: Color.gray3,
    backgroundColor: Color.borderColor,
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    justifyContent: 'center',
  },

  right_text: {
    width: moderateScale(40),
    height: verticalScale(40),
    right: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    overflow: 'hidden',
    borderRadius: 30,
  },

  right_text_gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonLogin: {
    width: moderateScale(330),
    height: verticalScale(50),
    margin: moderateVerticalScale(20),
    alignSelf: 'center',
  },
  buttonLoginChild: {
    borderRadius: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconlyboldloginParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconlyboldlogin: {
    width: moderateScale(18),
    height: verticalScale(18),
    paddingLeft: moderateScale(30),
  },
  login: {
    fontSize: scale(18),
    fontFamily: FontFamily.titleH4Bold,
    color: Color.gray1,
  },
});

export default RegisterPage1;
