import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect, useContext } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/ContextForApp';
import { obtenerAnunciosPorId } from '../../backend/anuncio';
import obtenerDatosDelPerfil from '../../backend/ProfileData';

const MisAnunciosScreen = ({ navigation }) => {
  const [anuncio, setAnuncio] = useState([]);
  const { state } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  const handleAnuncios = () => {
    obtenerAnunciosPorId(state.userId, state.token)
      .then(data => {
        setAnuncio(data);
        console.log("Anuncios recuperados");
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleUserData = () => {
    obtenerDatosDelPerfil(state.userId, state.token)
      .then(data => {
        setUserData(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleAnuncios();
    handleUserData();
  }, []);

  const renderImages = (images) => {
    if (images.length === 1) {
      return (
        <Image
          source={{ uri: `data:image/png;base64,${images[0]}` }}
          style={styles.singleImage}
        />
      );
    } else if (images.length === 2) {
      return (
        <View style={styles.row}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: `data:image/png;base64,${image}` }}
              style={styles.halfImage}
            />
          ))}
        </View>
      );
    } else if (images.length === 3) {
      return (
        <View>
          <View style={styles.row}>
            {images.slice(0, 2).map((image, index) => (
              <Image
                key={index}
                source={{ uri: `data:image/png;base64,${image}` }}
                style={styles.halfImage}
              />
            ))}
          </View>
          <Image
            source={{ uri: `data:image/png;base64,${images[2]}` }}
            style={styles.singleImage}
          />
        </View>
      );
    } else if (images.length >= 4) {
      return (
        <View>
          <View style={styles.row}>
            {images.slice(0, 2).map((image, index) => (
              <Image
                key={index}
                source={{ uri: `data:image/png;base64,${image}` }}
                style={styles.halfImage}
              />
            ))}
          </View>
          <View style={styles.row}>
            {images.slice(2, 4).map((image, index) => (
              <Image
                key={index}
                source={{ uri: `data:image/png;base64,${image}` }}
                style={styles.halfImage}
              />
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.containerScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={30} color='grey' />
        </TouchableOpacity>
        <View style={styles.subHeader}>
          <Text style={styles.textForHeader}>Mis Anuncios</Text>
        </View>
      </View>
      <FlatList
          data={anuncio}
          keyExtractor={(item) => item.idanuncio.toString()}
          renderItem={({ item: repo }) => (
            <View>
              <TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text>{repo.idanuncio}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: `data:image/png;base64,${userData.imagen}` }}
                      style={styles.profileImage}
                    />
                    <View>
                      <Text>{userData.nombre} {userData.apellido}</Text>
                      <Text style={styles.textNombre}>{repo.titulo}</Text>
                    </View>
                  </View>
                  <Text numberOfLines={2} style={styles.textNormal}>{repo.descripcion}</Text>
                  <View style={styles.imagesContainer}>
                    {renderImages(repo.imagen)}
                  </View>
                  {repo.estado === 0 ? <Text style={styles.textEstadoInvestigacion}>En revisión</Text> : <Text style={styles.textEstadoReparado}>Aprobado</Text>}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  containerScreen: {
    marginBottom: 85
  },
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  header: {
    flexDirection: 'row',
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
  textContainer: {
    textAlign: 'left',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  textNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singleImage: {
    width: '100%',
    height: 120,
    marginVertical: 5,
  },
  halfImage: {
    width: '48%',
    height: 120,
    marginVertical: 5,
  },
  textNormal: {
    marginTop: 5
  },
  textEstadoPospuesto: {
    color: 'red',
    marginTop: 5,
    marginBottom: 5,
  },
  textEstadoReparado: {
    color: 'green',
    marginTop: 5,
    marginBottom: 5,
  },
  textEstadoInvestigacion: {
    color: '#EEBB04',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default MisAnunciosScreen;
