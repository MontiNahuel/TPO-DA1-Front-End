import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { obtenerSitiosSimilares, obtenerDesperfectos, guardarReclamo } from "../../../backend/reclamos";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Accordion from "../../Accordion";
import { AuthContext } from "../../context/ContextForApp";
import { ImageContext } from "../anuncio/ImageProvider";

const IniciarReclamo = ({ navigation }) => {

    const [direccion, setDireccion] = useState('');
    const [direccionParaFetch, setDireccionParaFetch] = useState(-1);
    const [desperfectos, setDesperfecto] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [decisionAccordeon, setDecisionAccordeon] = useState(-1);
    const [sitiosSimilares, setSitiosSimilares] = useState([]);
    const { state } = useContext(AuthContext);
    const { images, setImages } = useContext(ImageContext);

    useEffect(() => {
        obtenerDesperfectos(state.token)
            .then(data => {
                console.log("Desperfectos: ", data);
                data.push({ descripcion: "Otro" });
                setDesperfecto(data);
            })
            .catch(error => {
                console.log("Error al obtener desperfectos: ", error);
            });

        // Listener para detectar cambios de red
    }, []);

    const handleGuardarReclamo = async () => {
        if (direccion === '') {
            Alert.alert("Error", "Debe ingresar una dirección");
            return;
        }
        if (decisionAccordeon === -1) {
            Alert.alert("Error", "Debe seleccionar un desperfecto");
            return;
        }
        if (descripcion === '') {
            Alert.alert("Error", "Debe ingresar una descripción");
            return;
        }
        console.log("handleGuardarReclamo start");
        console.log(decisionAccordeon)
        const imagen = images.map(image => image.base64);
        const reclamo = {
            idreclamo: null,
            documento: state.userId,
            idsitio: direccionParaFetch,
            iddesperfecto: decisionAccordeon + 1 === desperfectos.length ? null : decisionAccordeon + 1,
            descripcion: descripcion,
            estado: null,
            idreclamounificado: null,
            legajo: null,
            imagen: imagen
        };
        console.log("Reclamo data:", reclamo);

        const networkState = await NetInfo.fetch();
        console.log("Network state:", networkState);

        if (networkState.type === 'cellular' && networkState.isConnected) {
            console.log("Estás usando datos móviles");
            Alert.alert(
                "Conexión de Datos Móviles",
                "Estás utilizando datos móviles. ¿Deseas subir el reclamo ahora o esperar a una conexión Wi-Fi?",
                [
                    {
                        text: "Esperar",
                        onPress: () => {guardarReclamoLocal(reclamo); navigation.navigate('ReclamoRealizado', {reclamo : reclamo, direccion: direccion, status: 0});},
                        style: "cancel"
                    },
                    {
                        text: "Subir Ahora",
                        onPress: () => guardarReclamo(reclamo, state.token)
                            .then(data => { console.log("Reclamo guardado: ", data); })
                            .catch(error => { console.log("Error al guardar reclamo: ", error); })
                    }
                ]
            );
        } else {
            console.log("Guardando reclamo");
            guardarReclamo(reclamo, state.token)
                .then(data => {
                    console.log("Reclamo guardado: ", data);
                    navigation.navigate('ReclamoRealizado', {reclamo : reclamo, direccion: direccion, status: 1});
                })
                .catch(error => {
                    console.log("Error al guardar reclamo: ", error);
                });
        }
    }

    const guardarReclamoLocal = async (reclamo) => {
        try {
            const reclamosGuardados = JSON.parse(await AsyncStorage.getItem('reclamosPendientes')) || [];
            reclamosGuardados.push(reclamo);
            await AsyncStorage.setItem('reclamosPendientes', JSON.stringify(reclamosGuardados));
            console.log("Reclamo guardado localmente");
        } catch (error) {
            console.log("Error al guardar reclamo localmente: ", error);
        }
    }

    // Función para actualizar la lista de sitios similares
    const actualizarSitiosSimilares = async () => {
        obtenerSitiosSimilares(direccion, state.token)
            .then(data => {
                console.log("Sitios similares: ", data);
                setSitiosSimilares(data);
            })
            .catch(error => {
                console.log("Error al obtener sitios similares: ", error);
            });
    }

    // Renderizado de cada elemento de la lista de sitios similares
    const renderSitioItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.itemList, { zIndex: 100, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }]}
            onPress={() => {
                console.log(item.idSitio)
                setDireccionParaFetch(item.idSitio);
                setDireccion(item.calle + " " + item.numero);
                setSitiosSimilares([]);
            }}
        >
            <Text>{item.calle} {item.numero}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color='grey' />
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Realizar Reclamo</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textTitulo}>Dirección</Text>
                <TextInput
                    style={styles.textIngreso}
                    value={direccion}
                    onChangeText={(text) => {
                        setDireccion(text);
                        actualizarSitiosSimilares();
                    }}
                />
                {/* Lista de sitios similares */}
                <FlatList
                    data={sitiosSimilares.slice(0, 5)}
                    renderItem={renderSitioItem}
                    keyExtractor={(item) => item.idSitio}
                    style={styles.listCoincidencias}
                />
                <Text style={styles.textTitulo}>Motivo del reclamo</Text>
                <TextInput
                    style={[styles.textIngreso, { zIndex: 0 }]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline={true}
                    numberOfLines={6}
                />
                <Text style={styles.textTitulo}>Desperfecto</Text>
                <Accordion
                    styles={{ zIndex: 100 }}
                    title={"Seleccione el desperfecto"}
                    valores={
                        desperfectos.map((desperfecto) => {
                            return { text: desperfecto.descripcion };
                        })
                    }
                    styleButtonPrincipal={styles.buttonPrincipal}
                    styleList={styles.list}
                    styleItemList={styles.itemList}
                    font={styles.textButton}
                    styleContainer={styles.container}
                    setDecision={setDecisionAccordeon}
                />
            </View>
            <View style={styles.containerBoton}>
                <TouchableOpacity style={styles.siguienteBoton} onPress={() => navigation.navigate('Imagenes')}>
                    <Text style={styles.siguienteText}>Imágenes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previBoton} onPress={handleGuardarReclamo}>
                    <Text style={styles.previText}>Publicar Reclamo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonPrincipal: {
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'black',
        borderRadius: 5,
        width: '95%',
        paddingRight: 15
    },
    listCoincidencias: {
        marginHorizontal: 15
    },
    list: {
        width: '95%',
        borderWidth: 0,
        borderRadius: 0,
        marginTop: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemList: {
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor:'black',
        width: '100%',

    },
    container:{
        flex: 0,
        backgroundColor: '#f4f4f4',
        // justifyContent: 'center',
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
    textTitulo:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'left',
        marginTop:30,
        marginHorizontal: 15
    },
    textIngreso:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:2,
        paddingVertical:3,
        paddingHorizontal:3,
        marginHorizontal: 15
    },
    siguienteBoton: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#414BB2',
        borderRadius: 5,
        marginTop: 50,
        marginBottom:15,
        width: '95%',
    },
      siguienteText: {
        color: '#414BB2',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerBoton:{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 200
    },
    previBoton:{
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        width: '95%',
    },
    previText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default IniciarReclamo;