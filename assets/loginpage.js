import * as React from "react";
import { Text, StyleSheet, View, Image,Dimensions,TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily, Border, Color, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.loginPage}>
      <View style={styles.titleSection}>
        <Text style={[styles.heyThere, styles.heyTherePosition]}>
          Hey there,
        </Text>
        <Text style={[styles.welcomeBack, styles.loginTypo]}>Welcome Back</Text>
      </View>
      <View style={[styles.buttonLogin, styles.orLayout1]}>

        <LinearGradient
          style={[styles.buttonLoginChild, styles.labelChildPosition]}
          locations={[0, 1]}
          colors={["#fff7ad", "#ffa9f9"]}
          useAngle={true}
          angle={-90.00}
        >

        <View style={styles.iconlyboldloginParent}>
          <Image
            style={styles.iconlyboldlogin}
            resizeMode="cover"
            source={require("../../../assets/iconlyboldlogin.png")}
          />
          <Text style={[styles.login, styles.loginTypo]}>Login</Text>
        </View>
        </LinearGradient>
      </View>

      <View style={[styles.or, styles.orLayout]}>
        <Text style={styles.or1}>Or</Text>
        <Image
          style={[styles.orChild, styles.orItemPosition]}
          resizeMode="cover"
          source={require("../../../assets/vector-67.png")}
        />
        <Image
          style={[styles.orItem, styles.orItemPosition]}
          resizeMode="cover"
          source={require("../../../assets/vector-68.png")}
        />
      </View>


      <View style={styles.registerText}>
        <Text style={[styles.dontHaveAnContainer, styles.heyTherePosition]}>
          <Text style={styles.dontHaveAn}>{'Don’t have an account yet?'} </Text>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.registerTypo}>Register</Text></TouchableOpacity>
        </Text>
      </View>


      <View style={styles.loginSocialMedia}>
        <View style={[styles.rectangleParent, styles.groupLayout]}>
          <View style={[styles.groupChild, styles.childBorder]} />
          <Image
            style={styles.iconPosition}
            resizeMode="cover"
            source={require("../../../assets/googlelogopngsuiteeverythingyouneedknowaboutgooglenewest0-2.png")}
          />
        </View>
        
      {/*   <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={[styles.groupChild, styles.childBorder]} />
          <Image
            style={[styles.facebook1Icon, styles.iconPosition]}
            resizeMode="cover"
            source={require("../../../assets/facebook-1.png")}
          />
        </View>*/}
      </View>


      <View style={[styles.labelSection, styles.orLayout1]}>
        <View style={[styles.forgetPassword, styles.orLayout]}>
          <Text style={[styles.forgotYourPassword, styles.passwordTypo]}>
            Forgot your password?
          </Text>
        </View>
        <View style={[styles.label, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <View style={[styles.labelBgChild, styles.childBorder]} />
          </View>
          <View style={[styles.placeholder, styles.placeholderPosition]}>
            <Image
              style={[styles.iconlylightmessage, styles.hidePasswordIconLayout]}
              resizeMode="cover"
              source={require("../../../assets/iconlylightmessage.png")}
            />
            <Text style={[styles.email, styles.passwordTypo]}>Email</Text>
          </View>
        </View>
        <View style={[styles.label1, styles.labelLayout]}>
          <View style={[styles.labelBg, styles.labelChildPosition]}>
            <View style={[styles.labelBgChild, styles.childBorder]} />
          </View>
          <Image
            style={[styles.hidePasswordIcon, styles.hidePasswordIconLayout]}
            resizeMode="cover"
            source={require("../../../assets/hidepassword.png")}
          />
          <View style={[styles.placeholder1, styles.placeholderPosition]}>
            <Image
              style={[styles.iconlylightmessage, styles.hidePasswordIconLayout]}
              resizeMode="cover"
              source={require("../../../assets/iconlylightlock.png")}
            />
            <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heyTherePosition: {
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  loginTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  orLayout1: {
    width: 315,
    left: 30,
  },
  labelChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    width: "100%",
  },
  orLayout: {
    height: 18,
    position: "absolute",
  },
  orItemPosition: {
    top: 9,
    maxHeight: "100%",
    position: "absolute",
  },
  
  iconPosition: {
    height: 20,
    width: 20,
    left: 15,
    top: 15,
    position: "absolute",
  },
  passwordTypo: {
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextMedium_size,
    textAlign: "left",
    position: "absolute",
  },
  labelLayout: {
    height: 48,
    width: 315,
    left: 0,
    position: "absolute",
  },
  placeholderPosition: {
    left: 15,
    top: 15,
    height: 18,
    position: "absolute",
  },
  hidePasswordIconLayout: {
    width: 18,
    height: 18,
    position: "absolute",
  },
  heyThere: {
    left: 37,
    color: Color.colorGray,
    fontFamily: FontFamily.textSmallTextRegular,
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
  },
  welcomeBack: {
    top: 29,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    left: 0,
    color: Color.colorGray,
  },
  titleSection: {
    top: 40,
    width: 154,
    height: 59,
    position: "absolute",
    alignSelf:"center"
  },
  buttonLoginChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.purpleLinear,
    alignSelf:"center",
    position: "absolute",
  },
  iconlyboldlogin: {
    width: "30.38%",
    right: "69.62%",
    maxWidth: "100%",
    maxHeight: "100%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  login: {
    left: "43.04%",
    color: Color.gray1,
    top: "0%",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
  },
  iconlyboldloginParent: {
    height: "40%",
    width: "25.08%",
    top: "30%",
    right: "37.46%",
    bottom: "30%",
    left: "37.46%",
    position: "absolute",
  },
  buttonLogin: {
    top: 553,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    height: 60,
    position: "absolute",
    alignSelf:"center",
    justifyContent:"center",
  },
  or1: {
    left: 151,
    fontFamily: FontFamily.interRegular,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextMedium_size,
    textAlign: "left",
    color: Color.colorGray,
    top: 0,
    position: "absolute",
  },
  orChild: {
    width: 141,
    left: 0,
  },
  orItem: {
    left: 175,
    width: 140,
  },
  or: {
    top: 633,
    width: 315,
    left: 30,
  },
  dontHaveAn: {
    color: Color.colorGray,
    fontFamily: FontFamily.textSmallTextRegular,
  },
  registerTypo: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
  },
  dontHaveAnContainer: {
    fontSize: FontSize.textMediumTextSemiBold_size,
    lineHeight: 21,
    left: 0,
  },
  registerText: {
    top: 751,
    left: 61,
    width: 253,
    height: 21,
    position: "absolute",
    color:Color.colorGainsboro,
  },
  groupLayout: {
    width: 50,
    height: 50,
    top: 0,
  },
  childBorder: {
    borderStyle: "solid",
    borderRadius: Border.br_sm,
    position: "absolute",
  },
  groupChild: {
    borderColor: Color.colorGainsboro,
    borderWidth: 0.8,
    width: 50,
    height: 50,
    top: 0,
    left: 0,
  },
  rectangleParent: {
    left: 0,
    position: "absolute",
  },
 /* facebook1Icon: {
    overflow: "hidden",
    backgroundColor:"yellow"
  },
  rectangleGroup: {
    left: 80,
    position: "absolute",
    backgroundColor:"blue",
  },*/
  loginSocialMedia: {
    top: 671,
    alignSelf:"center",
    width: 51,
    height: 50,
    position: "absolute",
  },
  forgotYourPassword: {
    textDecoration: "underline",
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
    left: 0,
    top: 0,
  },
  forgetPassword: {
    top: 121,
    left: 88,
    width: 138,
  },
  labelBgChild: {
    backgroundColor: Color.borderColor,
    borderColor: Color.borderColor,
    borderWidth: 1,
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    width: "100%",
  },
  labelBg: {
    position: "absolute",
  },
  iconlylightmessage: {
    left: 0,
    top: 0,
  },
  email: {
    left: "45.9%",
    top: "0%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  placeholder: {
    width: 61,
  },
  label: {
    top: 0,
  },
  hidePasswordIcon: {
    left: 282,
    top: 15,
    width: 18,
  },
  password: {
    left: "32.56%",
    top: "0%",
    fontFamily: FontFamily.textSmallTextRegular,
  },
  placeholder1: {
    width: 86,
  },
  label1: {
    top: 63,
  },
  labelSection: {
    top: 129,
    height: 139,
    position: "absolute",
  },
  loginPage: {
    backgroundColor: Color.backgroundColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",

  },
});

export default LoginPage;
