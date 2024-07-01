import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { CheckBox } from 'react-native-elements';
import Constants from 'expo-constants';
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { StyleSheet } from "react-native";
import StyledTextInput from "../StyledTextInput";
import StyledText from "../StyledText";
import StyledSwitch from "../StyledSwitch";
import themeTextLight from "../../themeTextLight";
import { authLogin, authLoginInspector, saveToken, saveUserId, saveIsVecino } from "../../backend/authLogin";
import { AuthContext } from "../context/ContextForApp";

export default function Llogin() {
    
    const navigation = useNavigation();

    const {state, dispatch} = React.useContext(AuthContext);

    const [isVecino, setIsVecino] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('Inicio de sesion no valido');

    const loginVecino = () => {
        authLogin(dni, password)
        .then(response => {
            console.log(response);
            dispatch({type: 'LOGIN', payload: {user: dni, token: response.token, isVecino: isVecino}});
            console.log(state);
            if (isSelected) {
                saveToken(response.token);
                saveUserId(dni);
                saveIsVecino(isVecino);
            }
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
            setShowMessage(true);
        }
        );
    }

    const loginInspector = () => {
        authLoginInspector(dni, password)
        .then (response => {
            console.log("hola", response);
            dispatch({type: 'LOGIN', payload: {user: dni, token: response.token, isVecino: isVecino}});
            console.log(state);
            navigation.navigate('Home');
        }).catch(error => {
            console.log(error);
            //console.log("hola");
            setShowMessage(true);
        });
    }

    return (
        <View style = {styles.container}>

            <StyledText color='primary' size='title' style = {styles.title}>Bienvenido</StyledText>

            <StyledSwitch texto1="Vecino" texto2="Inspector" pressFunction={setIsVecino} changeMessage={setShowMessage}/>

            <View style= {styles.inputs}>
                <StyledTextInput 
                placeholder={isVecino ? "DNI" : "Legajo"} 
                placeholderTextColor="#0077B6"
                value={dni}
                onChangeText={setDni}
                />
                <StyledTextInput 
                placeholder="Contraseña" 
                placeholderTextColor="#0077B6"
                value={password}
                onChangeText={setPassword}
                />
            </View>
            <View style={styles.containerCheck}>
                <CheckBox
                    title=""
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkboxContainer}
                />
                <Text style={styles.checkboxText}>
                    Mantener la sesion iniciada
                </Text>
            </View>
            {showMessage && <Text style={{color: 'red', textAlign: 'center', marginBottom: 10}}>{message}</Text>}
            <TouchableOpacity 
            title="Ir a Registro" 
            onPress={isVecino ? loginVecino : loginInspector}
            style={styles.buttonPrimary}>
                <Text style={[{color: 'white'}, styles.textForButton]}>Iniciar Sesión</Text>
            </TouchableOpacity>

            {isVecino && (
                <>
                    <TouchableOpacity 
                    title="Ir a Registro" 
                    onPress={() => {navigation.navigate("Register")}} 
                    style={styles.buttonSecondary}>
                        <Text style={[{color: '#0077B6'}, styles.textForButton]}>Registrarse</Text>
                    </TouchableOpacity>
                    <View style= {styles.forgotPassword}>
                        <StyledText color='primary' size= 'subheader'>¿No puede inciar sesión?  </StyledText>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('RecuperarClave')}
                        >
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
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 15
    },
    containerCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    checkboxText: {
        flex: 1,
        marginLeft: 5,
        color: '#333',
        fontSize: 14,
    },
    buttonPrimary: {
        backgroundColor: '#0077B6',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: themeTextLight.size.textForButton
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
    },
    textForButton: {
        textAlign: "center",
        fontSize: themeTextLight.size.textForButton
    }
})