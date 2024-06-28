import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Accordion from "../Accordion";
import theme from "../../themeTextLight";
import styleAccordion from "../../styles/styleAccordion";

function RecuperarClave({navigation}) {
    const [tipoDocumento, setTipoDocumento] = useState(-1);
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Recuperar Inicio de Sesión</Text>
            <Text style={styles.text}>
                Ingresa tu documento correspondiente y correo electronico con el que te 
                registraste en la aplicacion. Si los datos son correctos, te enviademos 
                un código para cambiar la clave.
            </Text>
            <Accordion
                styleContainer={styleAccordion.containerAccordion}
                styleButtonPrincipal={styleAccordion.principalButtonAccordion}
                styleList={styleAccordion.listAccordion}
                styleItemList={styleAccordion.itemListAccordion}
                font={styleAccordion.styleText}
                title='Seleccionar'
                setDecision={setTipoDocumento}
                valores={[{text: "DNI"}, {text: "Pasaporte"}]}
            />
            
            <View style={styles.containerInputs}>
                <TextInput 
                placeholder= {tipoDocumento === -1 || tipoDocumento === 0 ? "DNI" : "Pasaporte"}
                placeholderTextColor={theme.colors.buttonColor}
                value={documento}
                onChangeText={setDocumento}
                style={styles.input}
                />
                
                <TextInput
                placeholder="Email"
                placeholderTextColor={theme.colors.buttonColor}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                />
            </View>

            <TouchableOpacity
            style={styles.buttonPrimary}
            >
                <Text
                style={styles.textForButtonPrimary}
                >
                    Enviar Código
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.goBack()}
            >
                <Text
                style={styles.textForButtonSecondary}
                >
                    Volver</Text>
            </TouchableOpacity>

        </View>
    );
}

export default RecuperarClave;

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
        marginTop: 150
    },
    text: {
        fontSize: theme.size.subHeader,
        marginBottom: 20,
        marginHorizontal: 20,
        //backgroundColor: 'cyan',
        textAlign: 'justify'
    },
    buttonPrimary: {
        borderRadius: 5,
        width: '95%',
        paddingVertical: 15,
        backgroundColor: theme.colors.buttonColor,
        marginTop: 10
    },
    textForButtonPrimary: {
        color: theme.colors.textColorForButtonPrimary,
        fontSize: theme.size.textForButton,
        textAlign: 'center',
    },
    buttonSecondary: {
        borderRadius: 5,
        width: '95%',
        paddingVertical: 15,
        backgroundColor: theme.colors.buttonColorSecondary,
        marginTop: 10,
        borderWidth: 2,
        borderColor: theme.colors.buttonColor
    },
    textForButtonSecondary: {
        color: theme.colors.textColorForButtonSecondary,
        fontSize: theme.size.textForButton,
        textAlign: 'center',
    },
    input: {
        width: '95%',
        borderWidth: 2,
        borderColor: theme.colors.buttonColor,
        marginTop: 20,
        padding: 10,
    },
    containerInputs: {
        flex: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25
    }
})