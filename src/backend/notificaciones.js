function setTokenEnDb(userid, tokenNotif, token) {
  // Guardar el token en la base de datos
    const url = 'http://192.168.0.110:8080/usuarios/setTokenNotificacion';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            user: userid,
            token: tokenNotif
        })
    }).then(response => {
        if (response.ok) {
            console.log("Token guardado en la base de datos");
        }
    }
    ).catch(error => {
        console.log("Error al guardar el token en la base de datos: ", error);
    });
}

export {setTokenEnDb}