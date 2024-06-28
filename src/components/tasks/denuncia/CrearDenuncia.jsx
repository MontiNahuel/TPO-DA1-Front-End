import React,{useState} from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import theme from "../../../themeTextLight";

const CrearDenuncia = ({ navigation, route }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textDate, setTextDate] = useState('');
    const [textHour, setTextHour] = useState('');

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [motivo, setMotivo] = useState('');

    const { seleccion } = route.params;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setTextDate(fDate);
        setTextHour(fTime);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handlePress = () => {
        navigation.navigate('Second', { nombre, direccion, motivo });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color='grey' />
                </TouchableOpacity>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Iniciar Denuncia</Text>
                </View>
            </View>

            <View style={{ flex: 1, marginHorizontal: 20 }}>
                {seleccion ? <Text style={styles.textTitulo}>Denuncia a un comercio</Text> : <Text style={styles.textTitulo}>Denuncia a un vecino</Text>}
                <TextInput
                    style={styles.textIngreso}
                    value={nombre}
                    onChangeText={setNombre}
                />
                <Text style={styles.textTitulo}>Direccion del hecho</Text>
                <TextInput
                    style={styles.textIngreso}
                    value={direccion}
                    onChangeText={setDireccion}
                />
                <Text style={styles.textTitulo}>Motivo de la denuncia</Text>
                <TextInput
                    style={styles.textIngreso}
                    value={motivo}
                    onChangeText={setMotivo}
                    multiline={true}
                    numberOfLines={6}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.textTitulo}>Fecha</Text>
                        <TouchableOpacity style={styles.textIngreso} onPress={() => showMode('date')}>
                            <Text style={{ fontSize: 20, paddingRight: 80, paddingLeft: 5 }}>{textDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textTitulo}>Hora</Text>
                        <TouchableOpacity style={styles.textIngreso} onPress={() => showMode('time')}>
                            <Text style={{ fontSize: 20, paddingRight: 120, paddingLeft: 5 }}>{textHour}</Text>
                        </TouchableOpacity>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
            <View style={styles.containerBoton}>
                <TouchableOpacity style={styles.siguienteBoton}
                    onPress={() => navigation.navigate('Imagenes')}
                >
                    <Text style={styles.siguienteText}>Archivos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previBoton} onPress={() => navigation.navigate("PrevisualizarDenuncia", { nombre, direccion, motivo })}>
                    <Text style={styles.previText}>Previsualizar denuncia</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
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
    textTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 30,
    },
    textIngreso: {
        borderWidth: 1,
        borderColor: '#6c788e',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3,
    },
    containerBoton: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 220,
    },
    siguienteBoton: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.buttonColor,
        borderRadius: 5,
        marginTop: 50,
        marginBottom: 15,
        width: '95%',
    },
    siguienteText: {
        color: theme.colors.buttonColor,
        fontSize: 20,
    },
    previBoton: {
        backgroundColor: theme.colors.buttonColor,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        width: '95%',
        borderWidth: 2,
        borderColor: theme.colors.buttonColor,
    },
    previText: {
        color: 'white',
        fontSize: 20,
    },
});

export default CrearDenuncia;
