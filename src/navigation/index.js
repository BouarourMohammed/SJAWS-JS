import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useMemo } from "react";
import { COLORS } from "../assets/colors";
import { RootStack } from "./main";
import { useSelector } from "react-redux";

const useAppSelector = useSelector;

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

export const AppContainer = () => {
  const alert = useAppSelector((state) => state.alertSlice.alert);
  return (
    <NavigationContainer theme={navTheme}>
      {alert}
      {useMemo(
        () => (
          <RootStack />
        ),
        []
      )}
    </NavigationContainer>
  );
};
