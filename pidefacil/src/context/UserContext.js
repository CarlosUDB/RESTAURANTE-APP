import React, { createContext, useReducer } from 'react'
import Snackbar from 'react-native-snackbar'
import { saveUser, deleteUser } from '@storage/UserAsyncStorage'

const initialState = {
    user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        user_type: '',
        restaurant_id: '',
        access_token: '',
        token_type: '',
    },
    active: false
}

const userReducer = (state = initialState, payload) => {

    switch (payload.type) {

        case 'logged':
            console.log('Bienvenidos al sistema')
            return { ...state, user: payload.data, active: true }
        case 'login':
            saveUser(payload.data).then((msg) => {
                console.log('Usuario guardado')
            })
            Snackbar.show({
                text: 'Sesión iniciada',
                duration: Snackbar.LENGTH_LONG,
            })

            return { ...state, user: payload.data, active: true }
        case 'logout':
            deleteUser().then((msg) => {
                console.log(msg)
            })
            Snackbar.show({
                text: 'Sesión expirada',
                duration: Snackbar.LENGTH_LONG,
            })

            return { ...state, user: payload.data, active: false }
        default:
            return state
    }
}

const UserContext = createContext(initialState)

function UserProvider(props) {

    const [login, loginAction] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={[login, loginAction]}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }