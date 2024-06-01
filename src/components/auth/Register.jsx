import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import StyledText from '../StyledText';

export default function Register() {
    return (
        <View style={style.container}>
            <StyledText color='primary' size='title' bold='bold' style={style.marginForStatusBar}>
                Bienvenido
            </StyledText>
            <StyledText color='primary' size='header'>
                Primero para poder registrarte, tenemos que ver si sos residente del municipio
            </StyledText>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginForStatusBar: {
        marginTop: Constants.statusBarHeight
    },

});