
export const deleteEstudiantes = async (id) => {
    const url = `http://localhost:8080/estudiantes/eliminar/${id}`;
    const resp = await fetch(url, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const respuesta = await resp.json();
    if (!resp.ok) {
        throw new Error(respuesta.error);
    }
    console.log(respuesta);
}
