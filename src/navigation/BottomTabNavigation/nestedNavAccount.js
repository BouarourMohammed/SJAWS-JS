import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen, PlanDetailScreen } from "../../screens";
import { COLORS } from "../../assets/colors";
import { StyleSheet } from "react-native";
const NestedNavProfile = createNativeStackNavigator();

export const NestedNavigationAccount = () => {
  return (
    <NestedNavProfile.Navigator initialRouteName="AccountScreen">
      <NestedNavProfile.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedNavProfile.Screen
        name="PlanDetailScreen"
        component={PlanDetailScreen}
        options={{
          headerStyle: styles.container,
          title: "Plan Details",
          headerTintColor: COLORS.white,
        }}
      />
    </NestedNavProfile.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
});
