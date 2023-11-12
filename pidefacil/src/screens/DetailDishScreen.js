import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { UserContext } from '@context/UserContext'
import BottomMenuUser from '@components/BottomMenuUser'
import { API_URI, API_IMG } from '@config/GlobalVars'
import { useDebugValue } from 'react'
import { Ionicons } from 'react-native-vector-icons'
import color from '@styles/colors'
import colors from '../styles/colors'
import { estilo, detallePlatilloStyle } from '@styles/styles'
import { TextInput } from 'react-native-gesture-handler'

export default function DetailDishScreen(props) {

    const [login, loginAction] = useContext(UserContext);
    const [dish, setDish] = useState();
    const loggedUser = login.user;
    let dish_id = props.navigation.state.params;
    useEffect(() => {
        (async function () {
            try {
                //dasdasd
                const response = await fetch(API_URI + '/dishes/' + dish_id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggedUser.access_token,
                    },
                });
                const { dish } = await response.json();
                setDish(dish);



            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    console.log('Hola ', dish);

    return (
        <View style={estilo.body}>
            <View style={detallePlatilloStyle.contenido}>
                <ScrollView>
                    <View>


                        {dish && <View >
                            <TouchableHighlight>
                                <View>
                                    <View style={detallePlatilloStyle.main}>
                                        <Text style={detallePlatilloStyle.name}>{dish.name}</Text>
                                        <Image style={detallePlatilloStyle.img} source={{ uri: API_IMG + dish.picture }} />
                                        <Text style={detallePlatilloStyle.precio}>Precio: ${dish.price}</Text>
                                    </View>
                                    <View style={detallePlatilloStyle.description}>
                                        <Text style={detallePlatilloStyle.textoDesc}>{dish.description}</Text>
                                    </View>
                                    <View style={detallePlatilloStyle.botones}>
                                        <View style={detallePlatilloStyle.cantidad}>
                                            <Text style={detallePlatilloStyle.textoCantidad}>Cantidad: </Text>
                                            <TextInput placeholder='ej. 3' keyboardType='numeric' style={{backgroundColor: color.BACKGROUND, width: 150, }}/>
                                        </View>
                                        <View style={detallePlatilloStyle.agregar}>
                                            <TouchableHighlight style={detallePlatilloStyle.btnAgregar}>
                                                <Text style={{color:'white', fontSize: 25, textAlign: 'center'}}>Agregar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>}


                    </View>
                </ScrollView>
            </View>
            <View style={detallePlatilloStyle.sections}>
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