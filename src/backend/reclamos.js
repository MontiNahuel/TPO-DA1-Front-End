import AsyncStorage from '@react-native-async-storage/async-storage';

function obtenerSitiosSimilares(sitio, token) {
  return new Promise((resolve, reject) => {
    const url = `http://192.168.0.110:8080/reclamos/coincidencias/sitios?name=${sitio}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
        }).then(response => {
        if (response.ok) {
            response.json().then(data => {
            resolve(data);
            }).catch(error => {
            reject({ message: "Error al obtener datos", error });
            });
        }
        }).catch(error => {
        console.log("Error al obtener datos de sitios similares: ", error);
        });
    });
}

function obtenerDesperfectos(token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/reclamos/desperfectos`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
            }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                resolve(data);
                }).catch(error => {
                reject({ message: "Error al obtener datos", error });
                });
            }
            }).catch(error => {
            console.log("Error al obtener datos de desperfectos: ", error);
            });
        }
    );
}

function guardarReclamo(reclamo, token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/reclamos/crear`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(reclamo)
            }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                resolve(data);
                }).catch(error => {
                reject({ message: "Error al enviar datos", error });
                });
            }
            }).catch(error => {
            console.log("Error al enviar datos de reclamo: ", error);
            });
        }
    );
}

function obtenerMovimientosReclamo(idReclamo, token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/reclamos/movimientos?idreclamo=${idReclamo}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
            }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                resolve(data);
                }).catch(error => {
                reject({ message: "Error al obtener datos", error });
                });
            }
            }).catch(error => {
            console.log("Error al obtener datos de movimientos de reclamo: ", error);
            }
        );
    });
}

function obtenerImagenesDeUnReclamo(idreclamo, token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/reclamos/imagenesDeUnReclamo?idreclamo=${idreclamo}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
            }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                resolve(data);
                }).catch(error => {
                reject({ message: "Error al obtener datos", error });
                });
            }
            }).catch(error => {
            console.log("Error al obtener datos de imagenes de reclamo: ", error);
            }
        );
    });
}

const enviarReclamosGuardados = async () => {
    try {
        const reclamosGuardados = JSON.parse(await AsyncStorage.getItem('reclamosPendientes')) || [];
        for (const reclamo of reclamosGuardados) {
            await guardarReclamo(reclamo, state.token);
        }
        await AsyncStorage.removeItem('reclamosPendientes');
        console.log("Reclamos pendientes enviados");
    } catch (error) {
        console.log("Error al enviar reclamos pendientes: ", error);
    }
}

export {obtenerSitiosSimilares, obtenerDesperfectos, guardarReclamo, obtenerMovimientosReclamo, obtenerImagenesDeUnReclamo, enviarReclamosGuardados};