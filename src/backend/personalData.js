function personalData(userId, token) {
    return new Promise((resolve, reject) => {
        const url = 'http://192.168.0.110:8080/personal/obtenerUno?legajo=' + userId;
        console.log(userId);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    resolve(data);
                }).catch(error => {
                    reject({ message: "Error al obtener datos", error });
                });
            }
        }
        ).catch(error => {
            console.log("Error al obtener datos personales: ", error);
        });
    });
}

export default personalData;