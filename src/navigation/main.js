import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { LoadingScreen } from "../screens/Loading";
import { ForgotPasswordScreen, LoginScreen, SignUpScreen, WelcomeScreen } from "../screens";


const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LoadingScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
};
