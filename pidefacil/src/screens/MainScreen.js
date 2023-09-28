import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { UserContext } from '@context/UserContext'
import BottomMenuUser from '@components/BottomMenuUser'

export default function MainScreen(props) {
    
    const [login, loginAction] = useContext(UserContext)    
    const loggedUser = login.user;
    console.log(JSON.stringify(loggedUser));
    //here make an if loggedUser.user_type == 'client' show the client/user menu and the else should return the restaurants manager menu (another component)
    return (
        <View>
            <Text style={{
                textAlign: 'center',
                marginTop: 200,
                fontFamily: 'LibreBaskerville-Regular'
            }}>
                Bienvenido {loggedUser.email}
            </Text>

            <BottomMenuUser
                onPressFirst={() => goToScreen('Main')}
                onPressSecond={() => goToScreen('')}
                onPressThird={() => goToScreen('')}
                onPressFourth={() => goToScreen('Account')}
            />

        </View>

    )

    

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }
}

