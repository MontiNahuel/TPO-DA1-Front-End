function obtenerReclamos(id, token) {
    return new Promise((resolve, reject) => {
        const url = `http://192.168.0.110:8080/reclamos/especifico?documento=${id}`;
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(reclamos => resolve(reclamos))
            .catch(error => reject(error));
    });
}

export default obtenerReclamos;