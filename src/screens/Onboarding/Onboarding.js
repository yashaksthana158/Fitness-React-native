import React from "react";
import { Text, StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import LinearGradient from "react-native-linear-gradient";
import { FontSize, FontFamily, Color } from "../../GlobalStyles";

const Onboarding = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={["#fff7ad", "#ffa9f9"]}
        useAngle={true}
        angle={-90.00}
      >
      <StatusBar barStyle="dark-content" backgroundColor="#eeebe7" />
      <View style={styles.textSection}>
        <Text style={styles.trackYourGoal}>Track Your Goal</Text>
        <Text style={styles.dontWorryIf}>
          Don't worry if you have trouble determining your goals, We can help
          you determine your goals and track your goals.
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding1')} style={styles.buttonWrapper}>
        <Image
          style={styles.buttonIcon}
          resizeMode="cover"
          source={require("../../../assets/button.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.frameIcon}
        resizeMode="cover"
        source={require("../../../assets/frame.png")}
      /></LinearGradient>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  textSection: {
    position: "absolute",
    top: height * 0.58,
    left: 30,
    width: width - 60,
  },
  trackYourGoal: {
    fontSize: FontSize.titleH2Bold_size,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: FontFamily.titleH2Bold,
    color: Color.blackColor,
    textAlign: "left",
  },
  dontWorryIf: {
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
    height: height * 0.55,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Onboarding;
