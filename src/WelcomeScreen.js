import * as React from "react";
import { StyleSheet, View, Text, StatusBar,Dimensions,Image ,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import { Color, FontSize, FontFamily, Border } from "./GlobalStyles";



  
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <Image source={require("../assets/Prosit.png")} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={["#fff7ad", "#ffa9f9"]}
        useAngle={true}
        angle={-90.00}
      >
        <Text style={styles.button1}>Get Started</Text>
      </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({

  logo:{
    width:width,
    height:height,
    resizeMode:"contain",
    bottom:20,
  },
  button1: {
    fontSize: FontSize.size_lg,
    lineHeight: 24,
    color: Color.whiteColor,
    textAlign: "center",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "800",
  },
  button: {
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    borderRadius: Border.br_80xl,
    width: 335,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    backgroundColor: Color.waterIntakeLinear,
    alignSelf: "center",
    position:'absolute',
    bottom:30,
    
  },
  container: {
    flex: 1,
    height: height,
    overflow: "hidden",
    backgroundColor: Color.whiteColor,
    width: width,
  },
});

export default WelcomeScreen;
