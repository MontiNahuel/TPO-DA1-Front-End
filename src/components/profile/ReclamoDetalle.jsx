import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { obtenerMovimientosReclamo, obtenerImagenesDeUnReclamo } from '../../backend/reclamos';
import { AuthContext } from '../context/ContextForApp';
import reclamos from './reclamos';

const ReclamoDetalleScreen = ({ navigation, route }) => {
    const {reclamo} = route.params;
    const [movlmientosReclamo, setMovimientosReclamo] = useState([]);
    const [imagenesReclamo, setImagenesReclamo] = useState([]); // [base64, base64, base64
    const {state} = useContext(AuthContext);

    const hamdleMovimientosReclamo = async () => {
        obtenerMovimientosReclamo(reclamo.idreclamo, state.token)
            .then(data => {
                console.log("Movimientos de reclamo: ", data);
                setMovimientosReclamo(data);
            })
            .catch(error => {
                console.log("Error al obtener movimientos de reclamo: ", error);
            });
    }

    const handleImagenesReclamo = async () => {
        obtenerImagenesDeUnReclamo(reclamo.idreclamo, state.token)
            .then(data => {
                setImagenesReclamo(data);
                console.log("Imagenes de reclamo: ", data);
            })
            .catch(error => {
                console.log("Error al obtener imagenes de reclamo: ", error);
            });
    }


    useEffect(() => {
        hamdleMovimientosReclamo();
        handleImagenesReclamo();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.id}>ID: {reclamo.idreclamo}</Text>
        <Text style={styles.title}>{reclamo.descripcion}</Text>
    
        <Text style={styles.statusTitle}>Estado: {reclamo.desperfecto.descripcion}</Text>
        <Text style={styles.statusTitle}>Direccion: {reclamo.sitio.calle} {reclamo.sitio.numero}</Text>
        <View style={styles.statusItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#FAC710' }]} />
          <Text>Enviado</Text>
        </View>
        <View>
          {setMovimientosReclamo.length > 0 && movlmientosReclamo.map(movimiento => (
            <View style={styles.statusItem} key={movimiento.idMovimiento}>
              <View style={[styles.statusIndicator, { backgroundColor: '#FAC710' }]} />
              <Text style={styles.statusLabel}>{movimiento.causa} | {movimiento.responsable}</Text>
            </View>
          ))}
        </View>
        <View>
          {imagenesReclamo.length > 0 && imagenesReclamo.map((imagen, index) => (
            <Image
              key={index}
              source={{uri: `data:image/png;base64,${imagen.imagen}`}}
              style={{ width: 150, height: 150, marginBottom: 10 }}
            />
          ))}
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