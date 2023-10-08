import {StyleSheet} from 'react-native';
import colors from './colors';

const imageBackgroundStyle = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BACKGROUND
    }, 
    contenedor:{
        flex: 1,
    },

})

export { imageBackgroundStyle }