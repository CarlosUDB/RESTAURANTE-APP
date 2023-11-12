import React, { useContext, useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { UserContext } from "@context/UserContext";
import BottomMenuUser from "@components/BottomMenuUser";
import { API_URI, API_IMG } from "@config/GlobalVars";
import { useDebugValue } from "react";
import { Ionicons } from "react-native-vector-icons";
import Snackbar from "react-native-snackbar";
import color from "@styles/colors";
import colors from "../styles/colors";
import { estilo, detallePlatilloStyle } from "@styles/styles";
import { TextInput } from "react-native-gesture-handler";

export default function DetailDishScreen(props) {
    const [login, loginAction] = useContext(UserContext);
    const [dish, setDish] = useState();
    const loggedUser = login.user;
    let dish_id = props.navigation.state.params;
    const [cantidad, setCantidad] = useState("");
    ///////////////////
    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(API_URI + "/dishes/" + dish_id, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + loggedUser.access_token,
                    },
                });
                const { dish } = await response.json();
                setDish(dish);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    console.log("Hola ", dish);
    //Agregando el platillo
    const agregarPlatillo = async () => {
        const requestData = {
            dish_id: dish_id,
            quantity: cantidad,
        };

        try {
            //vAlidando la entrada del usuario
            if (!cantidad) {
                Snackbar.show({
                    text: "Por favor, agrega la cantidad a ordenar",
                    duration: Snackbar.LENGTH_SHORT,
                });
                return;
            }
            //Admitiendo sólo enteros
            const cantidadInput = parseInt(cantidad, 10);
            if (isNaN(cantidadInput) || cantidadInput !== parseFloat(cantidad)) {
                Snackbar.show({
                    text: "Ingresa una cantidad válida",
                    duration: Snackbar.LENGTH_SHORT,
                });
                return;
            }
            //Con la entrada correcta (números enteros):
            const response = await fetch(API_URI + `/orders/${loggedUser.id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + loggedUser.access_token,
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 200) {
                console.log("Platillo agregado a orden");
                Snackbar.show({
                    text: "Platillo agregado a Orden",
                    duration: Snackbar.LENGTH_SHORT,
                });
                props.navigation.goBack(); //Regresando a la screen anterior
            } else {
                console.log("Error de servidor");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };
    ////////////////////
    return (
        <View style={estilo.body}>
            <View style={detallePlatilloStyle.contenido}>
                <ScrollView>
                    <View>
                        {dish && (
                            <View>
                                <TouchableHighlight>
                                    <View>
                                        <View style={detallePlatilloStyle.main}>
                                            <Text style={detallePlatilloStyle.name}>{dish.name}</Text>
                                            <Image
                                                style={detallePlatilloStyle.img}
                                                source={{ uri: API_IMG + dish.picture }}
                                            />
                                            <Text style={detallePlatilloStyle.precio}>
                                                Precio: ${dish.price}
                                            </Text>
                                        </View>
                                        <View style={detallePlatilloStyle.description}>
                                            <Text style={detallePlatilloStyle.textoDesc}>
                                                {dish.description}
                                            </Text>
                                        </View>
                                        <View style={detallePlatilloStyle.botones}>
                                            <View style={detallePlatilloStyle.cantidad}>
                                                <Text style={detallePlatilloStyle.textoCantidad}>
                                                    Cantidad:{" "}
                                                </Text>
                                                <TextInput
                                                    placeholder="ej. 3"
                                                    keyboardType="numeric"
                                                    style={{
                                                        backgroundColor: color.BACKGROUND,
                                                        width: 150,
                                                    }}
                                                    value={cantidad}
                                                    onChangeText={setCantidad}
                                                />
                                            </View>
                                            <View style={detallePlatilloStyle.agregar}>
                                                <TouchableHighlight
                                                    style={detallePlatilloStyle.btnAgregar}
                                                    onPress={agregarPlatillo}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "white",
                                                            fontSize: 25,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Agregar
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            <View style={detallePlatilloStyle.sections}>
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
