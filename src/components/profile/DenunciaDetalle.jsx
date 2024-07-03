import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../context/ContextForApp';
import { obtenerMovimientosDeUnaDenuncia } from '../../backend/denuncia';

const DenunciaDetalle = ({ navigation, route }) => {
    const { denuncia } = route.params;
    const { state } = useContext(AuthContext);
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        // Obtener movimientos de la denuncia
        console.log(denuncia);
        obtenerMovimientosDeUnaDenuncia(denuncia.iddenuncias, state.token)
        .then(movimientos => { setMovimientos(movimientos); console.log(movimientos); })
        .catch(error => console.log(error));
    }, []);

    const convertBinaryToBase64 = (binary) => {
        const binaryStr = new Uint8Array(binary).reduce((data, byte) => data + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binaryStr)}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.id}>ID: {denuncia.iddenuncias}</Text>
                <Text style={styles.title}>Motivo: {denuncia.descripcion}</Text>
                <Text style={styles.statusTitle}>Estado: {denuncia.estado ? denuncia.estado : <Text>Enviado</Text>}</Text>
                <View style={styles.statusItem}>
                    <View
                        style={[
                            styles.statusIndicator,
                            { backgroundColor: '#FAC710' },
                        ]}
                    />
                    <Text style={styles.statusLabel}>Enviado</Text>
                </View>
                {movimientos.length > 0 && movimientos.map((movimiento, index) => (
                    <View key={index} style={styles.statusItem}>
                        <View
                            style={[
                                styles.statusIndicator,
                                { backgroundColor: '#FAC710' },
                            ]}
                        />
                        <Text style={styles.statusLabel}>{movimiento.causa}</Text>
                    </View>
                ))}
                {denuncia.imagen && denuncia.imagen.length > 0 && denuncia.imagen.map((imagen, index) => (
                    <Image
                        key={index}
                        source={{uri: `data:image/png;base64,${imagen}`}}
                        style={{ width: 150, height: 150, marginBottom: 10 }}
                    />
                ))}
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
    containerText: {
        margin: 20,
        marginTop: 100
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
