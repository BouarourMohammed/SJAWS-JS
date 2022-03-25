import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../assets/colors";

export const Button = (props) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor:
            props.variant === "TYPE1" ? COLORS.white : COLORS.red,
        },
        props.style,
      ]}
      onPress={props.onPress}
      android_ripple={{ radius: 100 }}
    >
      <Text
        style={[
          styles.title,
          {
            color: props.variant !== "TYPE1" ? COLORS.white : COLORS.red,
          },
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.red,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});
