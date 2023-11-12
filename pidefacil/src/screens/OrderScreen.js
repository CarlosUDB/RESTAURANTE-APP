import React, { useContext, useEffect, useState } from "react";
import {Text,View,Image,ScrollView,TouchableHighlight,} from "react-native";
import { Card } from "react-native-elements";
import { UserContext } from "@context/UserContext";
import BottomMenuUser from "@components/BottomMenuUser";
import { API_URI, API_IMG } from "@config/GlobalVars";
import Snackbar from 'react-native-snackbar';
import { Ionicons } from "react-native-vector-icons";
import color from "@styles/colors";
import { estilo, orderStyle } from "@styles/styles";

export default function OrderScreen(props) {
    const [login] = useContext(UserContext);
    const loggedUser = login.user;
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async function () {
            try {
                //Cargando órdenes en progreso por ID de usuario
                const response = await fetch(
                    API_URI + `/orders/in-progress-orders-by-user-id/${loggedUser.id}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + loggedUser.access_token,
                        },
                    }
                );
                const data = await response.json();
                // Cargando detalles de platilos por orden
                const ordersWithDishes = await Promise.all(
                    data.map(async (order) => {
                        const dishResponse = await fetch(
                            API_URI + `/dishes/${order.dish_id}`,
                            {
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + loggedUser.access_token,
                                },
                            }
                        );
                        const dishData = await dishResponse.json();
                        return { ...order, dish: dishData.dish };
                    })
                );
                //Calculando total general a cancelar
                setOrders(ordersWithDishes);
                const totalGeneral = ordersWithDishes.reduce(
                    (total, order) => total + order.dish.price * order.quantity, 0);
                setTotal(totalGeneral);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    ///////Cambiando estado de orden a completado
    const finishOrder = async () => {
        try {
            if (orders.length === 0) {
                console.error("No hay órdenes abiertas.");
                return;
            }
            const lastOrder = orders[orders.length - 1];
            const response = await fetch(
                `${API_URI}/major-orders/complete/${lastOrder.major_order_id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + loggedUser.access_token,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            Snackbar.show({
                text: 'Orden agregada a Pedidos',
                duration: Snackbar.LENGTH_SHORT,
            })
            goToScreen('FinalOrder')
        } catch (error) {
            console.error("Error de servidor:", error);
        }
    };

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
                    <Text style={estilo.textoTitulo}>Órdenes</Text>
                </View>
            </View>
            <View style={estilo.contenido}>
            {/* Verificando la existencia de órdenes*/}
                {orders.length === 0 ? (
                    <View style={orderStyle.noOrdersContainer}>
                        <Text style={orderStyle.noOrdersText}>
                            No posees órdenes existentes
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        <View style={estilo.pack}>
                            {orders.map((order, key) => (
                                <View key={key}>
                                    <TouchableHighlight>
                                        <Card>
                                            <View style={estilo.individual}>
                                                <View>
                                                    <Image
                                                        source={{ uri: API_IMG + order.dish.picture }}
                                                        style={orderStyle.imgPlatillo}
                                                    />
                                                </View>

                                                <View style={orderStyle.infoPlatillo}>
                                                    <Text style={orderStyle.nombre}>{order.dish.name}</Text>
                                                    <Text style={orderStyle.precio}>
                                                        Cantidad:  {order.quantity}
                                                    </Text>

                                                    <Text style={orderStyle.precio}>
                                                        Total combo: $ {(order.dish.price * order.quantity).toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableHighlight>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )}
                {/* Si se encuentran órdenes */}
                {orders.length > 0 && (
                    <View>
                        <View style={orderStyle.totalContainer}>
                            <Text style={orderStyle.total}>
                                Total órdenes: ${total.toFixed(2)}
                            </Text>
                        </View>
                        <View style={orderStyle.centeredContainer}>
                            <TouchableHighlight style={orderStyle.btnAgregarOrden} onPress={finishOrder}>
                                <Text style={{ color: "white", fontSize: 25, textAlign: "center" }}>
                                    Finalizar orden
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            </View>
            <View style={estilo.sections}>
                <BottomMenuUser
                    onPressFirst={() => goToScreen("Main")}
                    onPressSecond={() => goToScreen("Orders")}
                    onPressThird={() => goToScreen("FinalOrder")}
                    onPressFourth={() => goToScreen("Account")}
                />
            </View>
        </View>
    );

    function goToScreen(routeName, data) {
        //const {id} = data.params;
        console.log(data);
        //console.log(props);
        props.navigation.navigate(routeName, data);
    }
}
