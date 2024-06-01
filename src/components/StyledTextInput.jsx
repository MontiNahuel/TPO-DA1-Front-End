import react from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
    textInput : {
        borderRadius: 5,
        borderColor: '#0077B6',
        borderWidth: 2,
        marginBottom: 10,
        marginHorizontal : 10,
        padding: 8
    }
})

function StyledTextInput( {style, ... props } ) {
    const inputStyle = {
        ... style,
        ... styles.textInput
    }

    return (
        <TextInput style = {inputStyle} {... props}/>
    );
};

export default StyledTextInput;