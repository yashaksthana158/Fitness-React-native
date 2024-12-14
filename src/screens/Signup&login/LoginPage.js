import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import BASE_URL from '../../Navigation/config';
import {FontFamily, Border, Color, FontSize} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/core';
import ImagePath from '../ImagePath';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getAuth, signInWithCredential, GoogleAuthProvider} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebaseConfig'; // Your Firebase configuration

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const auth = getAuth(app); */

const {width, height} = Dimensions.get('window');

const LoginPage = () => {
  const navigation = useNavigation();

  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const [visibility_off, SetVisibility] = useState(false);

  

  

  const showicon = () => {
    return visibility_off ? ImagePath.visible_off : ImagePath.visible_on;
  };

  const handleLogin = async () => {
    const requestBody = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include', // Include credentials (cookies) in the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        // Reset navigation and pass the userName to the next screen
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'TabNavigator',
              params: {
                userName: data.userName, // Pass user's name to the next screen
              },
            },
          ],
        });
      } else {
        const errorData = await response.json(); // Fetch the error details from the response
        console.error('Error:', errorData.error); // Use the error message returned from API
      }
    } catch (error) {
      console.error('Error:', error); // Log any network or fetch-related errors
    }
  };

   /* const GooglesLogIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user_info', userInfo);

      // Send the Google ID token to your backend for authentication
      const idToken = userInfo.idToken;

      const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ google_token: idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.profile_complete) {
          // Navigate to main app screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen', params: { userName: data.userName } }],
          });
        } else {
          // Navigate to profile completion screen
          navigation.navigate('ProfileCompletion', { user_email: userInfo.user.email });
        }
      } else {
        // Handle errors
        console.error('Login error:', data.error);
      }
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Sign in cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign in in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            break;
          default:
            console.log('An unexpected error occurred:', error);
        }
      } else {
        console.log('An error occurred:', error);
      }
    }
  }; */
  return (
    <View style={styles.loginPage}>
      <View style={styles.titleSection}>
        <Text style={styles.heyThere}>Hey there,</Text>
        <Text style={styles.welcomeBack}>Welcome Back</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.InptFields}>
          <Image style={styles.icon} source={ImagePath.email} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => SetEmail(text)}
            value={Email}
          />
        </View>
        {/* --------------------------------------------password Input-------------------------------------------------------------------------------------- */}
        <View style={styles.label}>
          <View style={styles.InptFields}>
            <Image style={styles.icon} source={ImagePath.lock} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={text => SetPassword(text)}
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

          <View style={[styles.forgetPasswordView]}>
            <Text style={[styles.forgotYourPassword]}>
              Forgot your password?
            </Text>
          </View>
        </View>
      </View>
      {/* ---------------------------------------------------------------------------------------------- */}
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <LinearGradient
          style={styles.buttonLoginChild}
          locations={[0, 1]}
          colors={['#fff7ad', '#ffa9f9']}
          useAngle={true}
          angle={-90.0}>
          <View style={styles.iconlyboldloginParent}>
            <Image
              style={styles.iconlyboldlogin}
              resizeMode="cover"
              source={ImagePath.iconlyboldlogin}
            />
            <Text style={styles.login}>Login</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.or}>
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
      </View>

      <View style={styles.loginSocialMedia}>
        <View style={[styles.rectangleParent, styles.groupLayout]}>
          <TouchableOpacity
            style={[styles.groupChild, styles.childBorder]}        //onPress={GooglesLogIn}
            >
            <Image
              style={styles.iconPosition}
              resizeMode="cover"
              source={ImagePath.googlelogo}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerText}>
        <Text style={styles.dontHaveAn}>Don’t have an account yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    alignItems: 'center',
    padding: 20,
  },
  titleSection: {
    marginTop: '20%', // Adjust based on device height
    alignItems: 'center',
    width: '80%',
    height: '20%',
  },
  heyThere: {
    color: Color.colorGray,
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
  },
  welcomeBack: {
    marginTop: 10,
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 30,
    left: 0,
    color: Color.colorGray,
    fontWeight: '700',
  },
  inputSection: {
    width: '100%',
    marginBottom: height * 0.02, // Adjust based on device height
  },
  label: {
    height: height * 0.06, // Adjust based on device height
    marginBottom: height * 0.01, // Adjust based on device height
  },

  forgetPasswordView: {},

  forgotYourPassword: {
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'solid black',
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextMedium_size,
    alignSelf: 'center',
    position: 'absolute',
    textDecoration: 'underline',
  },
  buttonLogin: {
    width: '100%',
    height: height * 0.08, // Adjust based on device height
    top: height * 0.2, // Adjust based on device height
  },
  buttonLoginChild: {
    borderRadius: Border.br_80xl,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconlyboldloginParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconlyboldlogin: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  login: {
    fontSize: FontSize.textLargeTextRegular_size,
    fontFamily: FontFamily.titleH4Bold,
    color: Color.gray1,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.3, // Adjust based on device height
  },
  orText: {
    top: '50%',
    marginHorizontal: 10,
    color: Color.colorGray,
    fontSize: FontSize.textSmallTextMedium_size,
  },
  orLine: {
    top: '50%',
    height: 2,
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  loginSocialMedia: {
    bottom: '5%',
  },
  groupLayout: {
    width: 50,
    height: 50,
    top: 0,
  },
  childBorder: {
    borderStyle: 'solid',
    borderRadius: Border.br_sm,
    position: 'absolute',
  },
  groupChild: {
    borderColor: Color.colorGainsboro,
    borderWidth: 0.8,
    width: 50,
    height: 50,
  },
  rectangleParent: {
    position: 'absolute',
    alignSelf: 'center',
  },

  iconPosition: {
    height: 20,
    width: 20,
    left: 15,
    top: 15,
    position: 'absolute',
  },

  registerText: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '10%',
  },
  dontHaveAn: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    fontFamily: FontFamily.textSmallTextRegular,
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
    margin: moderateScale(10),
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

  register: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: '700',
    color: Color.colorGray,
  },
});

export default LoginPage;
