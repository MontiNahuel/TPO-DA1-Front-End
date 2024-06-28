import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import theme from '../../../themeTextLight';

function SeleccionDeAnuncio({navigation}) {

    const [seleccion, setSeleccion] = React.useState(-1);
    const [estaSeleccionado, setEstaSeleccionado] = React.useState(false);

    function handleButtons (value) {
        setSeleccion(value);
        setEstaSeleccionado(true);
    }

    return (
        <View>
            <View style={s.header}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name="chevron-left" size={30} color='grey'/>
                </TouchableOpacity>
                <View style={s.subHeader}>
                    <Text style={s.textForHeader}>Crear Publicacion</Text>
                </View>
            </View>
            <Text style={s.title}>¿Qué desea publicitar?</Text>
            <View style={s.containerButtons}>
                <View style={s.botonEntero}>
                    <TouchableOpacity
                    style={ seleccion === 0 ? s.buttonSeleccionado : s.button }
                    onPress={() => handleButtons(0)}
                    >
                        <MaterialCommunityIcons name='account-circle' color={seleccion === 0 ? theme.colors.buttonColor : '#808080'} size={50}/>
                    </TouchableOpacity>
                    <Text style= {s.textButton}>Servicio Profesional</Text>
                </View>
                <View style={s.botonEntero}>
                    <TouchableOpacity
                    style={ seleccion === 1 ? s.buttonSeleccionado : s.button }
                    onPress={() => handleButtons(1)}
                    >
                        <MaterialCommunityIcons name='door-sliding' color={seleccion === 1 ? theme.colors.buttonColor : '#808080'} size={50}/>
                    </TouchableOpacity>
                    <Text style={s.textButton}>Comercio</Text>
                </View>
            </View>

            <TouchableOpacity
            onPress={() => navigation.navigate('FormParaAnuncio', {seleccion: seleccion})}
            style={ !estaSeleccionado ? [s.buttonSiguiente, {backgroundColor: '#5C879D'}] : s.buttonSiguiente }
            disabled={!estaSeleccionado}
            >
                <Text style={s.textForButtonSiguiente}>Siguiente</Text>
            </TouchableOpacity>

        </View>
    );
}

export default SeleccionDeAnuncio;

const s = StyleSheet.create({
    container:{
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    textForHeader: {
        fontSize: 20,
    },
    text: {
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    botonEntero: {
        //backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 30,
        borderRadius: 100,
    },
    buttonSeleccionado: {
        alignItems: 'center',
        backgroundColor: '#CCE4F0',
        padding: 30,
        borderRadius: 100,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        width: 110
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50
    },
    buttonSiguiente: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        backgroundColor: theme.colors.buttonColor,
        marginTop: 150
    },
    textForButtonSiguiente: {
        color: theme.colors.textColorForButtonPrimary,
        textAlign: "center",
        fontSize: 18,
    }
});