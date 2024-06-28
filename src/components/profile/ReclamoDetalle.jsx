import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import reclamos from './reclamos';

const ReclamoDetalleScreen = ({ navigation, route }) => {
    const {reclamo} = route.params;

  const estadoConfig = {
    'Pendiente': { label: 'Reparado', color: '#FAC710' },
    'En proceso': { label: 'Pospuesto', color: '#FAC710' },
    'Resuelto': { label: 'En InvestigaciÃ³n', color: '#FAC710' }
  };

  const estadoActual = estadoConfig[reclamo.estado];

  return (
    <View style={styles.container}>
        <View style={styles.containerText}>
      <Text style={styles.title}>{reclamo.titulo}</Text>
      <Text style={styles.id}>ID: {reclamo.id}</Text>
      
      <Text style={styles.statusTitle}>Estado:</Text>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, { backgroundColor: estadoActual.color }]} />
        <Text style={styles.statusLabel}>Enviado</Text>
      </View>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, reclamo.estado=='En investigacion' ? { backgroundColor: estadoActual.color }: reclamo.estado=='Reparado'? { backgroundColor: estadoActual.color }: reclamo.estado=='Pospuesto' ? { backgroundColor: estadoActual.color }:{backgroundColor: '#B5B3B3'} ]} />
        <Text style={styles.statusLabel}>Derivado a un inspector</Text>
      </View>
      <View style={styles.statusItem}>
        <View style={[styles.statusIndicator, reclamo.estado=='Reparado'? { backgroundColor: estadoActual.color }: reclamo.estado=='Pospuesto' ? { backgroundColor: estadoActual.color }: {backgroundColor: '#B5B3B3'}]} />
        <Text style={styles.statusLabel}>Reparado/Pospuesto</Text>
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

export default ReclamoDetalleScreen;