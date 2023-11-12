import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-elements'
import { UserContext } from '@context/UserContext'
import BottomMenuUser from '@components/BottomMenuUser'
import { API_URI, API_IMG } from '@config/GlobalVars'
import { useDebugValue } from 'react'
import { Ionicons } from 'react-native-vector-icons'
import color from '@styles/colors'
import colors from '../styles/colors'
import { estilo } from '@styles/styles'


export default function MainScreen(props) {


    const [login, loginAction] = useContext(UserContext)
    const loggedUser = login.user;
    //console.log(JSON.stringify(loggedUser));
    //here make an if loggedUser.user_type == 'client' show the client/user menu and the else should return the restaurants manager menu (another component)
    //List restaurants
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(API_URI + '/restaurants', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggedUser.access_token,
                    },
                });
                const data = await response.json();
                setRestaurants(data);
                //console.log(restaurants);


            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    displayDishes = (dato) => {
        //const {id} = dato;
        goToScreen('Dishes', dato)

    }



    return (
        <View style={estilo.body}>
            <View style={estilo.header}>
                <View style={estilo.icon}>
                    <Ionicons size={34} name='restaurant-outline' color={color.PRIMARY_COLOR} />
                </View>
                <View style={estilo.titulo}>
                    <Text style={estilo.textoTitulo}>Restaurantes</Text>
                </View>
            </View>
            <View style={estilo.contenido}>

                <ScrollView>

                    <View style={estilo.pack}>
                        {
                            restaurants.map((item, key) => (
                                <View key={key}>
                                    <TouchableHighlight onPress={() => displayDishes(item.id)}>
                                        <Card >
                                            <View style={estilo.individual}>
                                                <View>
                                                    <Image source={{ uri: API_IMG + item.logo }} style={{ width: 50, height: 50 }} />
                                                </View>

                                                <View>
                                                    <Text style={estilo.nombre}>{item.name}</Text>
                                                </View>
                                            </View>


                                        </Card>
                                    </TouchableHighlight>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
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
    );

    function goToScreen(routeName, data) {
        //const {id} = data.params;
        console.log(data);
        //console.log(props);
        props.navigation.navigate(routeName, data)

    }
}


