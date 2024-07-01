function guardarDenuncia(denuncia, token) {
    return new Promise((resolve, reject) => {
        const url = 'http://192.168.0.110:8080/denuncias/crear';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(denuncia)
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
                });
            }
        }).catch(error => {
            console.log("Error al guardar denuncia: ", error);
        });
    });
}

function obtenerMovimientosDeUnaDenuncia(idDeuncia, token) {
    return new Promise((resolve, reject) => {
        const url = 'http://192.168.0.110:8080/denuncias/movimientos?idDenuncia=' + idDeuncia;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }}).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    resolve(json);
                }).catch(error => {
                    reject({ message: "Error al obtener datos", error });
                });
            } else {
                response.text().then(text => {
                    reject({ message: text });
                });
            }}).catch(error => {
                console.log("Error al obtener movimientos de denuncia: ", error);
            });
        });
}

export {guardarDenuncia, obtenerMovimientosDeUnaDenuncia};