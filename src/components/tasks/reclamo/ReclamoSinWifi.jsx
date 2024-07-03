import React from "react";
import { View,TouchableOpacity,Text,StyleSheet } from "react-native";



const ReclamoSinWifi=()=>{

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.textPrimario}>Enviar reclamo</Text>
                <Text style={styles.textSecundario}>Usted no posee una conexion wifi. ¿desea enviar el reclamo a traves de la red de datos o mas tarde?</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        justifyContent:'center',
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

export default ReclamoSinWifi;