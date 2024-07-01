import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/ContextForApp';
import obtenerDenunciasEnviadas from '../../backend/obtenerDenunciasEnviadas';
import StyledSwitch from '../StyledSwitch';

const MisDenunciasScreen=({navigation})=>{
    const [denuncias, setDenuncias] = useState([]);
    const [denunciasRecibidas, setDenunciasRecibidas] = useState([]);
    const {state} = useContext(AuthContext);
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        // Obtener denuncias enviadas
        obtenerDenunciasEnviadas(state.userId, state.token)
        .then(denuncias => {setDenuncias(denuncias); console.log(denuncias);})
        .catch(error => console.log(error));

        // Obtener denuncias recibidas
    }
    ,[]);

    return(
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name="chevron-left" size={30} color='grey'/>
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Mis Denuncias</Text>
                </View>
            </View>

            <View style={styles.viewForSwitch}>
              <StyledSwitch
              texto1={'Enviadas'}
              texto2={'Recibidas'}
              pressFunction={setEstado}
              />
            </View>

            {estado ? (
              denuncias.length > 0 ? (
                <FlatList
              data={denuncias}
              ItemSeparatorComponent={() => <Text> </Text>}
              renderItem={({ item: repo }) => (
                  <View style={styles.container} key={repo.id}>
                  <TouchableOpacity onPress={() => navigation.navigate('ProfileDenunciasDetalle', {denuncia: repo})}>
                      <View style={styles.textContainer}>
                      <Text style={styles.textId}>ID: {repo.iddenuncias}</Text>
                      <Text style={styles.textNombre}>Motivo: {repo.descripcion}</Text>
                      <Text>Fecha y hora: {repo.fecha} {repo.hora}</Text>
                      <Text style={styles.textId}>Estado: {!repo.estado ? <Text>Enviado</Text> : repo.estado}</Text>
                      </View>
                  </TouchableOpacity>
                  </View>
              )} />
              ) : (
                <View style={styles.containerForNothing}>
                  <MaterialCommunityIcons name='alert' color={'black'} size={45}/>
                  <Text style={styles.textForNothing} >No hay denuncias enviadas</Text>
                </View>
              )
            ) : (
              denunciasRecibidas.length > 0 ? (
                <FlatList
              data={denuncias}
              ItemSeparatorComponent={() => <Text> </Text>}
              renderItem={({ item: repo }) => (
                <View style={styles.container} key={repo.id}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileDenunciasDetalle', {denuncia: repo})}>
                    <View style={styles.textContainer}>
                    <Text style={styles.textId}>ID: {repo.id}</Text>
                    <Text style={styles.textNombre}>Nombre: {repo.nombre}</Text>
                    <Text>Fecha y hora: {repo.fecha} {repo.hora}</Text>
                    <Text style={styles.textId}>Estado: {repo.estado}</Text>
                    </View>
                </TouchableOpacity>
                </View>
            )} />
              ) : (
                <View style={styles.containerForNothing}>
                  <MaterialCommunityIcons name='alert' color={'black'} size={45}/>
                  <Text style={styles.textForNothing} >No hay denuncias recibidas</Text>
                </View>
              )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    toogleContainer:{
      flex:0,
      marginTop:20,
      marginBottom:20,
      alignItems:'center'
    },
    container:{
      flex:1,
      borderWidth:1,
      borderColor:'black',
      marginLeft:20,
      marginRight:20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'left',
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
    textContainer:{
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
    viewForSwitch: {
      marginTop: 60,
    },
    textForNothing: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
    },
    containerForNothing: {
      marginTop: 50,
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export {MisDenunciasScreen};