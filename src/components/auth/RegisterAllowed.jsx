import React, {useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import theme from "../../themeTextLight";
import { inscribirResidente } from "../../backend/authRegister";

function RegisterAllowed({navigation, route}) {
    const {dni} = route.params;
    const [email, setEmail] = useState("");

    const finalizarRegistro = () => {
        //alert('Registro Finalizado');
        inscribirResidente({dni: dni, email: email})
        .then(response => {
            alert(response);
            navigation.navigate('Home');
        }).catch(error => {
            alert(error.message);
        });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Registro</Text>
            <Text style={styles.text}>Excelente, figuras como residente</Text>
            <TextInput 
            placeholder="Email" 
            placeholderTextColor={theme.colors.buttonColor} 
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            />
            <Text style={styles.text}>
                Una vez que el municipio revise la solicitud, se le enviará un
                mail informando la situación
            </Text>
            <Text style={styles.text}>
                En caso de ser exitosa, se le enviará una clave de acceso que 
                podrá modificar una vez dentro de la aplicación
            </Text>
            <TouchableOpacity
            onPress={finalizarRegistro}
            style={styles.button}
            >
                <Text style={styles.textForButton}>
                    Solicitar Clave
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default RegisterAllowed;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: theme.size.title,
        fontWeight: theme.fontWeights.bold,
        marginBottom: 30,
        marginTop: 200
    },
    text: {
        fontSize: theme.size.subHeader,
        marginBottom: 20,
        marginHorizontal: 20,
        //backgroundColor: 'cyan',
        textAlign: 'justify'
    },
    button: {
        borderRadius: 5,
        width: '95%',
        paddingVertical: 15,
        backgroundColor: theme.colors.buttonColor,
        marginTop: 50
    },
    textForButton: {
        color: theme.colors.textColorForButtonPrimary,
        fontSize: theme.size.textForButton,
        textAlign: 'center',
    },
    input: {
        width: '95%',
        borderWidth: 2,
        borderColor: theme.colors.buttonColor,
        marginBottom: 60,
        marginTop: 20,
        padding: 10,
    }
});
