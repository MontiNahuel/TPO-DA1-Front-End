import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import denuncias from "./denuncias";


const ImageGrid = ({ urls }) => {
    const renderItem = ({ item }) => (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  
    return (
      <FlatList
        data={urls.slice(0, 9)} // Mostrar solo las primeras 6 imágenes
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Mostrar en 3 columnas
      />
    );
  };

const ArchivosDenuncia=()=>{
   // const denuncia = denuncias[1];
    return(
        <View style={styles.container}>
        {/*<ImageGrid urls={denuncia.imagenes} />*/}
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.adjuntarBoton}>
                <Text style={styles.adjuntarText}>Adjuntar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eliminarBoton}>
                <Text style={styles.adjuntarText}>Eliminar</Text>
            </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center',marginTop:15,marginBottom:15}}>Puede adjuntar fotos, videos o facturas como pruebas</Text>
            <TouchableOpacity style={styles.volverBoton}>
                <Text style={styles.volverText}>Volver</Text>
            </TouchableOpacity>
      </View>
    )

}

const styles = StyleSheet.create({
    containerRow:{
        flexDirection:'row',
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    imageContainer: {
      margin: 4,
      // Para mantener las imágenes cuadradas
      height: Dimensions.get('window').width / 3 - 8, 
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    adjuntarBoton: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        alignItems: 'center',
        marginRight:5,
        borderRadius: 5,
        flex:1,
        marginTop: 20,
        marginBottom:20,
      },
     eliminarBoton: {
        backgroundColor: '#F90707',
        paddingVertical: 15,
        alignItems: 'center',
        marginRight:5,
        borderRadius: 5,
        flex:1,
        marginTop: 20,
        marginBottom:20,
      },
    adjuntarText: {
        color: '#fff',
        fontSize: 18,
      },
    volverBoton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth:1,
        marginLeft:5,
        borderColor:'#414BB2',
        borderRadius: 5,
        marginTop: 10,
        marginBottom:20,

      },
    volverText: {
        color: '#414BB2',
        fontSize: 18,
      },
  });

export default ArchivosDenuncia;