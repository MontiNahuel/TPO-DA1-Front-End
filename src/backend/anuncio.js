function crearAnuncio(anuncio, token) {
    console.log(anuncio);
    return new Promise((resolve, reject) => {
        fetch('http://192.168.0.110:8080/anuncios/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(anuncio)
        }).then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(response.json());
            }
        }).catch(error => {
            reject(error);
        }
        )
    });
}

function obtenerAnunciosPorId(userId, token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/anuncios/especifico?doc=${userId}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(response.json());
            }
        }
        ).catch(error => {
            reject(error);
        }
        )
    });
}

export {crearAnuncio, obtenerAnunciosPorId};