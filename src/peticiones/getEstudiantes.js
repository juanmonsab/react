export const getEstudiantes = async () => {
  try {
    const url = 'http://localhost:8080/estudiantes/todos';
    const resp = await fetch(url);
    const data = await resp.json();

    const estudianteList = data.map(estudiante => ({
      id: estudiante.codigo,
      nombre: estudiante.nombre,
      semestre: estudiante.semestre,
      facultad: estudiante.facultad,
      habilidades: estudiante.habilidades && estudiante.habilidades.length > 0 ? estudiante.habilidades : [],
      disponibilidad: estudiante.disponibilidad
    }));

    return estudianteList;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    return [];
  }
};
