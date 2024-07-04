import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getUserId, getIsVecino, getToken } from '../../backend/authLogin';
import NetInfo from '@react-native-community/netinfo';
import { enviarReclamosGuardados } from '../../backend/reclamos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import obtenerTodosLosAnuncios from '../../backend/homeAnuncios';
import { AuthContext } from '../context/ContextForApp';
import theme from '../../themeTextLight';
function Home() {

    const { state, dispatch } = React.useContext(AuthContext);
    const [anuncios, setAnuncios] = React.useState([]);

    const obtenerTodos = () => {
        obtenerTodosLosAnuncios(state.token).then(data => {
            //console.log(data);
            setAnuncios(data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.type === 'wifi' && state.isConnected) {
                enviarReclamosGuardados();
            }
        });

        return () => unsubscribe();
    }, []);

    const renderAnuncio = ({ item }) => (
        item.estado === 1 && (
            <View key={item.idAnuncio}>
                <TouchableOpacity>
                    <View style={styles.anuncioContainer}>
                        <Text style={styles.tipoContainer}>{item.tipoAnuncio}</Text>
                        <View style={styles.containerHeaderPublicacion}>
                            {item.user.imagen ? (
                                <Image 
                                    source={{ uri: `data:image/png;base64,${item.user.imagen}` }} 
                                    style={styles.perfilImagen} 
                                />
                            ) : (
                                <Image
                                    source={{uri: 'https://via.placeholder.com/100'}}
                                    style={styles.perfilImagen}
                                />
                            )}
                            <View>
                                <Text style={styles.nombrePublicacion}>{`${item.vecino.nombre} ${item.vecino.apellido}`}</Text>
                                <Text style={styles.tituloPublicacion}>{item.titulo}</Text>
                            </View>
                        </View>
                        <Text style={styles.descripcionPublicacion}>{item.descripcion}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    );

    const footerList = () => (
        <View>
            <Text style={{ marginTop: 35, marginBottom: 200, textAlign: 'center' }}>Ya viste todas las publicaciones</Text>
        </View>
    );

    const recuperarSesion = async () => {
        const token = await getToken();
        const userId = await getUserId();
        const isVecino = await getIsVecino();
        if (token && userId && isVecino) {
            dispatch({ type: 'LOGIN', payload: { user: userId, token: token, isVecino: isVecino } });
        }
    }

    useEffect(() => {
        recuperarSesion();
        obtenerTodos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Home</Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="bell" size={30} color='grey' />
                </TouchableOpacity>
            </View>
            <FlatList
                data={anuncios}
                renderItem={renderAnuncio}
                keyExtractor={(item) => item.idanuncio.toString()}
                onEndReached={obtenerTodos}
                onEndReachedThreshold={0.1}
                ListFooterComponent={footerList}
            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40,
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
    descripcionPublicacion: {
        marginBottom: 10
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
