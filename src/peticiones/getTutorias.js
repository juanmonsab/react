export const getTutorias = async () => {
  try {
    const url = 'http://localhost:8080/estudiantes/sesiones';
    const resp = await fetch(url);
    const data = await resp.json();

    if (!Array.isArray(data)) {
      console.error('La respuesta del servidor no es un array válido:', data);
      return [];
    }

    const tutoriasList = data.map(tutoria => {
      const estudiante = tutoria.estudiante ?? {};
      const tutor = tutoria.tutor ?? {};

      return {
        id: tutoria.codigo ?? '',
        estudiante: {
          id: estudiante.codigo ?? '',
          nombre: estudiante.nombre ?? '',
          semestre: estudiante.semestre ?? '',
          facultad: estudiante.facultad ?? '',
          habilidades: estudiante.habilidades ?? [],
          disponibilidad: estudiante.disponibilidad ?? []
        },
        tutor: {
          id: tutor.codigo ?? '',
          nombre: tutor.nombre ?? '',
          facultad: tutor.facultad ?? '',
          programa: tutor.programa ?? '',
          semestre: tutor.semestre ?? '',
          habilidades: tutor.habilidades ?? [],
          disponibilidad: tutor.disponibilidad ?? []
        },
        dia: tutoria.dia ?? '',
        horarioInicio: tutoria.horarioInicio ?? '',
        horarioFin: tutoria.horarioFin ?? ''
      };
    });

    return tutoriasList;
  } catch (error) {
    console.error('Error al obtener las tutorías:', error);
    return [];
  }
};
