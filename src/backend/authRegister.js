function verificarResidente(doc) {
    return new Promise((resolve, reject) => {
        console.log("Verificando residente");
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

export {verificarResidente};