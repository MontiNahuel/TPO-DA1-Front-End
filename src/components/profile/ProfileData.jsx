import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import vecinoData from '../../backend/vecinoData';
import { AuthContext } from '../context/ContextForApp';
import theme from '../../themeTextLight';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProfileData=({route, navigation})=>{

    const { email, profileData } = route.params;
    const {state, dispatch} = React.useContext(AuthContext);
    const [datosFaltantes, setDatosFaltantes] = useState({});
    const [cleanDocumento, setCleanDocumento] = useState('');

    useEffect(() => {
        if (state.isVecino) {
            vecinoData(state.userId, state.token).then(data => {
                console.log(data);
                setDatosFaltantes(data);
            }).catch(error => {
                console.log(error);
            }
            );
        } else {
            setCleanDocumento(profileData.documento.substring(3))
        }
    }, []);

    return (
        state.isVecino ? (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <Text style={styles.textForHeader}>Datos Personales</Text>
                    </View>
                </View>

                <View style={styles.muestraDatos}>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Email</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Direccion</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{datosFaltantes.direccion}</Text>
                        </View>
                    </View>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Telefono</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{datosFaltantes.dni}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Text style={styles.textForButton}>Volver</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <Text style={styles.textForHeader}>Datos Personales</Text>
                    </View>
                </View>

                <View style={styles.muestraDatos}>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Legajo</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{profileData.legajo}</Text>
                        </View>
                    </View>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Apellido</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{profileData.apellido}</Text>
                        </View>
                    </View>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Documento</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{cleanDocumento}</Text>
                        </View>
                    </View>
                    <View style={styles.menuDatos}>
                        <View>
                            <Text style={styles.menuTexto}>Categoria</Text>
                        </View>
                        <View style={styles.derecha}>
                            <Text style={styles.datosUsuario}>{profileData.categoria}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Text style={styles.textForButton}>Volver</Text>
                </TouchableOpacity>
            </View>
        )
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:'#fff',
        alignItems:'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 45,
        paddingBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    textForHeader: {
        fontSize: 20,
    },
    titulo:{
        alignSelf:'flex-start',
        marginVertical:10,
    },
    datosPersonales:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:10,
    },
    muestraDatos:{
        marginVertical:20,
        width: '90%',
    },
    menuDatos:{
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        flexDirection:'row',
    },
    menuTexto:{
        fontSize:18,
        color:'gray'
    },
    datosUsuario:{
        textAlign:'right',
        fontSize:18,
    },
    derecha:{
        alignContent:'flex-end',
        flex:1,
    },
    boton:{
        padding:15,
        backgroundColor: theme.colors.buttonColor,
        borderRadius:5,
        marginTop:20,
        alignItems:'center',
        marginTop: 350,
        width: '90%',
    },
    textForButton: {
        color: theme.colors.textColorForButtonPrimary,
        fontSize: 16,
    }
});

export default ProfileData;