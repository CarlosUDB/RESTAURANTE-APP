import React, { useState, useContext, useEffect } from 'react'
import {loginStyles} from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'
import { API_URI } from '@config/GlobalVars'
import { UserContext } from '@context/UserContext'
import { Text, View, StatusBar, TouchableOpacity, Image, BackHandler, ScrollView } from 'react-native'
import Snackbar from 'react-native-snackbar'


export default function RegisterScreen (props){

    const [login, loginAction] = useContext(UserContext)
    //consts to manage inputs
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');


    let loginStatus = 0;
    let registerStatus = 0;

    //function to try to register
    Register = async () => {
        await fetch(API_URI + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
                "address": address,
                "user_type": "client"
            })
        }).then(res => {
            registerStatus = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (registerStatus == 200) {                
                Login();
            }
            if (registerStatus == 406) {
                //validacion de campos de registro
                Snackbar.show({
                    text: 'Verifique que los campos sean correctos.',
                    duration: Snackbar.LENGTH_LONG,
                });
            }

            registerStatus = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }

    //login after register is uccessful
    Login = async () => {
        await fetch(API_URI + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => {
            loginStatus = res.status;
            return res.json();
        }).then(resDataLogin => {
            //handling status
            if (loginStatus == 200) {

                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setAddress('');

                loginAction({
                    type: 'login',
                    data: {
                        id: resDataLogin.user.id,
                        first_name: resDataLogin.user.first_name,
                        last_name: resDataLogin.user.last_name,
                        email: resDataLogin.user.email,
                        address: resDataLogin.user.address,
                        user_type: resDataLogin.user.user_type,
                        restaurant_id: resDataLogin.user.restaurant_id,
                        googleAccount: resDataLogin.user.googleAccount,
                        access_token: resDataLogin.access_token,
                        token_type: resDataLogin.token_type
                    }
                })

                goToScreen('Main')
            }
            loginStatus = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }

    return(
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'>
            <View style={[loginStyles.container, {padding: 50}]}>
                <View style={loginStyles.logo}>
                    <Image source={require('@resources/images/logo.png')}
                        style={{ height: 200, width: 200 }} />
                </View>

                
                    <StatusBar backgroundColor={color.BACKGROUND} translucent={true}/>
                    

                    <MyTextInput keyboardType='default' placeholder='Nombre' image='user' value={first_name} onChangeText={(value => setFirstName(value))}/>

                    <MyTextInput keyboardType='default' placeholder='Apellidos' image='user' value={last_name} onChangeText={(value => setLastName(value))} />

                    <MyTextInput keyboardType='email-address' placeholder='Correo electrónico' image='at' value={email} onChangeText={(value => setEmail(value))} />

                    <MyTextInput keyboardType='default' placeholder='Dirección de entrega' image='location-arrow' value={address} onChangeText={(value => setAddress(value))} />



                    <MyTextInput keyboardType={null} secureTextEntry={true}  placeholder='Contraseña' image='lock' value={password} onChangeText={(value => setPassword(value))} />
                    
                

                <View style={loginStyles.btnMain}>
                    <TouchableOpacity onPress={Register}>
                        <Text style={loginStyles.btnTxt}>Registrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }
}