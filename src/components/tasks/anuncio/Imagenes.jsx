import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import theme from '../../../themeTextLight';
import { ImageContext } from './ImageProvider';

function Imagenes({ navigation }) {
  const { images, setImages } = useContext(ImageContext);
  const [expandedImage, setExpandedImage] = React.useState(null);

  const handleImagePicker = async (from) => {
    let result;
    if (from === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      setImages([...images, { uri: result.assets[0].uri, base64: base64Image }]);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64 portion after the comma
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const toggleExpandedImage = (imageUri) => {
    setExpandedImage(imageUri === expandedImage ? null : imageUri); // Alternar la imagen expandida
  };

  return (
    <View>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="grey" />
        </TouchableOpacity>
        <View style={s.subHeader}>
          <Text style={s.textForHeader}>Imagenes</Text>
        </View>
      </View>

      <View style={{ height: 280, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 27 }}>
        {images.length > 0 &&
          images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => toggleExpandedImage(image.uri)}>
              <Image source={{ uri: image.uri }} style={{ width: 120, height: 120, margin: 5 }} />
            </TouchableOpacity>
          ))}
      </View>

      <Modal visible={expandedImage !== null} transparent={true}>
        <View style={s.modalContainer}>
          <TouchableOpacity style={s.closeButton} onPress={() => setExpandedImage(null)}>
            <MaterialCommunityIcons name="close-circle" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: expandedImage }} style={s.expandedImage} resizeMode="contain" />
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handleImagePicker('gallery')} style={images.length < 6 ? s.button : [s.button, { backgroundColor: '#5C879D' }]} disabled={images.length === 6}>
          <Text style={s.textButton}>Adjuntar Imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePicker('camera')} style={images.length < 6 ? s.button : [s.button, { backgroundColor: '#5C879D' }]} disabled={images.length === 6}>
          <Text style={s.textButton}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={s.buttonSecondary} onPress={() => navigation.goBack()}>
          <Text style={s.textForButtonSecondary}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Imagenes;

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'left',
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
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: theme.colors.buttonColor,
    marginTop: 15,
    width: '45%',
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
    marginTop: 15,
    width: '95%',
    borderWidth: 2,
    borderColor: theme.colors.buttonColor,
  },
  textForButtonSecondary: {
    fontSize: 20,
    color: theme.colors.textColorForButtonSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  expandedImage: {
    width: '90%',
    height: '90%',
  },
});