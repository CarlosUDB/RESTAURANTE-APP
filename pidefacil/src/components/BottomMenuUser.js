import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import color from '@styles/colors'


export default function BottomMenuUser(props) {

    return (
        <View style={styles.botones}>

            <TouchableOpacity style={styles.button}>

                <Ionicons size={34} name='restaurant-outline' color={color.PRIMARY_COLOR} onPress={props.onPressFirst} />

                <Text style={styles.texto}>Restaurantes</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>

                <Ionicons size={34} name='menu-outline' color={color.PRIMARY_COLOR} onPress={props.onPressSecond} />

                <Text style={styles.texto}>Orden</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>

                <Feather size={34} name='shopping-bag' color={color.PRIMARY_COLOR} onPress={props.onPressThird} />

                <Text style={styles.texto}>Pedidos</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>

                <Ionicons size={34} name='person-circle-outline' color={color.PRIMARY_COLOR} onPress={props.onPressFourth} />

                <Text style={styles.texto}>Perfil</Text>

            </TouchableOpacity>
                

        </View>
    )
}

/*
    backgroundColor: '#AD436D',

*/

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        height: 34,
        width: 84,
        marginTop: 15,
        marginLeft: 18,
        
       // backgroundColor:'red',
    },
    botones:{
       // backgroundColor: 'navy',
        flexDirection: 'row',
        height: '100%',
    },
    texto:{
        fontSize: 12,
        fontFamily: 'LibreBaskerville-Regular',
    }

});