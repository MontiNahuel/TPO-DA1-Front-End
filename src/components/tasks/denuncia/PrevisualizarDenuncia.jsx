import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from 'react-native-elements';

const PrevisualizarDenuncia = ({ navigation, route }) => {
    const { nombre, direccion, motivo } = route.params;
    const [isSelected, setSelection] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerDenun}>
                <Text style={styles.textIngreso}>Usted está denunciando a:</Text>
                <Text style={styles.textTitulo}>{nombre}</Text>
                <Text style={styles.textIngreso}>DNI Número:</Text>
                <Text style={styles.textTitulo}>$DNI</Text>
                <Text style={styles.textIngreso}>Con domicilio en:</Text>
                <Text style={styles.textTitulo}>{direccion}</Text>
                <Text style={styles.textIngreso}>Por:</Text>
                <Text style={styles.textTitulo}>{motivo}</Text>
            </View>
            <View style={styles.containerCheck}>
                <CheckBox
                    title=""
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkboxContainer}
                />
                <Text style={styles.checkboxText}>
                    Usted acepta, en carácter de declaración jurada, que lo indicado en el objeto de la denuncia y pruebas aportadas en caso de falsedad puede dar lugar a una acción judicial por parte del municipio y/o los denunciados.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.publishButton}>
                    <Text style={styles.publishButtonText}>Publicar denuncia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    containerDenun: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
    },
    containerCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
    },
    checkboxText: {
        flex: 1,
        marginLeft: 10,
        color: '#333',
        fontSize: 14,
    },
    textTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        marginBottom: 10,
    },
    textIngreso: {
        color: '#666',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    publishButton: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
    },
    publishButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    backButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#0077B6',
    },
    backButtonText: {
        color: '#0077B6',
        fontSize: 18,
    },
});

export default PrevisualizarDenuncia;
