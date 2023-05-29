export const deleteEstudiantes = async (id) => {
    try {
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
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
      throw new Error('Error al eliminar el estudiante');
    }
  };
  