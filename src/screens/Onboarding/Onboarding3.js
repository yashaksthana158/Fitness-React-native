import React from "react";
import { Text, StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { FontSize, FontFamily, Color } from "../../GlobalStyles";

const Onboarding3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eeebe7" />
      <View style={styles.textSection}>
        <Text style={styles.improveSleepQuality}>Improve Sleep Quality</Text>
        <Text style={styles.improveTheQuality}>
          Improve the quality of your sleep with us, good quality sleep can
          bring a good mood in the morning.
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.buttonWrapper}>
        <Image
          style={styles.buttonIcon}
          resizeMode="cover"
          source={require("../../../assets/button3.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.frameIcon}
        resizeMode="cover"
        source={require("../../../assets/frame3.png")}
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  textSection: {
    position: "absolute",
    top: height * 0.64,
    left: 30,
    width: width - 60,
  },
  improveSleepQuality: {
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH2Bold,
    color: Color.blackColor,
    textAlign: "left",
  },
  improveTheQuality: {
    marginTop: 15,
    fontSize: FontSize.textMediumTextRegular_size,
    lineHeight: 21,
    fontFamily: FontFamily.textMediumTextRegular,
    color: Color.gray1,
    textAlign: "left",
  },
  buttonWrapper: {
    position: "absolute",
    top: height * 0.88,
    left: width * 0.76,
  },
  buttonIcon: {
    width: 60,
    height: 60,
  },
  frameIcon: {
    width: width,
    height: height * 0.58,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Onboarding3;
