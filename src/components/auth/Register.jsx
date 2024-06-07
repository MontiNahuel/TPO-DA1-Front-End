import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import Constants from 'expo-constants';
import StyledText from '../StyledText';
import Accordion from "../Accordion";
import StyledTextInput from "../StyledTextInput";
import themeTextLight from "../../themeTextLight";
import { verificarResidente } from '../../backend/authRegister';

export default function Register({navigation}) {
    
    const [dni, setDni] = useState('');
    const [seleccionDocumento, setSeleccionDocumento] = useState(-1);

    const verificarResidenteForButton = () => {
        let newDni = "";
        console.log('Verificar si es residente');
        if (seleccionDocumento === -1) {
            alert('Seleccione un tipo de documento');
        } else if (seleccionDocumento === 0) {
            newDni = "DNI"+dni;
            //console.log(newDni);
        } else {
            newDni = "PAS"+dni;
        }
        verificarResidente(newDni)
        .then(response => {
            alert(response);
            navigation.navigate('RegAllowed');
        }).catch(error => {
            alert(error.message);
        })
    }

    return (
        <View style={style.container}>
            <StyledText color='primary' size='title' bold='bold' style={style.marginForStatusBar}>
                Bienvenido
            </StyledText>
            <StyledText color='primary' size='header' style={style.text}>
                Primero para poder registrarte, tenemos que ver si sos residente del municipio
            </StyledText>
            <Accordion
                styleContainer={style.containerAccordion}
                styleButtonPrincipal={style.principalButtonAccordion}
                styleList={style.listAccordion}
                styleItemList={style.itemListAccordion}
                font={style.styleText}
                title='Seleccionar'
                setDecision={setSeleccionDocumento}
                valores={[{text: "DNI"}, {text: "Pasaporte"}]}
            />
            <StyledTextInput
            style={style.inputText}
            value={dni}
            onChangeText={setDni}
            placeholder= {seleccionDocumento === -1 || seleccionDocumento === 0 ? "DNI" : "Pasaporte"}
            placeholderTextColor={themeTextLight.colors.buttonColor}
            >
            </StyledTextInput>

            <TouchableOpacity
            style={style.buttonContinue}
            onPress={verificarResidenteForButton}
            >
                <Text style={style.textForButton}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    marginForStatusBar: {
        marginTop: Constants.statusBarHeight,
    },
    text: {
        textAlign: 'center',
        marginTop: 50,
        marginHorizontal: 25
    },
    containerAccordion : {
        marginTop: 30
    },
    principalButtonAccordion: {
        backgroundColor: '#F4F4F4',
        borderBottomColor: '#0077B6',
        borderBottomWidth: 1,
        width: '90%'
    },
    listAccordion: {
        backgroundColor: '#f4f4f4',
        justifyContent: "center",
        alignItems: "center"
    },
    itemListAccordion: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 8,
        width: '90%'
    },
    styleText: {
        fontSize: 18
    },
    inputText: {
        marginTop: 20,
        width: '95%'
    },
    buttonContinue: {
        backgroundColor: themeTextLight.colors.buttonColor,
        width: '95%',
        borderRadius: 5,
        marginTop: 100,
        paddingVertical: 15
    },
    textForButton: {
        textAlign: "center",
        fontSize: themeTextLight.size.textForButton,
        color: themeTextLight.colors.textColorForButtonPrimary
    }
});