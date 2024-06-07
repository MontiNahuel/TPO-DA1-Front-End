import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/ContextForApp";
function Profile() {

    const {state, dispatch} = React.useContext(AuthContext);

    const cerrarSesion = () => {
        dispatch({type: 'LOGOUT'});
    }

    return (
        <View>
            <Text>Tu perfil!</Text>
            <TouchableOpacity
            onPress={cerrarSesion}
            >
                <Text>Cerrar Sesion</Text>
            </TouchableOpacity>

            <View>
                <Text>{state.isVecino ? <Text>Vecino</Text> : <Text>Inspector</Text>}</Text>
                <Text>{state.userId}</Text>
            </View>

        </View>
    );
}

export default Profile;