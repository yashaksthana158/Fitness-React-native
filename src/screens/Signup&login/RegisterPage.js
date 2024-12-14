import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import CheckBox from 'react-native-check-box';
import {FontSize, FontFamily, Color, Border} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/core';
import ImagePath from '../ImagePath';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BASE_URL from '../../Navigation/config';

const {width, height} = Dimensions.get('window');

const RegisterPage = () => {
  const navigation = useNavigation();

  const [FirstName, SetFirstName] = useState('');
  const [LastName, SetLastName] = useState('');
  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const [visibility_off, SetVisibility] = useState(false);

  const showicon = () => {
    return visibility_off ? ImagePath.visible_off : ImagePath.visible_on;
  };
  const [isChecked, setIsChecked] = useState(false);


  const handleRegister = async () => {
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: FirstName,
          last_name: LastName,
          email: Email,
          password: Password,
        }),
      });
  
      const data = await response.json();
      console.log("Register Response:", data); // Log response data
  
      if (response.ok) {
        navigation.reset({
          index: 0,
          routes: [{name: 'RegisterPage1', params: {userEmail: data.user_email}}],
        }); // Navigate to RegisterPage1
        
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.register}
      keyboardShouldPersistTaps="handled">
      <View style={styles.registerPage1}>
        <View style={styles.title}>
          <Text style={styles.heythere}>Hey there,</Text>
          <Text style={styles.createanaccount}>Create an Account</Text>
        </View>
        {/*---------------------------------------------First NameField--------------------------------------------------------------------------- */}
        <View style={styles.inputContainer}>
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.profile} />
            <TextInput
              style={styles.input}
              placeholder="FirstName"
              onChange={text => SetFirstName(text.nativeEvent.text)}
              value={FirstName}
            />
          </View>
          {/*---------------------------------------------Last Name Field--------------------------------------------------------------------------- */}
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.profile} />
            <TextInput
              style={styles.input}
              placeholder="LastName"
              onChange={text => SetLastName(text.nativeEvent.text)}
              value={LastName}
            />
          </View>
          {/*---------------------------------------------Email Field--------------------------------------------------------------------------- */}
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.email} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChange={text => SetEmail(text.nativeEvent.text)}
              value={Email}
            />
          </View>
          {/*-----------------------------------------------------------------Password Field--------------------------------------------------------------------------- */}
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.lock} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChange={text => SetPassword(text.nativeEvent.text)}
              secureTextEntry={visibility_off}
              value={Password}
            />
            <TouchableOpacity
              style={styles.hidepassword}
              activeOpacity={0.8}
              onPress={() => SetVisibility(!visibility_off)}>
              <Image
                style={styles.hidepasswordimg}
                resizeMode="cover"
                source={showicon()}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*-------------------------------------------CheckBox--------------------------------------------- */}
        <CheckBox
          style={styles.checkBox}
          onClick={() => setIsChecked(!isChecked)}
          isChecked={isChecked}
          rightText={'I agree to the Terms and Conditions'}
          rightTextStyle={styles.checkBoxText}
          checkBoxColor={Color.colorGray}
        />

       {/*  <View style={styles.or}>
          <Image
            style={styles.orLine}
            resizeMode="cover"
            source={ImagePath.vector67}
          />
          <Text style={styles.orText}>Or</Text>
          <Image
            style={styles.orLine}
            resizeMode="cover"
            source={ImagePath.vector68}
          />
        </View> */}

        {/* <TouchableOpacity style={styles.loginSocialMedia}>
          <Image
            style={styles.googleiconPosition}
            resizeMode="cover"
            source={ImagePath.googlelogo}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.buttonregisterview}
          onPress={handleRegister}>
          <LinearGradient
            style={styles.buttonregistergradient}
            locations={[0, 1]}
            colors={['#fff7ad', '#ffa9f9']}
            useAngle={true}
            angle={-90.0}>
            <Text style={styles.login}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.registerText}>
          <Text style={styles.dontHaveAn}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.register}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  registerPage1: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    resizeMode: 'contain',
  },
  title: {
    width: moderateScale(380),
    height: verticalScale(90),
    borderWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heythere: {
    fontSize: 15,
    color: '#000',
  },
  createanaccount: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },

  input: {
    fontSize: scale(18),
    width: moderateScale(250),
    height: verticalScale(50),
    borderWidth: 0,
    borderColor: 'blue',
    alignSelf: 'center',
    marginLeft: moderateScale(10),
    backgroundColor: '#f7f8f8',
  },

  icon: {
    width: moderateScale(20),
    height: verticalScale(20),
    alignSelf: 'flex-start',
    position: 'absolute',
    marginLeft: 10,
  },

  InptFields: {
    width: moderateScale(330),
    height: verticalScale(60),
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    margin: moderateScale(12),
    borderRadius: 10,
    borderColor: '#f7f8f8',
    backgroundColor: '#f7f8f8',
  },
  hidepassword: {
    width: moderateScale(30),
    height: verticalScale(20),
    right: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: moderateScale(15),
    borderWidth: 0,
    position: 'absolute',
    backgroundColor: '#f7f8f8',
  },
  hidepasswordimg: {
    width: moderateScale(20),
    height: verticalScale(20),
    tintColor: 'rgba(0,0,0,0.4)',
  },

  checkBox: {
    marginVertical: 10,
    width: '100%',
    marginLeft: moderateScale(10),
  },
  checkBoxText: {
    fontSize: 14,
    color: '#1d1617',
  },
  buttonregisterview: {
    width: moderateScale(350),
    height: verticalScale(55), // Adjust based on device height
    marginTop: verticalScale(80), // Adjust based on device height
  },
  buttonregistergradient: {
    borderRadius: Border.br_80xl,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* iconlyboldloginParent: {
    flexDirection: "row",
    alignItems: "center",
  },*/
  login: {
    fontSize: FontSize.textLargeTextRegular_size,
    fontFamily: FontFamily.titleH4Bold,
    color: Color.gray1,
  },
  /*or: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20, // Adjust based on device height
  },
  orText: {
    marginHorizontal: 10,
    color: Color.colorGray,
    fontSize: FontSize.textSmallTextMedium_size,
  },
  orLine: {
    height: 2,
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
   loginSocialMedia: {
    //  borderWidth:1,
    //  borderColor:"blue",
    margin: 10,
    // backgroundColor:"red",
    alignItems: 'center',
  },
  googleiconPosition: {
    height: verticalScale(30),
    width: moderateScale(30),
  }, */
  registerText: {
    top: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dontHaveAn: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  register: {
    flex:1,
    fontSize: FontSize.textMediumTextSemiBold_size,
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: '700',
    color: Color.gray1,
  },
});

export default RegisterPage;
