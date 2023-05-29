export const deleteTutoria = async (codigo) => {
  try {
    const url = `http://localhost:8080/estudiantes/sesiones/eliminar/${codigo}`;
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
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
    throw new Error('Error al eliminar la sesión');
  }
};
