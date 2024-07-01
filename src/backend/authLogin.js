import React from "react";
import * as SecureStore from 'expo-secure-store';

function authLogin(credencial, password) {
    
    return new Promise ((resolve, reject) => {
    fetch('http://192.168.0.110:8080/auth/login/vecino', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: credencial,
            password: password
        })
    }).then(response => {
        if (response.ok) {
            console.log("Inicio de sesion exitoso");
            response.text().then(token => {
                //console.log("Token: ", token);
                resolve({message: "Exito", token: token});
            }).catch(error => {
                //console.log("Error al obtener token: ", error);
                reject({message: "Error al obtener token"});
            });
        } else {
            reject({message: "Error al iniciar sesion", response: response.status});
        }
    }).catch(error => {
        console.log("Error al iniciar sesion: ", error);
    });
    });
}


function authLoginInspector(credencial, password) {
    return new Promise ((resolve, reject) => {
        fetch('http://192.168.0.110:8080/auth/login/personal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            legajo: credencial,
            password: password
        })
        }).then(response => {
            if (response.ok) {
                console.log("Inicio de sesion exitoso");
                response.text().then(token => {
                    resolve({message: "Exito", token: token});
                }).catch(error => {
                //console.log("Error al obtener token: ", error);
                reject({message: "Error al obtener token"});
                });
            } else {
                reject({message: "Error al iniciar sesion", response: response.status});
            }
        }).catch(error => {
            console.log("Error al iniciar sesion: ", error);
        });
    });
}

async function saveToken(token) {
    console.log(token)
    tokenString = JSON.stringify(token);
    console.log(tokenString);
    await SecureStore.setItemAsync('userToken', tokenString);
}

async function getToken() {
    const tokenString = await SecureStore.getItemAsync('userToken');
    if (tokenString) {	
        return JSON.parse(tokenString);
    } else {
        return null;
    }
}

async function deleteToken() {
    await SecureStore.deleteItemAsync('userToken');
}

async function saveUserId(userId) {
    await SecureStore.setItemAsync('userId', userId);
}

async function getUserId() {
    return await SecureStore.getItemAsync('userId');
}

async function deleteUserId() {
    await SecureStore.deleteItemAsync('userId');
}

async function saveIsVecino(isVecino) {
    const isVecinoString = String(isVecino);
    await SecureStore.setItemAsync('isVecino', isVecinoString);
}

async function getIsVecino() {
    const isVecinoString = await SecureStore.getItemAsync('isVecino');
    return Boolean(isVecinoString);
}

async function deleteIsVecino() {
    await SecureStore.deleteItemAsync('isVecino');
}



export {authLogin, authLoginInspector, saveToken, getToken, deleteToken, saveUserId, getUserId, deleteUserId, saveIsVecino, getIsVecino, deleteIsVecino};