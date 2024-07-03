import React from "react";
import { View,TouchableOpacity,Text,StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const PublicacionSinWifi=()=>{

    return(
        <View style={{flex:1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="grey" />
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Anuncio</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.textPrimario}>Publicar Anuncio</Text>
                    <Text style={styles.textSecundario}>Usted no posee una conexión wifi. ¿desea enviar el anuncio a través de la red de datos o mas tarde?</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.luegoBoton}>
                        <Text style={styles.luegoText}>Mas tarde</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.EnviarBoton}>
                        <Text style={styles.EnviarText}>Enviar ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent:'center',
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
        borderBottomWidth: 1,
      },
      textForHeader: {
        fontSize: 20,
      },
    textPrimario:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
    },
    textSecundario:{
        fontSize:15,
        textAlign:'center',
        marginTop:20,
    },
    EnviarBoton: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        marginRight:5,
        borderRadius: 5,
        flex:1,
        marginTop: 20,
        marginBottom:20,
      },
    EnviarText: {
        color: '#fff',
        fontSize: 18,
      },
    luegoBoton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        alignItems: 'center',
        marginRight:5,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'#414BB2',
        flex:1,
        marginTop: 20,
        marginBottom:20,
      },
    luegoText: {
        color: '#414BB2',
        fontSize: 18,
      },
 })

export default PublicacionSinWifi;