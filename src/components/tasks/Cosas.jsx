import React from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, image } from "react-native";
import theme from "../../themeTextLight";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../context/ContextForApp";

function Cosas({navigation}) {

    const {state, dispatch} = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Menú</Text>
                </View>
                <TouchableOpacity

                >
                    <MaterialCommunityIcons name="bell" size={30} color='grey'/>
                </TouchableOpacity>
            </View>
            <View style={styles.subcontainer}>
                <Text style= {styles.text}>¿Viste algo en mal funcionamiento?</Text>
                <Text style= {styles.text}>Inicia un reclamo</Text>
                <TouchableOpacity 
                style={styles.button}
                >
                    <Text style={styles.textButton}>Iniciar Reclamo</Text>
                </TouchableOpacity>
            </View>
            {state.isVecino && (
                <View style={styles.subcontainer}>
                    <View style={styles.subcontainer}>
                        <Text style= {styles.text}>¿Tenes un negocio o queres ofrecer un servicio profesional?</Text>
                        <Text style= {styles.text}>Publicitate</Text>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('SeleccionDeAnuncio')}
                        style= {styles.button}
                        >
                            <Text style={styles.textButton}>Crear Publicacion</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style= {styles.text}>¿Viste algo que este por fuera de la ley?</Text>
                        <Text style= {styles.text}>Denuncialo</Text>
                        <TouchableOpacity
                        style= {styles.button}
                        >
                            <Text style= {styles.textButton}>Denunciar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style= {styles.text}>Mira todos los reclamos realizados</Text>
                        <TouchableOpacity 
                        style= {styles.button}
                        >
                            <Text style= {styles.textButton}>Ver Reclamos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default Cosas;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header : {
        width: '100%',
        marginTop: 20,
        marginBottom: 100,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    subHeader: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
    },
    textForHeader: {
        fontSize: 20,
        //fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
        //paddingHorizontal: 5,
    },
    buttonCheck: {
        backgroundColor: 'red',
    },
    subcontainer: {
        //backgroundColor: 'red',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '15%'
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 25
    },
    button: {
        backgroundColor: theme.colors.buttonColor,
        width: '90%',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    textButton: {
        color: theme.colors.textColorForButtonPrimary,
        textAlign: "center",
    },


});