function obtenerTodosLosAnuncios(token) {
    return new Promise((resolve, reject) => {
        const url = 'http://192.168.0.110:8080/anuncios/todos'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    resolve(data);
                }).catch(error => {
                    reject({ message: "Error al obtener datos", error });
                });
            }
        }).catch(error => {
            console.log("Error al obtener anuncios: ", error);
        });
});
}

export default obtenerTodosLosAnuncios;