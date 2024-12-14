import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';



const Splash = () => {

  const navigation = useNavigation()
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      if (isFirstLaunch === null) {
        // First launch
        await AsyncStorage.setItem('isFirstLaunch', 'true');
        setTimeout(() => {
          navigation.replace('Onboarding');
        }, 10000);
      } else {
        // Not first launch
        navigation.replace('Onboarding');
      }
    };

    checkFirstLaunch();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#eeebe7'} />
      <Image source={require("../assets/ProsA.png")} style={styles.logo} />
      {/* <View style={styles.bottomIcons}> */}
      {/* <Pressable onPress={() => console.log("Pressed button")} style={({ pressed }) => { return { opacity: pressed ? 0 : 1 } }}> */}
      {/* <Image source={require("../assets/arrow-right-circle-.png")} style={styles.circle_arrow} /> */}
      {/* </Pressable> */}
      {/* </View> */}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  logo: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomIcons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',

  },

  circle_arrow: {
    width: width * 0.2, // 10% of screen width
    height: width * 0.1, // keeping it square
    marginLeft: 110,

  },
  pressed: {
    opacity: 0
  },
  unpressed: {
    opacity: 1,
  }

});

export default Splash;