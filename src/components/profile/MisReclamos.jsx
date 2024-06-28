import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import reclamos from './reclamos.js';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import obtenerReclamos from "../../backend/obtenerReclamos.js";
import { AuthContext } from '../context/ContextForApp';

const MisReclamosScreen=({navigation})=>{

    const {state} = React.useContext(AuthContext);
    const [reclamos, setReclamos] = React.useState([]);

    useEffect(() => {
        obtenerReclamos(state.userId, state.token).then(data => {
            setReclamos(data);
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);


    return(
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name="chevron-left" size={30} color='grey'/>
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Mis Reclamos</Text>
                </View>
                
            </View>
            {reclamos.length > 0 ? (
                <FlatList
                data={reclamos}
                renderItem={({ item: repo }) => (
                    <View style={styles.container} key={repo.idReclamo}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileReclamoDetalle', {reclamo: repo})}>
                            <View style={styles.textContainer}>
                            <Text style={styles.textId}>ID: {repo.idReclamo}</Text>
                            <Text style={styles.textNombre}>{repo.titulo}</Text>
                            {repo.idDesperfecto && <Text style={styles.textNormal}>Desperfecto: {repo.desperfecto}</Text>}
                            <Text style={styles.textNormal}>{repo.descripcion}</Text>
                            <Text style={repo.estado=='Reparado' ? styles.textEstadoReparado : repo.estado=='Pospuesto' ? styles.textEstadoPospuesto : styles.textEstadoInvestigacion}>Estado: {repo.estado}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />
            ) : (
                <View style={styles.containerForNothing}>
                  <MaterialCommunityIcons name='alert' color={'black'} size={45}/>
                  <Text style={styles.textForNothing} >No hay reclamos realizados</Text>
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:0,
      borderBottomWidth:1,
      borderBottomColor:'grey',
      paddingBottom: 10,
      marginBottom: 10,
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
        borderBottomWidth: 1
    },
    textForHeader: {
        fontSize: 20,
    },
    textContainer:{
      textAlign:'left',
      marginLeft:30,
      marginRight:30,
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
    textEstadoPospuesto:{
        color:'red',
        marginTop:5,
        marginBottom:5,

    },
    textEstadoReparado:{
        color:'green',
        marginTop:5,
        marginBottom:5,

    },
    textEstadoInvestigacion:{
        color:'black',
        marginTop:5,
        marginTop:5,
        marginBottom:5,

    },
    containerForNothing: {
        marginTop: 50,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textForNothing: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
  });
  
export {MisReclamosScreen};