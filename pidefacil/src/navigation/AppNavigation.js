import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SplashScreen from '@screens/SplashScreen'
import LoginScreen from '@screens/LoginScreen'
import MainScreen from '@screens/MainScreen'
import AccountScreen from '@screens/AccountScreen'
import RegisterScreen from '@screens/RegisterScreen'
import EditUserScreen from '@screens/EditUserScreen'
import EditGoogleUserScreen from '@screens/EditGoogleUserScreen'
import DishesScreen from '@screens/DishesScreen'
import DetailDishScreen from '@screens/DetailDishScreen'
import OrderScreen from '@screens/OrderScreen'
import FinalOrderScreen from '@screens/FinalOrderScreen'
import DetailFinalOrderScreen from '@screens/DetailFinalOrderScreen'

const AppNavigation = createStackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Main: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Account: {
        screen: AccountScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    EditUser: {
        screen: EditUserScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    EditGoogleUser: {
        screen: EditGoogleUserScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Dishes: {
        screen: DishesScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailDishes: {
        screen: DetailDishScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailFinalOrder: {
        screen: DetailFinalOrderScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Orders: {
        screen: OrderScreen,/////////////////
        navigationOptions: {
            headerShown: false
        }
    },
    FinalOrder: {
        screen: FinalOrderScreen,/////////////////
        navigationOptions: {
            headerShown: false
        }
    },


})

export default createAppContainer(AppNavigation);