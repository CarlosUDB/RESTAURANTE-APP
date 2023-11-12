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
import { estilo, platilloStyle } from '@styles/styles'

export default function DishesScreen(props) {



    const [login, loginAction] = useContext(UserContext)

    const loggedUser = login.user;
    //console.log(JSON.stringify(loggedUser));
    //here make an if loggedUser.user_type == 'client' show the client/user menu and the else should return the restaurants manager menu (another component)
    //List restaurants
    const [dishes, setDishes] = useState([]);
    

    let restaurant_id = props.navigation.state.params;

    useEffect(() => {
        (async function () {
            try {
                //Retrieving dishes info
                const response = await fetch(API_URI + '/dishes/restaurant/' + restaurant_id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggedUser.access_token,
                    },
                });
                const data = await response.json();
                setDishes(data); 
                //console.log(dishes);   

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    displayDetails = (dato) =>{
        goToScreen('DetailDishes', dato)
    }

    return (
        <View style={estilo.body}>
            <View style={estilo.header}>
                <View style={estilo.titulo}>
                    <Text style={estilo.textoTitulo}>¡Pide lo que quieras!</Text>
                </View>
            </View>
            <View style={estilo.contenido}>
                <ScrollView>
                    <View style={estilo.pack}>
                        {
                            dishes.map((item, key) => (
                                <View key={key}>
                                    <TouchableHighlight onPress={()=>displayDetails(item.id)}>
                                        <View>
                                            <Card>
                                                <View style={platilloStyle.individual}>
                                                    <View style={platilloStyle.imgPlatillo}>
                                                        <Image source={{ uri: API_IMG + item.picture }} style={{ width: '100%', height: '100%' }}/>
                                                    </View>
                                                    <View style={platilloStyle.infoPlatillo}>
                                                        <Text style={platilloStyle.nombre}>{item.name}</Text>
                                                        <Text style={platilloStyle.precio}>$ {item.price}</Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        </View>
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
                    onPressSecond={() => goToScreen('Orders')}
                    onPressThird={() => goToScreen('FinalOrder')}
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