import React from "react";

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
            console.log("Error al iniciar sesion", response.status);
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
                console.log("Error al iniciar sesion", response.status);
            }
        }).catch(error => {
            console.log("Error al iniciar sesion: ", error);
        });
    });
}

export {authLogin, authLoginInspector};