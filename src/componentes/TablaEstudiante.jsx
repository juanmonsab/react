import React, { useEffect, useState } from "react";
import { getEstudiantes } from "../peticiones/getEstudiantes";
import { deleteEstudiantes } from "../peticiones/deleteEstudiantes";

export const TablaEstudiante = ({ eliminarEstudiante }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mensajeEliminacion, setMensajeEliminacion] = useState("");

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

  const handleEliminarEstudiante = async (id) => {
    try {
      await deleteEstudiantes(id);
      eliminarEstudiante(id);
      setMensajeEliminacion("Estudiante eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      setMensajeEliminacion("Error al eliminar el estudiante. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div>
      {mensajeEliminacion && <div className="alert alert-success">{mensajeEliminacion}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID Estudiante</th>
            <th scope="col">Nombre</th>
            <th scope="col">Semestre</th>
            <th scope="col">Facultad</th>
            <th scope="col">Habilidades</th>
            <th scope="col">Disponibilidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.semestre}</td>
              <td>{estudiante.facultad}</td>
              <td>
                {estudiante.habilidades && estudiante.habilidades.length > 0 ? (
                  <ul>
                    {estudiante.habilidades.map((habilidad, index) => (
                      <li key={index}>{habilidad}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <ul>
                  {estudiante.disponibilidad.map((disponibilidad, index) => (
                    <li key={index}>{`${disponibilidad.dia} - ${disponibilidad.horario}`}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminarEstudiante(estudiante.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
