import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { LoadingScreen } from "../screens";
import { DrawerNavigation } from "./DrawerNavigation";


const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LoadingScreen"}
      screenOptions={{ headerShown: false }}
    >

      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      {/* Drawer Navigation  */}
      {/*<Stack.Screen name="root" component={DrawerNavigation} />*/}

      {/* Bar Navigation  */}
      {/* <Stack.Screen name="root" component={BottomTabNavigation} />*/}

      <Stack.Screen name="root" component={DrawerNavigation} />

    </Stack.Navigator>
  );
};
