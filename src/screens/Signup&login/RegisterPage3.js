import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FontFamily, Color, FontSize} from '../../GlobalStyles';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import ImagePath from '../ImagePath';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const RegisterPage3 = ({handleCheckboxToggle, isSelected, goalType='Lean & Tone'}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          width: width,
          height: verticalScale(480),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity  style={styles.touchableOpacity}>
          <LinearGradient
            style={styles.linearGradient}
            locations={[0, 1]}
            colors={['#ffb6c1', '#ff69b4']}
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
                style={{
                  marginTop: verticalScale(50),
                  marginBottom: verticalScale(30),
                  height: verticalScale(260),
                  width: moderateScale(200),
                }}
                resizeMode="cover"
                source={ImagePath.Rvector2}
              />
              <View style={{alignItems: 'center'}}>
                <View style={styles.cardTitle}>
                  <Text style={styles.leanAndTone}>Lean & Tone</Text>
                  <Image
                    style={{alignSelf: 'center', margin: 5}}
                    resizeMode="cover"
                    source={ImagePath.lineUnderText}
                  />
                </View>
                <Text style={{textAlign: 'center', width: moderateScale(250)}}>
                  I’m “skinny fat”. I look thin but have no shape. I want to add
                  lean muscle in the right way.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: moderateScale(50),
  },
  cardTitle: {
    margin: verticalScale(10),
  },
  leanAndTone: {
    fontSize: FontSize.size_5xl,
    color: Color.black,
    fontFamily: FontFamily.robotoRegular,
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
});

export default RegisterPage3;
