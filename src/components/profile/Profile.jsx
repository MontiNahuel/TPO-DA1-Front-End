import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import obtenerDatosDelPerfil from '../../backend/ProfileData';
import personalData from '../../backend/personalData';
import { AuthContext } from '../context/ContextForApp';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import eliminarEspacios from '../../extra/eliminarEspacios';
import theme from '../../themeTextLight';
import { deleteIsVecino, deleteToken, deleteUserId } from '../../backend/authLogin';

const Profile = ({navigation}) => {

    const {state, dispatch} = React.useContext(AuthContext);
    const [profileData, setProfileData] = React.useState({});

    const datosDelPerfil = () => {
        // Aquí deberías hacer una petición a la API para obtener los datos del perfil del usuario
        // y luego mostrarlos en la pantalla
        obtenerDatosDelPerfil(state.userId, state.token).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (state.isVecino) {
          obtenerDatosDelPerfil(state.userId, state.token).then(data => {
            setProfileData(data);
          }).catch(error => {
              console.log(error);
          });
        } else {
          personalData(state.userId, state.token).then(data => {
            data.nombre = eliminarEspacios(data.nombre);
            setProfileData(data);
          }).catch(error => {
              console.log(error);
          });
        }
    }, []);

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subHeader}>
                    <Text style={styles.textForHeader}>Perfil</Text>
                </View>
                <TouchableOpacity

                >
                    <MaterialCommunityIcons name="bell" size={30} color='grey'/>
                </TouchableOpacity>
            </View>
      
      {state.isVecino ? (
        <View style={styles.containerTernario}>
          <View style={styles.profileContainer}>
            <View style= {styles.imageContainer}>
              <Image
                source={{uri: `data:image/png;base64,${profileData.imagen}`}}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.name}>{profileData.nombre + " " + profileData.apellido}</Text>
            <Text style={styles.email}>{profileData.email}</Text>
          </View>
        
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('ProfileData', {email: profileData.email})}}>
                <View style={styles.submenuItem}>
                    <MaterialCommunityIcons name="card-account-details" size={30} color={theme.colors.buttonColor}/>
                    <Text style={styles.menuText}>Mis Datos</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('ProfileReclamos')}}>
                <View style={styles.submenuItem}>
                    <MaterialCommunityIcons name="phone" size={30} color={theme.colors.buttonColor}/>
                    <Text style={styles.menuText}>Reclamos</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <View style={styles.submenuItem}>
                    <MaterialCommunityIcons name="chat" size={30} color={theme.colors.buttonColor}/>
                    <Text style={styles.menuText}>Anuncios</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('ProfileDenuncias')}}>
                <View style={styles.submenuItem}>
                    <MaterialCommunityIcons name="file" size={30} color={theme.colors.buttonColor}/>
                    <Text style={styles.menuText}>Denuncias</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style= {[styles.containerTernario, {marginTop: 80}]}>
          <View style={styles.profileContainer}>
            <Text style={styles.name}>{profileData.nombre + " " + profileData.apellido}</Text>
            <Text style={styles.email}>{profileData.legajo}</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('ProfileData', {profileData})}}>
                <View style={styles.submenuItem}>
                  <MaterialCommunityIcons name="card-account-details" size={30} color='grey'/>
                  <Text style={styles.menuText}>Mis Datos</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('ProfileReclamos')}}>
                <View style={styles.submenuItem}>
                  <MaterialCommunityIcons name="phone" size={30} color='grey'/>
                  <Text style={styles.menuText}>Reclamos</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={30} color='grey'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={() => {dispatch({type: 'LOGOUT'}); deleteIsVecino(); deleteToken(); deleteUserId();}}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  containerTernario: {
    flex: 0,
    //backgroundColor: '#f4f4f4',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
    },
    textForHeader: {
        fontSize: 20,
    },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 20,
  },
  imageContainer: {
    padding: 5, // Ajusta el espacio entre la imagen y el borde
    borderRadius: 100, // Ajusta para que coincida con el tamaño y el padding
    borderWidth: 2, // Ajusta el grosor del borde según sea necesario
    borderColor: theme.colors.buttonColor, // Cambia 'blue' por el color que desees
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: theme.colors.textColorForButtonSecondary
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  menuContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textColorForButtonSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  menuText: {
    fontSize: 18,
    marginLeft: 20,
  },
  logoutButton: {
    backgroundColor: '#BD0303',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 60,
    width: '95%',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;