import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


function StyledSwitch({texto1, texto2, pressFunction, changeMessage}) {

    const [estadoSwitch, setEstadoSwitch] = useState(true);

    return (
        <View style= {styles.container}>
            <View style= {styles.innerContainer}>
                <TouchableOpacity 
                style= {[styles.button, estadoSwitch ? styles.buttonActive : null]}
                onPress={() => {setEstadoSwitch(true); pressFunction(true); changeMessage && changeMessage(false);}}
                >
                    <Text style={[styles.textButton, estadoSwitch ? styles.textActive : null]}>{texto1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.button, !estadoSwitch ? styles.buttonActive : null]}
                onPress={() => {setEstadoSwitch(false); pressFunction(false); changeMessage && changeMessage(false);}}
                >
                    <Text style={[styles.textButton, !estadoSwitch ? styles.textActive : null]}>{texto2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        
    },
    innerContainer: {
        backgroundColor: '#0077B6',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0077B6'
    },
    button: {
        minWidth: 100,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    textButton: {
        textAlign: 'center',
        paddingVertical: 3
    },
    buttonActive: {
        backgroundColor: '#0077B6',
    },
    textActive: {
        color: 'white'
    }
});

export default StyledSwitch;