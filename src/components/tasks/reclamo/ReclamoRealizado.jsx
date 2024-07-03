import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ReclamoRealizado=({navigation, route})=>{
    const {reclamo, direccion, status} = route.params;

    return(
        <View style={styles.container}>
            <View style={{marginBottom: 240}}>
                <View style={{alignItems:'center'}}>
                    {status === 0 ? 
                        <MaterialCommunityIcons name='pause-circle' size={100} color='#FAC710'/>
                        :
                        <MaterialCommunityIcons name='check-circle' size={100} color='#0CA789'/>
                    }
                </View>
                <View>
                    <Text style={styles.textPrimario}>¡Operacion exitosa!</Text>
                    {status === 0 && <Text style={styles.textSecundario}>Tu reclamo se enviará cuando estes conectado a una red wifi, puede que tarde un tiempo en impactar</Text>}
                    <Text style={styles.textSecundario}>Puedes visualizarlo en: Cuenta - Reclamos</Text>
                </View> 
                <View style={styles.denunContainer}>
                    <View style={styles.textDenunContainer}>
                        <Text style={styles.textNombre}>Motivo: {reclamo.descripcion}</Text>
                        <Text style={styles.textNombre}>Direccion: {direccion} </Text>
                        <Text style={styles.textId}>Estado: Enviado</Text>
                    </View>
                </View>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.previBoton} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.previText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent:'center',
        justifyContent:'center',
    },
    denunContainer:{
        borderWidth:1,
        borderColor:'black',
        margin:10,
        marginTop: 100
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
      textNormal:{
        marginTop:5
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
        width: '95%',
    },
    previText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default ReclamoRealizado;