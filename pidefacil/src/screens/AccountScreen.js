import React, { useContext } from 'react'
import { loginStyles } from '@styles/styles'
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

    editUserForm=()=>{
        if(loggedUser.googleAccount == 'google'){
            console.log('SI')
            goToScreen('EditGoogleUser')
        }else{
            goToScreen('EditUser')
        }
    }

    return (
        <View>
            <Text style={{
                textAlign: 'center',
                marginTop: 180,
                fontSize: 24,
                fontFamily: 'LibreBaskerville-Regular'
            }}>
                {loggedUser.first_name + ' ' + loggedUser.last_name}
            </Text>
            
            


            <BottomMenuUser
                onPressFirst={() => goToScreen('Main')}
                onPressSecond={() => goToScreen('')}
                onPressThird={() => goToScreen('')}
                onPressFourth={() => goToScreen('Account')}
            />  
            
            <View style={[loginStyles.btnTransparent, { marginTop: -200, marginLeft: 60 }]}>
                <TouchableOpacity onPress={Logout}>
                    <Text style={[loginStyles.btnTxt, { color: color.PRIMARY_COLOR }]}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            <View style={[loginStyles.btnMain, { marginTop: -200, marginLeft: 60 }]}>
                <TouchableOpacity onPress={editUserForm}>
                    <Text style={[loginStyles.btnTxt, { color: color.WHITE }]}>Editar cuenta</Text>
                </TouchableOpacity>
            </View>
            

        </View>
    )

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }

}