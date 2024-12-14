import React from "react";
import { Text, StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { FontSize, FontFamily, Color } from "../../GlobalStyles";

const Onboarding1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eeebe7" />
      <View style={styles.textSection}>
        <Text style={styles.getBurn}>Get Burn</Text>
        <Text style={styles.letsKeepBurning}>
          Let’s keep burning, to achieve your goals, it hurts only temporarily,
          if you give up now you will be in pain forever.
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')} style={styles.buttonWrapper}>
        <Image
          style={styles.buttonIcon}
          resizeMode="cover"
          source={require("../../../assets/button1.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.frameIcon}
        resizeMode="cover"
        source={require("../../../assets/frame1.png")}
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
    top: height * 0.62,
    left: 30,
    width: width - 60,
  },
  getBurn: {
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH2Bold,
    color: Color.blackColor,
    textAlign: "left",
  },
  letsKeepBurning: {
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
    height: height * 0.54,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Onboarding1;
