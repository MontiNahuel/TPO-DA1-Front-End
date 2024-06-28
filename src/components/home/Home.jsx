import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//import anuncios from '../../extra/home';
import obtenerTodosLosAnuncios from '../../backend/homeAnuncios';
import { AuthContext } from '../context/ContextForApp';
import theme from '../../themeTextLight';

function Home() {

    const {state, dispatch} = React.useContext(AuthContext);
    const [anuncios, setAnuncios] = React.useState([]);

    const obtenerTodos = () => {
        obtenerTodosLosAnuncios(state.token).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    const renderAnuncio = ({ item }) => (
        <View>
            <TouchableOpacity>
                <View style={styles.anuncioContainer}>
                <Text style={styles.tipoContainer }>{item.tipoAnuncio}</Text>
                <View style= {styles.containerHeaderPublicacion}>
                {item.user.imagen && (
                    <Image 
                        source={{ uri: `data:image/png;base64,${item.user.imagen}` }} // Suponiendo que item.user.imagen contiene los datos binarios de la imagen en formato base64
                        style={styles.perfilImagen} 
                    />
                )}
                    <View>
                        <Text style={styles.nombrePublicacion}>{[item.vecino.nombre, " ", item.vecino.apellido]}</Text>
                        <Text style={styles.tituloPublicacion}>{item.titulo}</Text>
                    </View>
                </View>
                <Text style={styles.descripcionPublicacion}>{item.descripcion}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const footerList = () => {
        return (
            <View>
                <Text style= {{marginTop: 35 ,marginBottom: 200, textAlign: 'center'}}>Ya viste todas las publicaciones</Text>
            </View>
        );
    }

    
    useEffect(() => {
        obtenerTodosLosAnuncios(state.token).then(data => {
            setAnuncios(data);
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }
    , []);

    return (
        <View style= {styles.container}>
            <View style={styles.header}>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Home</Text>
                </View>
                <TouchableOpacity

                >
                    <MaterialCommunityIcons name="bell" size={30} color='grey'/>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                data={anuncios}
                renderItem={renderAnuncio}
                keyExtractor={(item) => item.idAnuncio.toString()}
                onEndReached={obtenerTodos} // Función llamada al llegar al final del scroll
                onEndReachedThreshold={0.1} // Porcentaje del final del scroll en el que se llama onEndReached
                ListFooterComponent={footerList}
                />
                
            </View>
            
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 120,
        paddingBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    textForHeader: {
        fontSize: 20,
    },
    perfilImagen: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    containerHeaderPublicacion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    nombrePublicacion: {
        marginRight: 5
    },
    tituloPublicacion: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.colors.buttonColor
    },
    descripcion: {
        marginBottom: 10
    },
    imagenPublicacion: {
        width: 100,
        height: 80,
        marginRight: 10
    },
    anuncioContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    tipoContainer: {
        color: '#3889B5',
        marginBottom: 4,
    }

});