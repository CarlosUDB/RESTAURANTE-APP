import React, { useContext, useEffect } from 'react'
import {  View, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { imageBackgroundStyle } from '@styles/general'
import { UserContext } from '@context/UserContext'
import { getUser } from '@storage/UserAsyncStorage'

export default function SplashScreen (props) {
    const [login, loginAction] = useContext(UserContext)

    useEffect(() => {
        fetchSesion(loginAction)
    }, [])
    
    return(
        <View style={imageBackgroundStyle.image}>
            <StatusBar translucent backgroundColor='rgba(0, 0, 0, 0.2)' />
            <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 200,
                    height: 200,
                    margin: 100
                }}
                source={require('@resources/images/logo.png')}
            />
        </View>
    )
    
    async function fetchSesion(loginAction) {

        const response = await getUser()

        if (response == null) {
            setTimeout(() => {
                goToScreen('Login')
            }, 3000)
            return
        }

        loginAction({ type: 'logged', data: response })
        setTimeout(() => {
            goToScreen('Main')
        }, 3000)
    }

    function goToScreen(routeName) {
        props.navigation.replace(routeName)
    }
}