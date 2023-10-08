import React, { useState, useContext, useEffect } from 'react'
import { loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'
import { API_URI } from '@config/GlobalVars'
import { UserContext } from '@context/UserContext'
import { Text, View, StatusBar, TouchableOpacity, Image, BackHandler, ScrollView } from 'react-native'
import Snackbar from 'react-native-snackbar'


export default function RegisterScreen(props) {

    const [login, loginAction] = useContext(UserContext)
    const loggedUser = login.user;
    //consts to manage inputs
    const [first_name, setFirstName] = useState(loggedUser.first_name);
    const [last_name, setLastName] = useState(loggedUser.last_name);
    const [email, setEmail] = useState(loggedUser.email);
    const [password, setPassword] = useState('pidefacil');
    const [address, setAddress] = useState(loggedUser.address);


    let editStatus = 0;

    //function to try to edit
    Update = async () => {
        await fetch(API_URI + '/users/' + loggedUser.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedUser.access_token
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
                "address": address,
                "user_type": loggedUser.user_type,
                "restaurant_id": loggedUser.restaurant_id,
                "googleAccount": loggedUser.googleAccount,
            })
        }).then(res => {
            editStatus = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (editStatus == 200) {
                login.user.first_name = resData.data.first_name;
                login.user.last_name = resData.data.last_name;
                login.user.email = resData.data.email;
                login.user.address = resData.data.address;
                goToScreen('Main');
            }
            if (editStatus == 406) {
                //validacion de campos de registro
                Snackbar.show({
                    text: 'Verifique que los campos sean correctos.',
                    duration: Snackbar.LENGTH_LONG,
                });
            }

            editStatus = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }

    form = () => {
        return (
            <ScrollView
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='always'>
                <View style={[loginStyles.container, { padding: 50 }]}>
                    <View style={loginStyles.logo}>
                        <Image source={require('@resources/images/logo.png')}
                            style={{ height: 200, width: 200 }} />
                    </View>


                    <StatusBar backgroundColor={color.BACKGROUND} translucent={true} />


                    <MyTextInput keyboardType='default' placeholder='Nombre' image='user' value={first_name} onChangeText={(value => setFirstName(value))} />

                    <MyTextInput keyboardType='default' placeholder='Apellidos' image='user' value={last_name} onChangeText={(value => setLastName(value))} />

                    <MyTextInput keyboardType='email-address' placeholder='Correo electrónico' image='at' value={email} onChangeText={(value => setEmail(value))} editable={false}/>

                    <MyTextInput keyboardType='default' placeholder='Dirección de entrega' image='location-arrow' value={address} onChangeText={(value => setAddress(value))} />

                    <View style={loginStyles.btnMain}>
                        <TouchableOpacity onPress={Update}>
                            <Text style={loginStyles.btnTxt}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        )
    }
    return (
        form()
    )

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }
}