import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Llogin from './src/components/auth/Llogin';
import Register from './src/components/auth/Register';
import Home from './src/components/home/Home';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RegisterNotAllowed from './src/components/auth/RegisterNotAllowed';
import RegisterAllowed from './src/components/auth/RegisterAllowed';
import RecuperarClave from './src/components/auth/RecuperarClave';
import { ContextForApp, AuthContext } from './src/components/context/ContextForApp';
import Cosas from './src/components/tasks/Cosas';
import Profile from './src/components/profile/Profile';
import ProfileData from './src/components/profile/ProfileData';
import {MisDenunciasScreen} from './src/components/profile/misDenuncias';
import { MisReclamosScreen } from './src/components/profile/MisReclamos';
import DenunciaDetalle from './src/components/profile/DenunciaDetalle';
import ReclamoDetalleScreen from './src/components/profile/ReclamoDetalle';
import FormParaAnuncio from './src/components/tasks/anuncio/FormParaAnuncio';
import SeleccionDeAnuncio from './src/components/tasks/anuncio/SeleccionDeAnuncio';
import Imagenes from './src/components/tasks/anuncio/Imagenes';
import { ImageProvider } from './src/components/tasks/anuncio/ImageProvider';
import IniciarDenuncia from './src/components/tasks/denuncia/IniciarDenuncia';
import CrearDenuncia from './src/components/tasks/denuncia/CrearDenuncia';
import ArchivosDenuncia from './src/components/tasks/denuncia/ArchivosDenuncia';
import PrevisualizarDenuncia from './src/components/tasks/denuncia/PrevisualizarDenuncia';
import IniciarReclamo from './src/components/tasks/reclamo/CrearReclamo';
import ReclamoRealizado from './src/components/tasks/reclamo/ReclamoRealizado';
import ReclamoSinWifi from './src/components/tasks/reclamo/ReclamoSinWifi';
import PrevisualizarPublicacion from './src/components/tasks/anuncio/PrevisualizarPublicacion';
import EnRevision from './src/components/tasks/anuncio/EnRevision';
import MisAnunciosScreen from './src/components/profile/MisAnuncios';
import { setTokenEnDb } from './src/backend/notificaciones';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

function TabNavigator() {

  const {state} = React.useContext(AuthContext); 
  useEffect(() => {
    registerForPushNotificationsAsync(state);
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0077B6',
        tabBarInactiveTintColor: '#79797A',
        tabBarStyle: {
          backgroundColor: '#f8f8f8', // Color de fondo de la barra de pestañas
          borderTopWidth: 1, // Grosor de la línea superior
          borderTopColor: '#0077B6', // Color de la línea superior
          height: 60, // Altura de la barra de pestañas
          paddingHorizontal: state.isAuthenticated ? 20 : 50, // Espaciado derecho
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }}
    >

      {state.isAuthenticated ? <Tab.Screen 
      name='Menu' 
      component={Cosas} 
      options={{ 
        headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name='clipboard' color={color} size={35}/>
        )
      }}/> : null}

      <Tab.Screen 
      name='Home' 
      component={Home}
      options={{ 
        headerShown: false, 
        tabBarLabel: 'Inicio',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name='home' color={color} size={35}/>
        )
      }}/>

      {state.isAuthenticated ? 
      
      
      <Tab.Screen 
      name='Perfil' 
      component={Profile} 
      options={{ 
        headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name='account-circle' color={color} size={35}/>
        )
      }}/> 

      : 

      <Tab.Screen 
      name='Perfil' 
      component={Llogin} 
      options={{ 
        headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name='account-circle' color={color} size={35}/>
        )
      }}/> 
       
    }
      
    </Tab.Navigator>
  );

}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async (state) => {

  let tokenNotif;
  if (!Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const projectId = '91d47752-c271-4391-966b-9a69d7826e85';
    tokenNotif = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log(tokenNotif);
    setTokenEnDb(state.userId, tokenNotif, state.token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
};

export default function App() {
  
  return (
    <ContextForApp>
      <ImageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Tabs'>

            <Stack.Screen
            name='Tabs'
            component={TabNavigator}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='Register' 
            component={Register}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='RegNotAllowed' 
            component={RegisterNotAllowed}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='RegAllowed' 
            component={RegisterAllowed}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='RecuperarClave' 
            component={RecuperarClave}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ProfileData' 
            component={ProfileData}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ProfileDenuncias' 
            component={MisDenunciasScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ProfileReclamos' 
            component={MisReclamosScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ProfileDenunciasDetalle' 
            component={DenunciaDetalle}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ProfileReclamoDetalle' 
            component={ReclamoDetalleScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='SeleccionDeAnuncio' 
            component={SeleccionDeAnuncio}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='FormParaAnuncio' 
            component={FormParaAnuncio}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='Imagenes' 
            component={Imagenes}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='IniciarDenuncia' 
            component={IniciarDenuncia}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='CrearDenuncia' 
            component={CrearDenuncia}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ArchivosDenuncia' 
            component={ArchivosDenuncia}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='PrevisualizarDenuncia' 
            component={PrevisualizarDenuncia}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='CrearReclamo' 
            component={IniciarReclamo}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ReclamoRealizado' 
            component={ReclamoRealizado}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='ReclamoSinWifi' 
            component={ReclamoSinWifi}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='Second' 
            component={PrevisualizarPublicacion}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='En Revision' 
            component={EnRevision}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name='MisAnuncios' 
            component={MisAnunciosScreen}
            options={{ headerShown: false }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      </ImageProvider>
    </ContextForApp>
  );
}

