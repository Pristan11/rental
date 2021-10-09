import React from "react";
import {Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import {Home, Onboarding} from "../screens/";
import {TabBarIcon} from '../components/TabBarIcon'
import { createStackNavigator } from "@react-navigation/stack";
import {icons, COLORS, SIZES} from "../constants";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },
};


const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: (focused) => TabBarIcon('home', focused)
                }}
            />
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    tabBarIcon: (focused) => TabBarIcon('card-search', focused)
                }}
            />
            <Tab.Screen
                name="Bookmark"
                component={Home}
                options={{
                    tabBarIcon: (focused) => TabBarIcon('bookmark', focused)
                }}
            />
            <Tab.Screen
                name="userIdentify"
                component={userIdentify}
                options={{
                    tabBarIcon: (focused) => TabBarIcon('account', focused)
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;


const  userIdentify=()=> {

    const Stack = createStackNavigator();
    return (
        <>
        <Stack.Navigator
            initialRouteName={'SignUp'}
        >
            <Stack.Screen
                name="SignUp"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />

            </Stack.Navigator>
        </>
            )}


