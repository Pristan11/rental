import React,{useContext,useEffect} from "react";
import {
    Image,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// screens
import { Onboarding, DestinationDetail } from "./screens/";
// extra screens
import Tabs from "./navigation/tabs";

import { icons, COLORS, SIZES } from './constants';
import { useFonts } from 'expo-font';
import FirebaseProvider from "./context/FirebaseContext";
import AuthProvider, {AuthContext} from "./context/AuthContext";
import {LogBox, StyleSheet} from 'react-native';

LogBox.ignoreLogs([
    'Setting a timer',
    'DevTools failed to load SourceMap',
    'Remote debugger']);
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    const {localLogin} = useContext(AuthContext);
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

    })
    useEffect(() => {
        localLogin()
    }, []);


     if(!loaded){
    return null;
    }


    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName={'Home'}
            >
                {/* Screens */}
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                        title: null,
                        headerStyle: {
                            backgroundColor: COLORS.white
                        },
                        headerLeft: null,
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: SIZES.padding }}
                                onPress={() => console.log("Pressed")}
                            >
                                <Image
                                    source={icons.barMenu}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />

                <Stack.Screen
                    name="DestinationDetail"
                    component={DestinationDetail}
                    options={{ headerShown: false }}
                />

                {/* Tabs */}
                < Stack.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        title: null,
                        headerStyle: {
                            backgroundColor: COLORS.white
                        },
                        // headerLeft: ({ onPress }) => (
                        //     <TouchableOpacity
                        //         style={{ marginLeft: SIZES.padding }}
                        //         onPress={onPress}
                        //     >
                        //         <Image
                        //             source={icons.back}
                        //             resizeMode="contain"
                        //             style={{
                        //                 width: 25,
                        //                 height: 25,
                        //             }}
                        //         />
                        //     </TouchableOpacity>
                        // ),
                        // headerRight: () => (
                        //     <TouchableOpacity
                        //         style={{ marginRight: SIZES.padding }}
                        //         onPress={() => console.log("Menu")}
                        //     >
                        //         <Image
                        //             source={icons.menu}
                        //             resizeMode="contain"
                        //             style={{
                        //                 width: 25,
                        //                 height: 25,
                        //             }}
                        //         />
                        //     </TouchableOpacity>
                        // ),
                        headerLeft: null,
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: SIZES.padding }}
                                onPress={() => console.log("Pressed")}
                            >
                                <Image
                                    source={icons.barMenu}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default () => {
    return (
        <FirebaseProvider>
            <AuthProvider>
        <App />
            </AuthProvider>
        </FirebaseProvider>
        )


};
