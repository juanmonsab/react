import React, { useState, useEffect } from "react";
import { getEstudiantes } from "../peticiones/getEstudiantes";
import { postTutorias } from "../peticiones/postTutorias";

export const FormularioTutoria = ({ agendarTutoria }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");
  const [disponibilidadEstudiante, setDisponibilidadEstudiante] = useState([]);
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const estudiantesData = await getEstudiantes();
        setEstudiantes(estudiantesData);
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleEstudianteChange = (event) => {
    const estudianteCodigo = event.target.value;
    setEstudianteSeleccionado(estudianteCodigo);
    const estudiante = estudiantes.find((estudiante) => estudiante.id === parseInt(estudianteCodigo));
    if (estudiante) {
      setDisponibilidadEstudiante(estudiante.disponibilidad);
      setHorariosSeleccionados([]);
    } else {
      setDisponibilidadEstudiante([]);
      setHorariosSeleccionados([]);
    }
  };

  const handleHorarioChange = (event) => {
    const horario = JSON.parse(event.target.value);
    const horariosActualizados = [...horariosSeleccionados];

    if (event.target.checked) {
      horariosActualizados.push(horario);
    } else {
      const index = horariosActualizados.findIndex(h => h.dia === horario.dia && h.horario === horario.horario);
      if (index !== -1) {
        horariosActualizados.splice(index, 1);
      }
    }

    setHorariosSeleccionados(horariosActualizados);
  };

  const handleAgendarTutoria = async () => {
    if (!estudianteSeleccionado) {
      console.error("Selecciona un estudiante");
      return;
    }

    if (horariosSeleccionados.length === 0) {
      console.error("Selecciona al menos un horario");
      return;
    }

    const estudiante = estudiantes.find((estudiante) => estudiante.id === parseInt(estudianteSeleccionado));

    if (!estudiante) {
      console.error("Estudiante no encontrado");
      return;
    }

    const horariosSeleccionadosObj = estudiante.disponibilidad.filter((disponibilidad) =>
      horariosSeleccionados.some(h => h.dia === disponibilidad.dia && h.horario === disponibilidad.horario)
    );

    const tutoria = {
      tutor: {
        codigo: estudiante.id,
        nombre: estudiante.nombre,
        facultad: estudiante.facultad,
        programa: estudiante.programa,
        semestre: estudiante.semestre,
        habilidades: estudiante.habilidades,
        disponibilidad: horariosSeleccionadosObj,
      },
      dia: horariosSeleccionadosObj[0].dia,
      horarioInicio: horariosSeleccionadosObj[0].horario.split(" - ")[0],
      horarioFin: horariosSeleccionadosObj[0].horario.split(" - ")[1],
    };

    try {
      const nuevaTutoria = await postTutorias(tutoria);
      console.log("Tutoría registrada:", nuevaTutoria);
      agendarTutoria(nuevaTutoria);
      setEstudianteSeleccionado("");
      setDisponibilidadEstudiante([]);
      setHorariosSeleccionados([]);
    } catch (error) {
      console.error("Error al registrar la tutoría:", error);
    }
  };

  return (
    <div>
      <h2>Registro de Tutorías</h2>
      <div>
        <label>Estudiante:</label>
        <select value={estudianteSeleccionado} onChange={handleEstudianteChange}>
          <option value="">Selecciona un estudiante</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Horarios Disponibles:</h3>
        {estudianteSeleccionado && disponibilidadEstudiante.length > 0 ? (
          <div>
            {disponibilidadEstudiante.map((disponibilidad, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={JSON.stringify(disponibilidad)}
                  value={JSON.stringify(disponibilidad)}
                  checked={horariosSeleccionados.some(h => h.dia === disponibilidad.dia && h.horario === disponibilidad.horario)}
                  onChange={handleHorarioChange}
                />
                <label htmlFor={JSON.stringify(disponibilidad)}>{`${disponibilidad.dia} - ${disponibilidad.horario}`}</label>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay disponibilidad disponible</p>
        )}
      </div>
      <div>
        <button onClick={handleAgendarTutoria}>Agendar Tutoría</button>
      </div>
    </div>
  );
};
