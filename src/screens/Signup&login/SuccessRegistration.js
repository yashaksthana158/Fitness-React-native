import * as React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import {Color, FontSize, FontFamily, Border} from '../../GlobalStyles';
import ImagePath from '../ImagePath';

const SuccessRegistration = ({route}) => {
  const navigation = useNavigation();
  const {userName = 'User', userEmail} = route.params || {}; // Receiving userId and userName from navigation params
  const handleGoToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{
        name: 'LoginPage'
      }],
    });
  };
  

  return (
    <View style={styles.successRegistration}>
      <Image
        style={styles.groupIcon}
        resizeMode="cover"
        source={ImagePath.group3}
      />
      <View style={styles.titleSection}>
        <View style={[styles.onboardDescription, styles.onboardFlexBox]}>
          <Text style={styles.youAreAll}>
            You are all set now, let’s reach your goals together with us
          </Text>
        </View>
        <View style={[styles.onboardTitle, styles.onboardFlexBox]}>
          <Text style={styles.welcomeTypo}>{`Welcome, `}</Text>
          <Text style={[styles.stefani, styles.welcomeTypo]}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleGoToHome}>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#92a3fd', '#9dceff']}
          useAngle={true}
          angle={-85.58}>
          <Text style={styles.button1}>Go To Home</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  onboardFlexBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeTypo: {
    color: Color.blackColor,
    lineHeight: 30,
    fontSize: FontSize.titleH2Bold_size,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: '700',
    textAlign: 'center',
  },
  groupIcon: {
    width: 278,
    height: 304,
  },
  youAreAll: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    lineHeight: 20,
    fontFamily: FontFamily.textCaptionRegular,
    color: Color.gray1,
    textAlign: 'center',
    width: 220,
  },
  onboardDescription: {
    top: 35,
    left: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stefani: {
    marginLeft: 1,
  },
  onboardTitle: {
    top: 0,
    left: 15,
    height: 30,
    flexDirection: 'row',
  },
  titleSection: {
    height: 71,
    marginTop: 50,
    width: 214,
  },
  button1: {
    fontSize: FontSize.textLargeTextSemiBold_size,
    lineHeight: 24,
    color: Color.whiteColor,
    textAlign: 'left',
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: '700',
  },
  button: {
    shadowColor: 'rgba(149, 173, 254, 0.3)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    borderRadius: Border.br_80xl,
    width: 335,
    justifyContent: 'space-between',
    paddingHorizontal: 123,
    paddingVertical: 18,
    backgroundColor: Color.waterIntakeLinear,
    flexDirection: 'row',
    marginTop: verticalScale(140),
  },
  successRegistration: {
    backgroundColor: Color.backgroundColor,
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 100,
    alignItems: 'center',
  },
});

export default SuccessRegistration;
