import React, { useState, useContext, useEffect } from 'react'
import {loginStyles} from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import color from '@styles/colors'
import { API_URI } from '@config/GlobalVars'
import Snackbar from 'react-native-snackbar'
import { UserContext } from '@context/UserContext'
import { Text, View, StatusBar, TouchableOpacity, Image, BackHandler } from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function LoginScreen (props){

    const [login, loginAction] = useContext(UserContext)
    const [googleEmail, setGoogleEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');

    let status = 0;
    let registerStatus = 0, verifyStatus;
    let googleEmailExists = true;

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '114258250805-fjeejpp5vskaq9v3dlmku8tuerqfes3j.apps.googleusercontent.com',
        });
    }, []);

    LoginGoogle = async () => {
        try{
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(googleCredential);

            setFirstName(userCredential.user.displayName);
            setGoogleEmail(userCredential.user.email);

            Register();    
        }catch(error){
            console.log(error);
        }
    }

    Register = async () => {

        
        await fetch(API_URI + '/verify-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": googleEmail
            })
        }).then(res => {
            verifyStatus = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (verifyStatus == 200) {
                
                googleEmailExists=resData.exists;
            }

            verifyStatus = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });


        if (googleEmailExists){
            LoginAfterGoogle();
        }else{
            //register
            await fetch(API_URI + '/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "first_name": first_name,
                    "last_name": '',
                    "email": googleEmail,
                    "password": 'pidefacil',
                    "address": '',
                    "user_type": "client"
                })
            }).then(resp => {
                registerStatus = resp.status;

                return resp.json();
            }).then(resData => {
                //handling status        
                if (registerStatus == 200) {
                    LoginAfterGoogle();
                }

                registerStatus = 0;
            }).catch((error) => {
                alert("Error: " + error.message);
            });
            
        }



        
    }

    LoginAfterGoogle = async () => {
        await fetch(API_URI + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": googleEmail,
                "password": 'pidefacil'
            })
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (status == 200) {

                loginAction({
                    type: 'login',
                    data: {
                        id: resData.user.id,
                        first_name: resData.user.first_name,
                        last_name: resData.user.last_name,
                        email: resData.user.email,
                        address: resData.user.address,
                        user_type: resData.user.user_type,
                        restaurant_id: resData.user.restaurant_id,
                        access_token: resData.access_token,
                        token_type: resData.token_type
                    }
                })

                goToScreen('Main')
            }

            if (status == 401) {
                Snackbar.show({
                    text: 'Credenciales incorrectas',
                    duration: Snackbar.LENGTH_LONG,
                })
            };

            status = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }


    //function to try to login into the api
    Login = async() => {
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
            status = res.status;
            return res.json();
        }).then(resData => {
            //handling status
            if (status == 200) {    

                loginAction({
                    type: 'login', 
                    data: {
                        id: resData.user.id,
                        first_name: resData.user.first_name,
                        last_name: resData.user.last_name,
                        email: resData.user.email,
                        address: resData.user.address,
                        user_type: resData.user.user_type,
                        restaurant_id: resData.user.restaurant_id,
                        access_token: resData.access_token,
                        token_type: resData.token_type
                    }
                })

                goToScreen('Main')
            }

            if (status == 401){
                Snackbar.show({
                text: 'Credenciales incorrectas',
                duration: Snackbar.LENGTH_LONG,
            })};

            status = 0;
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
    
    return(
        <View style={[loginStyles.container, {padding: 50}]}>
            <StatusBar 
                backgroundColor={color.BACKGROUND} translucent={true}
            />

            <View style={loginStyles.logo}>
                <Image source={require('@resources/images/logo.png')} 
                style={{ height:250, width:250}}/>
            </View>

            <MyTextInput keyboardType='email-address' placeholder='E-mail' image='at' value={email} onChangeText={(value=>setEmail(value))}/>

            <MyTextInput keyboardType={null} secureTextEntry={true} placeholder='Contraseña' image='lock' value={password} onChangeText={(value => setPassword(value))} />

            <View style={loginStyles.btnMain}>
                <TouchableOpacity onPress={Login}>
                    <Text style={loginStyles.btnTxt}>Acceder</Text>
                </TouchableOpacity>
            </View>

            <View style={loginStyles.btnTransparent}>
                <TouchableOpacity onPress={() => goToScreen('Register')}>
                    <Text style={[loginStyles.btnTxt, { color: color.PRIMARY_COLOR }]}>Registrarse</Text>
                </TouchableOpacity>
            </View>


            <View style={[loginStyles.btnMain, { backgroundColor: color.WHITE }]}>
                <TouchableOpacity onPress={LoginGoogle}>
                    <Text style={[loginStyles.btnTxt, { color: color.PRIMARY_COLOR }]}>Acceder con Google</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

    function goToScreen(routeName) {
        props.navigation.navigate(routeName)
    }
}