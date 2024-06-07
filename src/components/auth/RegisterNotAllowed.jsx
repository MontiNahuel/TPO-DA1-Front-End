import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import themeTextLight from "../../themeTextLight";
import { useNavigation } from '@react-navigation/native';

export default function RegisterNotAllowed() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Registro no Habilitado</Text>
            <View>
                <Text style={styles.text}>
                    No podemos confirmar que seas residente del municipio, por lo tanto no podemos
                    seguir con el registro.
                </Text>
                <Text style={styles.text}>
                    Por cualquier tema administrativo de cambio de domicilio, debes presentarte en el
                    municipio de forma presencial
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.textForButton}>Volver Al Inicio</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
    },
    textTitle: {
        fontSize: themeTextLight.size.title,
        fontWeight: themeTextLight.fontWeights.bold,
        marginBottom: 80,
        marginTop: 250
    },
    text: {
        fontSize: themeTextLight.size.subHeader,
        marginBottom: 20,
        marginHorizontal: 20,
        //backgroundColor: 'cyan',
        textAlign: 'justify'
    },
    button: {
        borderRadius: 5,
        width: '95%',
        paddingVertical: 15,
        backgroundColor: themeTextLight.colors.buttonColor,
        marginTop: 50
    },
    textForButton: {
        color: themeTextLight.colors.textColorForButtonPrimary,
        fontSize: themeTextLight.size.textForButton,
        textAlign: 'center',
    }
})