import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SplashScreen from '@screens/SplashScreen'
import LoginScreen from '@screens/LoginScreen'
import MainScreen from '@screens/MainScreen'
import AccountScreen from '@screens/AccountScreen'
import RegisterScreen from '@screens/RegisterScreen'
import EditUserScreen from '@screens/EditUserScreen'

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

})

export default createAppContainer(AppNavigation);