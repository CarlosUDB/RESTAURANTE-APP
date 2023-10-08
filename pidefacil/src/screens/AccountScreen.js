import React, { useContext } from 'react'
import { loginStyles, estilo } from '@styles/styles'
import { Text, View, TouchableOpacity } from 'react-native'
import { UserContext } from '@context/UserContext'
import BottomMenuUser from '@components/BottomMenuUser'
import color from '@styles/colors'
import { API_URI } from '@config/GlobalVars'

export default function AccountScreen(props) {


    const [login, loginAction] = useContext(UserContext)
    const loggedUser = login.user;

    let status = 0;

    //function to try to login into the api
    Logout = async () => {

        await fetch(API_URI + '/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + loggedUser.access_token
            }
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (status == 200) {

                loginAction({
                    type: 'logout',
                    data: {}
                })

                goToScreen('Splash')
            }

            status = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }

    editUserForm = () => {
        if (loggedUser.googleAccount == 'google') {
            goToScreen('EditGoogleUser')
        } else {
            goToScreen('EditUser')
        }
    }

    return (
        <View style={estilo.body}>
            <View style={estilo.header}>
                <Text style={estilo.textoTitulo} >Perfil de usuario.</Text>
            </View>
            <View style={estilo.contenidoUser}>
                <View>
                    <Text style={estilo.textoTitulo2}>{loggedUser.first_name + ' ' + loggedUser.last_name}</Text>
                </View>
                <View style={estilo.botonesEditar}>
                    <View style={loginStyles.btnTransparent}>
                        <TouchableOpacity onPress={editUserForm}>
                            <Text style={[loginStyles.btnTxt, { color: color.PRIMARY_COLOR }]}>Editar cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={loginStyles.btnMain}>
                        <TouchableOpacity onPress={Logout}>
                            <Text style={[loginStyles.btnTxt, { color: color.WHITE }]}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
            <View style={estilo.sections}>
                <BottomMenuUser
                    onPressFirst={() => goToScreen('Main')}
                    onPressSecond={() => goToScreen('')}
                    onPressThird={() => goToScreen('')}
                    onPressFourth={() => goToScreen('Account')}
                />
            </View>
        </View>
    )

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }

}