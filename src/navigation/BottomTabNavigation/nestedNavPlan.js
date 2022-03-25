import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlanDetailScreen, WelcomeScreen } from "../../screens";
import { COLORS } from "../../assets/colors";
import { StyleSheet } from "react-native";

const NestedNavProfile = createNativeStackNavigator();

export const NestedNavigationPlans = () => {
  return (
    <NestedNavProfile.Navigator initialRouteName="WelcomeScreen">
      <NestedNavProfile.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedNavProfile.Screen
        name="PlanDetailScreen"
        options={{
          headerStyle: styles.container,
          title: "Plan Details",
          headerTintColor: COLORS.white,
        }}
        component={PlanDetailScreen}
      />
    </NestedNavProfile.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
});
