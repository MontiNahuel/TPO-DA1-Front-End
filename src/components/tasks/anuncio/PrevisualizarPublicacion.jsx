import React from "react";
import { View,Image,Text,StyleSheet,TouchableOpacity} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const PrevisualizarPublicacion=({ route,navigation })=>{
    const { titulo,descripcion } = route.params;

    const foto_dueño='https://via.placeholder.com/100'
    const imagen=['https://via.placeholder.com/100','https://via.placeholder.com/100','https://via.placeholder.com/100','https://via.placeholder.com/100']

    return(
        <View style={{flex:1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="grey" />
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Crear Publicacion</Text>
                </View>
            </View>
            <View style={styles.container}>
                    <View style={styles.containerPubli}>
                        <View style={styles.textContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        source={foto_dueño}
                                        style={styles.profileImage}
                                    />
                                    <View>
                                        <Text>$Nombre dueño</Text>
                                        <Text style={styles.textNombre}>{titulo}</Text>
                                    </View>
                                </View>
                                <Text numberOfLines={2} style={styles.textNormal}>{descripcion}</Text>
                                <Image
                                    source={imagen[0]}
                                    style={styles.Image}
                                    />
                            </View>
                    </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                    <TouchableOpacity style={styles.modificarBoton}>
                        <Text style={styles.modificarText}>Publicar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.volverBoton}>
                        <Text style={styles.volverText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        flex:1,
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
    containerPubli:{
      borderWidth:1,
      borderBottomColor:'grey',
    },
    textContainer:{
      textAlign:'left',
      marginLeft:30,
      marginRight:30,
      marginTop:10,
      marginBottom:10,
    },
    textNombre:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    Image:{
        width:'auto',
        height:100,
        marginTop:10,
    },
    textNormal:{
        marginTop:5
    },
    modificarBoton: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        marginRight:5,
        borderRadius: 5,
        flex:1,
        marginTop: 20,
        marginBottom:20,
      },
    modificarText: {
        color: '#fff',
        fontSize: 18,
      },
    volverBoton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth:1,
        flex:1,
        marginLeft:5,
        borderColor:'#414BB2',
        borderRadius: 5,
        marginTop: 20,
        marginBottom:20,

      },
    volverText: {
        color: '#414BB2',
        fontSize: 18,
      },
});

export default PrevisualizarPublicacion;