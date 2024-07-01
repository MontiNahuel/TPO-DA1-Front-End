import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native";



const AccionRechazada=()=>{
    return(
        <View style={styles.container}>
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Image
                        source={require('./images/error_icon.png')}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.textPrimario}>¡Hubo un error!</Text>
                    <Text style={styles.textSecundario}>No pudimos realizar la accion.</Text>
                </View> 
            </View>
            <View>
                <TouchableOpacity style={styles.previBoton}>
                        <Text style={styles.previText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain', // Puedes cambiarlo a 'cover', 'stretch', etc.
        marginBottom:20,
      },
    denunContainer:{
        borderWidth:1,
        borderColor:'black',
        margin:10,
      },
      textDenunContainer:{
        margin:10,
        textAlign:'left',
        marginLeft:30,
      },
      textNombre:{
        fontSize:18,
          fontWeight:'bold',
          marginTop:5,
      },
      textId:{
        color:'grey',
      },
    textContainer:{
        alignItems:'center'
    },
    textPrimario:{
        fontSize:25,
        textAlign:'center'
    },
    textSecundario:{
        fontSize:15,
        textAlign:'center',
        marginTop:20,
    },
    previBoton:{
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    previText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default AccionRechazada;