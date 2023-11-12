//menu
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '@styles/colors'
//test
//end menu

import MainScreen from '@screens/MainScreen'
import AccountScreen from '@screens/AccountScreen'

//menu
const Tab = createBottomTabNavigator();
//test



const mainName = "Main";
const accountName = "Account";

export default function () {
        return (
<NavigationContainer>
                <Tab.Navigator
                    initialRouteName={mainName}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let rn = route.name;

                            if (rn === mainName) {
                                iconName = focused ? 'restaurant-outline' : 'restaurant-outline';

                            } else if (rn === accountName) {
                                iconName = focused ? 'person-circle-outline' : 'person-circle-outline';

                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: color.PRIMARY_COLOR,
                        inactiveTintColor: 'grey',
                        labelStyle: { paddingBottom: 10, fontSize: 10 },
                        style: { padding: 10, height: 70 }
                    }}>

                    <Tab.Screen name={mainName} component={MainScreen} />
                    <Tab.Screen name={accountName} component={AccountScreen} />

                </Tab.Navigator>
            </NavigationContainer>
        );
}