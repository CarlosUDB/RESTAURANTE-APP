import { StyleSheet } from 'react-native'
import color from './colors'

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.BACKGROUND,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.BACKGROUND
    },

    logo: {
        paddingTop: 40,
        alignItems: 'center',
    },

    btnMain: {
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: color.PRIMARY_COLOR,
        borderRadius: 60
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.PRIMARY_COLOR,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btnTxt: {
        textAlign: 'center',
        fontSize: 17,
        color: color.BACKGROUND,
        paddingVertical: 15,
        fontFamily: 'LibreBaskerville-Regular',
    },

    txtTransparent: {
        color: color.BACKGROUND,
        fontSize: 14,
        fontFamily: 'LibreBaskerville-Regular',
    }
})
//Estilos para main con header y menu de botones
const estilo = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',

        //backgroundColor: 'teal',
    },
    header: {
        //flex:1,
        //backgroundColor: 'cornflowerblue',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.BACKGROUND,
    },
    icon: {
        //backgroundColor: 'black',
    },
    iconBack: {

    },
    titulo: {
        //backgroundColor: 'white',
        marginLeft: 15,

    },
    textoTitulo: {
        fontSize: 34,
        fontFamily: 'LibreBaskerville-Regular',

    },
    contenido: {
        //flex:1,
        flexDirection: 'column',
        //backgroundColor: 'green',
        height: '80%',
        fontFamily: 'LibreBaskerville-Regular',

    },
    sections: {
        flex: 1,
        backgroundColor: color.BACKGROUND,
        height: '10%',
    },
    prueba: {
        height: 100,
    },
    contenidoUser: {
        flexDirection: 'column',
        //backgroundColor: 'green',
        height: '80%',
        fontFamily: 'LibreBaskerville-Regular',
        //justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },
    textoTitulo2: {
        fontSize: 25,
        marginLeft: 30,
        marginRight: 58,
        textAlign:'center',
        fontFamily: 'LibreBaskerville-Regular',

    },
    botonesEditar: {
        marginTop: 50,
    },
    nombre: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 25,
        marginTop: 10,
        marginLeft:10,
    },
    individual:{
        flexDirection:'row',
        justifyContent: 'center',
        //backgroundColor: 'teal',

    },

})
/****** PLATILLOS *******/
const platilloStyle = StyleSheet.create({
    individual: {
        flexDirection: 'row',
    },
    imgPlatillo: {
        //backgroundColor:'teal',
        width: '30%',
        height: 100,
    },
    infoPlatillo: {
        //backgroundColor: 'navy',
        width: '70%',
        padding: 15,
        justifyContent: 'space-around',

    },
    nombre: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 25,
    },
    precio: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
    },
})
/**** Detalle platillo ****/
const detallePlatilloStyle = StyleSheet.create({
    contenido:{
        height: '90%',
    },
    sections:{
        backgroundColor: color.BACKGROUND,
        height: '10%',
    },
    main:{
        alignItems: 'center',
        //backgroundColor: 'teal',
        width: '100%',
        marginTop: 50,
    },
    name:{
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 25,
    },
    img:{
        height:200,
        width:200,
    },
    precio:{
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 20,
    },
    description:{
        padding:20,
        
    },
    textoDesc:{
        textAlign: 'justify',
        fontSize: 17,
    },
    botones:{
        //backgroundColor: 'teal',
        alignItems: 'center',
    },
    cantidad:{
        flexDirection: 'row',
        
        alignItems: 'center',
        
    },
    textoCantidad:{
        fontSize: 20,
    },
    btnAgregar:{
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: color.PRIMARY_COLOR,
        borderRadius: 60,
        height: 40
    },

})


/****** ORDEN *******/
const orderStyle = StyleSheet.create({
    individual: {
        flexDirection: 'row',
    },
    imgPlatillo: {
        //backgroundColor:'teal',
        width: 100,
        height: 100,
        marginRight: 10,
    },
    infoPlatillo: {
        //backgroundColor: 'navy',
        flex: 1,
        padding: 15,
        justifyContent: 'space-around',

    },
    nombre: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 19,
        fontWeight: 'bold',
    },
    nombrePedido: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign:'right',
    },
    cantidadPedido: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign:'right',
    },
    subtotal: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign:'right',
    },
    precio: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
    },

    total: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 20,
    },
    totalCancelado: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 22,
        marginRight: 10,
        marginBottom: 20,
    },
    btnAgregarOrden:{
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: color.PRIMARY_COLOR,
        borderRadius: 60,
        height: 40
    },
    totalContainer: {
        alignItems: 'flex-end', 
        paddingRight: 15, 
        marginTop: 40, 
    },

    centeredContainer: {
        alignItems: 'center', 
        marginTop: 15, 
    },
    noOrdersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrdersText: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: color.PRIMARY_COLOR, 
    },

})
/****** PLATILLOS *******/
const pedidoStyle = StyleSheet.create({
    individual: {
        flexDirection: 'row',
    },

    infoPedido: {
        width: '70%',
        padding: 15,
        justifyContent: 'space-around',

    },
    nombre: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 25,
        marginBottom:10,
    },
    detalles: {
        fontFamily: 'LibreBaskerville-Regular',
        fontSize: 15,
    },
})

export { loginStyles, splashStyles, estilo, platilloStyle, detallePlatilloStyle, orderStyle, pedidoStyle }