import React, { useCallback } from "react";
import {
  AddAlertScreen,
  AlertScreen,
  HomeScreen,
  MapScreen,
  ProfileScreen,
} from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AddIcon,
  AlertsIcon,
  HomeIcon,
  MapIcon,
  PlanIcon,
  SettingIcon,
  UserIcon,
} from "../../assets/icons";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors";
import { useProfile } from "../../state";
import { NestedNavigationPlans } from "./nestedNavPlan";
import { NestedNavigationAccount } from "./nestedNavAccount";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  const PlanNav = useCallback(() => <NestedNavigationPlans />, []);
  const AccountNav = useCallback(() => <NestedNavigationAccount />, []);
  const { user } = useProfile();

  // to make bottoms tabs shows different (admin or user)
  const admin = user?.role === "admin";

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.container,
        tabBarActiveTintColor: COLORS.yellow,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: () => true,
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
        }}
      />

      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MapIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
          tabBarLabel: () => true,
        }}
      />

      {!admin && (
        <Tab.Screen
          name="PlanNav"
          component={PlanNav}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ focused }) => (
              <PlanIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}

      {admin && (
        <Tab.Screen
          name="AddAlertScreen"
          component={AddAlertScreen}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ focused }) => (
              <AddIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
          listeners={{
            tabPress: e => {
            }
          }}
        />
      )}
      {admin && (
        <Tab.Screen
          name="AlertScreen"
          component={AlertScreen}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ focused }) => (
              <AlertsIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}

      {!admin && (
        <Tab.Screen
          name="AccountNav"
          component={AccountNav}
          options={{
            tabBarLabel: () => true,
            tabBarIcon: ({ focused }) => (
              <SettingIcon fill={focused ? COLORS.yellow : COLORS.white} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => true,
          tabBarIcon: ({ focused }) => (
            <UserIcon fill={focused ? COLORS.yellow : COLORS.white} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
});
