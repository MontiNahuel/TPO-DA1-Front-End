import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import Constants from 'expo-constants';
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { StyleSheet } from "react-native";
import StyledTextInput from "../StyledTextInput";
import StyledText from "../StyledText";
import StyledSwitch from "../StyledSwitch";



export default function Llogin() {
    
    const navigation = useNavigation();

    const [isVecino, setIsVecino] = useState(true);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style = {styles.container}>

            <StyledText color='primary' size='title' style = {styles.title}>Bienvenido</StyledText>

            <StyledSwitch texto1="Vecino" texto2="Inspector" pressFunction={setIsVecino}/>

            <View style= {styles.inputs}>
                <StyledTextInput placeholder={isVecino ? "DNI" : "Legajo"} placeholderTextColor="#0077B6"/>
                <StyledTextInput placeholder="Contraseña" placeholderTextColor="#0077B6"/>
            </View>

            <TouchableOpacity 
            title="Ir a Registro" 
            onPress={() => {navigation.navigate("Register")}} 
            style={styles.buttonPrimary}>
                <Text style={{color: 'white', textAlign: 'center'}}>Iniciar Sesión</Text>
            </TouchableOpacity>

            {isVecino && (
                <>
                    <TouchableOpacity 
                    title="Ir a Registro" 
                    onPress={() => {navigation.navigate("Register")}} 
                    style={styles.buttonSecondary}>
                        <Text style={{color: '#0077B6', textAlign: 'center'}}>Registrarse</Text>
                    </TouchableOpacity>
                    <View style= {styles.forgotPassword}>
                        <StyledText color='primary' size= 'subheader'>¿No puede inciar sesión?  </StyledText>
                        <TouchableOpacity>
                            <Text style= {styles.forgotPasswordButton} >Olvidé mi clave</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor:'#F4F4F4',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight
    },
    title: {
        textAlign: 'center',
        fontWeight: 700,
        marginBottom: 80,
        marginTop: 80
    },
    inputs: {
        marginBottom: 80
    },
    buttonPrimary: {
        backgroundColor: '#0077B6',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonSecondary: {
        borderColor: '#0077B6',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 2
    },
    forgotPassword: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    forgotPasswordButton: {
        color: '#0077B6',
        fontWeight: '700'
    }
})