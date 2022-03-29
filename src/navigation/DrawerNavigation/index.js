
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { AddAlertScreen, AlertScreen, ForgotPasswordScreen, HomeScreen, LoginScreen, MapScreen, ProfileScreen, SignUpScreen, WelcomeScreen } from "../../screens";
import { StyleSheet, View } from 'react-native';
import { clearProfile, setAlert, useProfile } from '../../state';
import { AddIcon, AlertsIcon, HomeIcon, InfoIcon, LogoutIcon, MapIcon, PlanIcon, RegisterIcon, SettingIcon, StartIcon, UserIcon } from '../../assets/icons';
import { COLORS } from '../../assets/colors';
import { NestedNavigationPlans } from '../NestedNavigation/nestedNavPlan';
import { NestedNavigationAccount } from '../NestedNavigation/nestedNavAccount';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Fragment, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    const { user } = useProfile();
    // to make bottoms tabs shows different (admin or user)
    const admin = user?.role === "admin";

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const signOut = useCallback(async () => {
        try {
            dispatch(clearProfile());
            await AsyncStorage.clear();
            navigation.popToTop();
            navigation.navigate('root', { screen: "WelcomeScreen" });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const PlanNav = useCallback(() => <NestedNavigationPlans />, []);
    const AccountNav = useCallback(() => <NestedNavigationAccount />, []);
    const AppDrawerContent = useCallback((props) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                {/*all of the drawer items*/}
                <DrawerItemList {...props} style={{ borderWidth: 1 }} />
                {/* here's where you put your logout drawer item*/}
                {user && (<DrawerItem
                    label="Log Out"
                    onPress={async () => {
                        try {
                            await props.navigation.closeDrawer();
                            await signOut();
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    icon={({ focused }) => (
                        <LogoutIcon fill={focused ? COLORS.yellow : COLORS.white} />
                    )}
                    labelStyle={[styles.drawerLabelStyle, { color: COLORS.white }]}
                />)}
            </DrawerContentScrollView>
        );
    }, [user]);


    return (
        <Drawer.Navigator drawerContent={props => <AppDrawerContent {...props} />}
            initialRouteName="WelcomeScreen"
            contentContainerStyle={{ backgroundColor: COLORS.red }}
            headerBackgroundContainerStyle={{ backgroundColor: COLORS.red }}
            screenOptions={{
                headerBackgroundContainerStyle: { backgroundColor: COLORS.background },
                drawerStyle: { backgroundColor: COLORS.background },
                drawerLabelStyle: styles.drawerLabelStyle,
                drawerInactiveTintColor: COLORS.white,
                drawerActiveTintColor: COLORS.yellow,
                headerShown: true,
            }}>
            { /* Before login */}
            {!user && (
                <Fragment>
                    <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{
                        title: 'Welcome',
                        drawerIcon: ({ focused }) => (
                            <StartIcon fill={focused ? COLORS.yellow : COLORS.white} />
                        ),
                    }} />
                    <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{
                        title: 'Sign In',
                        drawerIcon: ({ focused }) => (
                            <LogoutIcon fill={focused ? COLORS.yellow : COLORS.white} />
                        ),
                    }} />
                    <Drawer.Screen name="SignUpScreen" component={SignUpScreen} options={{
                        title: 'Sign Up',
                        drawerIcon: ({ focused }) => (
                            <RegisterIcon fill={focused ? COLORS.yellow : COLORS.white} />
                        ),
                    }} />
                    <Drawer.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordScreen}
                        options={{
                            title: 'Forgot Password',
                            drawerIcon: ({ focused }) => (
                                <InfoIcon fill={focused ? COLORS.yellow : COLORS.white} />
                            ),
                        }}
                    />
                </Fragment>)}
            { /* After login */}
            {user && (
                <Fragment>
                    <Drawer.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: 'Home',
                            drawerIcon: ({ focused }) => (
                                <HomeIcon fill={focused ? COLORS.yellow : COLORS.white} />
                            ),
                        }}
                    />

                    <Drawer.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{
                            title: 'Spoof Map',
                            drawerIcon: ({ focused }) => (
                                <MapIcon fill={focused ? COLORS.yellow : COLORS.white} />
                            ),
                        }}
                    />


                    {!admin && (
                        <Drawer.Screen
                            name="PlanNav"
                            component={PlanNav}
                            options={{
                                title: 'Plans',
                                drawerIcon: ({ focused }) => (
                                    <PlanIcon fill={focused ? COLORS.yellow : COLORS.white} />
                                ),
                            }}
                        />
                    )}

                    {admin && (
                        <Drawer.Screen
                            name="AddAlertScreen"
                            component={AddAlertScreen}
                            options={{
                                title: 'Add Alert',
                                drawerIcon: ({ focused }) => (
                                    <AddIcon fill={focused ? COLORS.yellow : COLORS.white} />
                                ),
                            }}
                        />
                    )}
                    {admin && (
                        <Drawer.Screen
                            name="AlertScreen"
                            component={AlertScreen}
                            options={{
                                title: 'Alerts',
                                drawerIcon: ({ focused }) => (
                                    <AlertsIcon fill={focused ? COLORS.yellow : COLORS.white} />
                                ),
                            }}
                        />
                    )}

                    {!admin && (
                        <Drawer.Screen
                            name="AccountNav"
                            component={AccountNav}
                            options={{
                                title: 'Account',
                                drawerIcon: ({ focused }) => (
                                    <SettingIcon fill={focused ? COLORS.yellow : COLORS.white} />
                                ),
                            }}
                        />
                    )}
                    <Drawer.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={{
                            title: 'Profile',
                            drawerIcon: ({ focused }) => (
                                <UserIcon fill={focused ? COLORS.yellow : COLORS.white} />
                            ),
                        }}
                    />

                </Fragment>)}
        </Drawer.Navigator>

    );
}


const styles = StyleSheet.create({
    drawerLabelStyle: {
        fontSize: 18,
        fontWeight: '700',
    }
})
