import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-elements'
import { UserContext } from '@context/UserContext'
import BottomMenuUser from '@components/BottomMenuUser'
import { API_URI, API_IMG } from '@config/GlobalVars'
import { Ionicons } from 'react-native-vector-icons'
import color from '@styles/colors'
import { estilo, pedidoStyle } from '@styles/styles'
import { orderStyle } from '../styles/styles'

export default function FinalOrderScreen(props) {
    const [login, loginAction] = useContext(UserContext)
    const loggedUser = login.user;
    const [finalOrders, setFinalOrder] = useState([]);
    

    useEffect(() => {
        (async function () {
            try {
                //Retrieving dishes info
                const response = await fetch(API_URI + '/major-orders/by-user-id/' + loggedUser.id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggedUser.access_token,
                    },
                });
                const data = await response.json();
                setFinalOrder(data); 
                //console.log(dishes);   

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
     displayDetails = (dato) =>{
         goToScreen('DetailFinalOrder', dato)
    }
    //Configurando formato de fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('es-ES', options);
        return formattedDate;
    }

    return (
        <View style={estilo.body}>
            <View style={estilo.header}>
            <View style={estilo.icon}>
                    <Ionicons 
                        size={34}
                        name="menu-outline"
                        color={color.PRIMARY_COLOR}
                    />
                </View>
                <View style={estilo.titulo}>
                    <Text style={estilo.textoTitulo}>Pedidos</Text>
                </View>
            </View>
            <View style={estilo.contenido}>
            {finalOrders.length === 0 ? (
                    <View style={orderStyle.noOrdersContainer}>
                        <Text style={orderStyle.noOrdersText}>No posees pedidos</Text>
                    </View>
                ) : (
                <ScrollView>
                    <View style={estilo.pack}>
                        {
                            finalOrders.map((item, key) => (
                                <View key={key}>
                                    <TouchableHighlight onPress={()=>displayDetails(item.id,key + 1)}>
                                        <View>
                                            <Card>
                                                <View style={pedidoStyle.individual}>

                                                    <View style={pedidoStyle.infoPedido}>
                                                        <Text style={pedidoStyle.nombre}>Pedido Nº: {key + 1}</Text>
                                                        <Text style={pedidoStyle.detalles}>Fecha:{formatDate(item.updated_at)}</Text>
                                                        <Text style={pedidoStyle.detalles}>Estado: {item.status === 'completed' ? 'Completado' : item.status === 'in_progress' ? 'En progreso' : item.status}</Text>
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
                )}
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
        props.navigation.navigate(routeName,data);

    }


}