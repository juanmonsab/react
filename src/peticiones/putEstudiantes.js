
export const putEstudiantes = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8080/estudiantes/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resultado = await response.json();
        console.log("Respuesta de la petición PUT:", resultado); // Agregado para verificar la respuesta de la petición PUT
        return resultado;
    } catch (error) {
        console.log(error);
        return error;
    }
};