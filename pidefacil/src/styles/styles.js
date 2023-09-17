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
        marginTop:40,
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

export { loginStyles, splashStyles }