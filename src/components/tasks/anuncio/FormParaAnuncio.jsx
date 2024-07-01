// FormParaAnuncio.js
import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import theme from '../../../themeTextLight';

function FormParaAnuncio({ navigation }) {

    const [titulo,setTitulo]=useState('');
    const [descripcion,setDescripcion]=useState('');

    const handlePress = () => {
        navigation.navigate('Second', { titulo,descripcion});
      };

  return (
      <View style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="grey" />
          </TouchableOpacity>
          <View style={s.subHeader}>
            <Text style={s.textForHeader}>Crear Publicacion</Text>
          </View>
        </View>
        <Text style={[s.text, { paddingHorizontal: 80, marginTop: 35, textAlign: 'center', marginBottom: 20 }]}>
          Acordate que tu publicacion debe ser respetuosa
        </Text>
        <TextInput style={s.input} placeholder="Titulo" value={titulo}
                    onChangeText={setTitulo} />
        <TextInput style={s.input} placeholder="Descripcion" height={100} multiline={true} value={descripcion}
                    onChangeText={setDescripcion}/>
        <TextInput style={s.input} placeholder="Direccion" />
        <TextInput style={s.input} placeholder="Telefono" />

        <TouchableOpacity style={s.buttonSecondary} onPress={() => navigation.navigate('Imagenes')}>
          <Text style={s.textForButtonSecondary}>Imagenes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.button} onPress={handlePress}>
          <Text style={s.textButton}>Visualizar Publicacion</Text>
        </TouchableOpacity>
      </View>
  );
}

export default FormParaAnuncio;

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent:'left',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  textForHeader: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  input: {
    width: '95%',
    borderRadius: 5,
    borderColor: '#0077B6',
    borderWidth: 2,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 8,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: theme.colors.buttonColor,
    marginTop: 15,
    width: '95%',
    borderWidth: 2,
    borderColor: theme.colors.buttonColor,
  },
  textButton: {
    fontSize: 20,
    color: theme.colors.textColorForButtonPrimary,
  },
  buttonSecondary: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: theme.colors.buttonColorSecondary,
    marginTop: 120,
    width: '95%',
    borderWidth: 2,
    borderColor: theme.colors.buttonColor,
  },
  textForButtonSecondary: {
    fontSize: 20,
    color: theme.colors.textColorForButtonSecondary,
  },
});