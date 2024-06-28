function verificarResidente(doc) {
    return new Promise((resolve, reject) => {
        //console.log("Verificando residente");
        const url = 'http://192.168.0.110:8080/registro/verificacion?dni='+doc;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                console.log(response)
                response.text().then(text => {
                    resolve(text);
                }).catch(error => {
                    reject({ message: "Error al obtener datos", error });
                });
            } else {
                response.text().then(text => {
                    if (response.status === 401) {
                        reject({ message: text, notAllowed: 1});
                    }
                    reject({ message: text });
                }).catch(error => {
                    reject({ message: "Error al leer el mensaje de error" });
                });
            }
        }).catch(error => {
            console.log("Error al verificar residente: ", error);
            
        });
    });
}

function inscribirResidente(datos) {
    return new Promise((resolve, reject) => {
        const url = 'http://192.168.0.110:8080/registro/completarRegistro';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }).then(response => {
            if (response.ok) {
                response.text().then(text => {
                    resolve(text);
                }).catch(error => {
                    reject({ message: "Error al obtener datos", error });
                });
            } else {
                response.text().then(text => {
                    reject({ message: text });
                }).catch(error => {
                    reject({ message: "Error al leer el mensaje de error" });
                });
            }
        }).catch(error => {
            console.log("Error al inscribir residente: ", error);
        });
    });
}

export {verificarResidente, inscribirResidente};