import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View, ImageBackground, Dimensions } from "react-native";
import GoogleFit, { Scopes } from 'react-native-google-fit';
import CircularProgress from "react-native-circular-progress-indicator";

export default function StepCount() {
  const [stepCount, setStepCount] = useState(0);

  const windowHeight = Dimensions.get("window").height;
  const distanceCovered = (stepCount / 1300).toFixed(4);
  const caloriesBurnt = (distanceCovered * 60).toFixed(4);

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then((authorized) => {
      if (!authorized) {
        GoogleFit.authorize({
          scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
        }).then((res) => {
          if (res.success) {
            const options = {
              startDate: new Date(2023, 1, 1).toISOString(), // Specify your start date
              endDate: new Date().toISOString(),
            };

            GoogleFit.getDailyStepCountSamples(options).then((res) => {
              setStepCount(res.map((r) => r.value).reduce((a, b) => a + b, 0));
            });
          }
        });
      } else {
        const options = {
          startDate: new Date(2023, 1, 1).toISOString(), // Specify your start date
          endDate: new Date().toISOString(),
        };

        GoogleFit.getDailyStepCountSamples(options).then((res) => {
          setStepCount(res.map((r) => r.value).reduce((a, b) => a + b, 0));
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
     {/*  <ImageBackground style={{ flex: 1 }} source={require("./assets/runningFinal.jpg")} resizeMode="cover"> */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>Step Count: {stepCount}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <CircularProgress
            value={stepCount}
            maxValue={6500}
            radius={210}
            textColor={"#ecf0f1"}
            activeStrokeColor={"#f39c12"}
            inActiveStrokeColor={"#9b59b6"}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={"Step Count"}
            titleColor={"#ecf0f1"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.textDesign, { paddingLeft: 20, marginLeft: "23%" }]}>
              Target: 6500 steps (5kms)
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.textDesign, { width: "93%", paddingLeft: 20, marginLeft: "-3.5%" }]}>
              Distance Covered: {distanceCovered} km
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.textDesign, { paddingLeft: 10, marginLeft: "23%" }]}>
              Calories Burnt: {caloriesBurnt}
            </Text>
          </View>

          <StatusBar style="auto" />
        </View>
    {/*   </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headingDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Papyrus",
  },
  textDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    height: 50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Papyrus",
  },
});
