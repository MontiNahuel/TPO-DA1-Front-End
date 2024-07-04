import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const EnRevision=({navigation})=>{
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
                <View style={{justifyContent:'center', marginBottom: 240, marginTop: 120}}>
                    <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name="pause-circle" size={100} color="#FAC710" />
                    </View>
                    <View>
                        <Text style={styles.textPrimario}>¡Publicación enviada a revisión con éxito!</Text>
                        <Text style={styles.textSecundario}>Tu publicación ya está cargada para que la vea el municipio y decida su aprobación.</Text>
                        <Text style={styles.textSecundario}>Para ver su estado podes visualizarla en: Cuenta - Mis Publicaciones</Text>
                    </View> 
                </View>
                <View>
                    <TouchableOpacity style={styles.previBoton} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.previText}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
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

export default EnRevision;