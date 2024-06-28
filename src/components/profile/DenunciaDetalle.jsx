import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import denuncias from './denuncias';

const DenunciaDetalle = ({ navigation, route}) => {
    const {denuncia} = route.params;

  const estadoConfig = {
    'Enviado': { label: 'Reparado', color: '#FAC710' },
    'En revision': { label: 'Pospuesto', color: '#FAC710' },
    'Final': { label: 'En InvestigaciÃ³n', color: '#FAC710' }
  };

  const estadoActual = estadoConfig[denuncia.estado];

  return (
    <View style={styles.container}>
        <View style={styles.containerText}>
      <Text style={styles.title}>{denuncia.nombre}</Text>
      <Text style={styles.id}>ID: {denuncia.id}</Text>
      
      <Text style={styles.statusTitle}>Estado:</Text>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, { backgroundColor: estadoActual.color }]} />
        <Text style={styles.statusLabel}>Enviado</Text>
      </View>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, denuncia.estado=='En revision' ? { backgroundColor: estadoActual.color }: denuncia.estado=='Final'? { backgroundColor: estadoActual.color }:{backgroundColor: '#B5B3B3'} ]} />
        <Text style={styles.statusLabel}>En revision</Text>
      </View>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, denuncia.estado=='Final'? { backgroundColor: estadoActual.color }:{backgroundColor: '#B5B3B3'}]} />
        <Text style={styles.statusLabel}>Final</Text>
      </View>
        </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerText:{
    margin:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  id: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 14,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#414BB2',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#414BB2',
  },
});

export default DenunciaDetalle;