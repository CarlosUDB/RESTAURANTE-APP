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
import { estilo, orderStyle } from '@styles/styles'

export default function DetailFinalOrderScreen(props) {
    const [login, loginAction] = useContext(UserContext)
    const loggedUser = login.user;
    const [dishes, setDishes] = useState([]);
    const [total, setTotal] = useState(0);

    let major_order_id = props.navigation.state.params;
    useEffect(() => {
        (async function () {
            try {
            // Consultando pedidos
                const response = await fetch(API_URI + '/orders/by-major-order-id/' + major_order_id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggedUser.access_token,
                    },
                });

                const data = await response.json();
                // Cargando detalles de platilos por cada pedido
                const ordersWithDishes = await Promise.all(
                    data.orders.map(async (order) => {
                        const dishResponse = await fetch(API_URI + `/dishes/${order.dish_id}`, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + loggedUser.access_token,
                            },
                        });
                        const dishData = await dishResponse.json();
                        return { ...order, dish: dishData.dish };
                    })
                );
                setDishes(ordersWithDishes);
                const totalGeneral = ordersWithDishes.reduce(
                    (total, order) => total + order.dish.price * order.quantity, 0);
                setTotal(totalGeneral);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const Back = () => {
        props.navigation.goBack();
    };


    return (
        <View style={estilo.body}>
            <View style={estilo.header}>
                <TouchableOpacity onPress={Back} style={estilo.iconBack}>
                    <Ionicons name="arrow-back" size={34} color={color.PRIMARY_COLOR} />
                </TouchableOpacity>
                <View style={estilo.titulo}>
                    <Text style={estilo.textoTitulo2}>Detalles de pedido</Text>
                </View>

            </View>
            <View style={estilo.contenido}>
                <ScrollView>
                    <View style={estilo.pack}>
                        {
                            dishes.map((item, key) => (
                                <View key={key}>
                                    <TouchableHighlight>
                                        <View>
                                            <Card>
                                                <View style={estilo.individual}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: API_IMG + item.dish.picture }}
                                                            style={orderStyle.imgPlatillo}
                                                        />
                                                    </View>

                                                    <View style={orderStyle.infoPlatillo}>
                                                        <Text style={orderStyle.nombrePedido}>{item.dish.name}</Text>
                                                        <Text style={orderStyle.cantidadPedido}>
                                                            Cantidad:  {item.quantity}
                                                        </Text>

                                                        <Text style={orderStyle.subtotal}>
                                                            Subtotal: ${(item.dish.price * item.quantity).toFixed(2)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            ))}
                    </View>
                </ScrollView>

                <View style={orderStyle.centeredContainer}>
                    <Text style={orderStyle.totalCancelado}>
                        Precio total: ${total.toFixed(2)}
                    </Text>
                </View>

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
        console.log(data);
        props.navigation.navigate(routeName, data);
    }
}
