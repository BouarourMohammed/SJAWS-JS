import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ForgotPasswordScreen, LoginScreen, SignUpScreen, WelcomeScreen } from "../../screens";
import { StyleSheet } from 'react-native';


const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="LoginScreen">
            <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{
                title: 'Welcome',
                drawerLabelStyle: styles.drawerLabelStyle
            }} />
            <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{
                title: 'Sign In',
                drawerLabelStyle: styles.drawerLabelStyle
            }} />
            <Drawer.Screen name="SignUpScreen" component={SignUpScreen} options={{
                title: 'Sign Up',
                drawerLabelStyle: styles.drawerLabelStyle
            }} />
            <Drawer.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Forgot Password',
                    drawerLabelStyle: styles.drawerLabelStyle

                }}
            />
        </Drawer.Navigator>

    );
}


const styles = StyleSheet.create({
    drawerLabelStyle: {
        fontSize: 18,
        fontWeight: '700',
    }
})
