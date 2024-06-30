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

export {guardarDenuncia};