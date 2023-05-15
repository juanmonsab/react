
export const postEstudiantes = async (estudiante, id = null) => {
    let url = 'http://localhost:8080/estudiantes/crear';
    let method = 'POST';

    const resp = await fetch(url,{ 
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    })

    const respuesta = await resp.json();
    console.log(respuesta);
}
