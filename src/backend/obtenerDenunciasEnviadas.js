function obtenerDenunciasEnviadas(doc, token) {
return new Promise((resolve, reject) => {
    const url = `http://192.168.0.110:8080/denuncias/obtenerPorDoc?doc=${doc}`;
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log("hola2")
                return response.json().then(err => { throw err; });
            }
            console.log("hola")
            return response.json();
        })
        .then(reclamos => resolve(reclamos))
        .catch(error => reject(error));
});

};

export default obtenerDenunciasEnviadas;