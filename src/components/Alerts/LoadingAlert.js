import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import AnimationFile from "../../assets/lottie/loading.json";
import LottieView from "lottie-react-native";

export const LoadingAlert = (props) => {
  return (
    <AwesomeAlert
      show={true}
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      contentContainerStyle={[styles.container, props.style]}
      customView={
        <Fragment>
          <LottieView
            source={AnimationFile}
            autoPlay
            loop={true}
            resizeMode={"cover"}
            hardwareAccelerationAndroid={true}
            renderMode={"HARDWARE"}
            speed={1.6}
            style={styles.animation}
          />
          <Text style={{ marginTop: 24, fontSize: 14, textAlign: "center" }}>
            {props.message}
          </Text>
        </Fragment>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    padding: 64,
    backgroundColor: "#f6f6fc",
    elevation: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(67, 32, 109, 0.12)",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignSelf: "flex-end",
  },
  animation: {
    width: 300,
    height: 250,
    alignSelf: "center",
    marginTop: 8,
  },
});
