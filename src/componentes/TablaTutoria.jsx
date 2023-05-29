import React, { useEffect, useState } from 'react';
import { getTutorias } from '../peticiones/getTutorias';
import { deleteTutoria } from '../peticiones/deleteTutoria';

export const TablaTutoria = () => {
  const [tutorias, setTutorias] = useState([]);

  useEffect(() => {
    const obtenerTutorias = async () => {
      try {
        const tutorias = await getTutorias();
        setTutorias(tutorias);
      } catch (error) {
        console.error('Error al obtener las tutorías:', error);
      }
    };

    obtenerTutorias();
  }, []);

  const handleEliminarTutoria = async (codigo) => {
    try {
      await deleteTutoria(codigo);
      const nuevasTutorias = tutorias.filter(tutoria => tutoria.id !== codigo);
      setTutorias(nuevasTutorias);
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tutorías</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID Tutoría</th>
            <th scope="col">Estudiante</th>
            <th scope="col">Día</th>
            <th scope="col">Hora</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tutorias.map(tutoria => {
            return (
              <tr key={tutoria.id}>
                <td>{tutoria.id}</td>
                <td>{tutoria.tutor.nombre}</td>
                <td>{tutoria.dia}</td>
                <td>{tutoria.horarioInicio} - {tutoria.horarioFin}</td>
                <td>
                  <button onClick={() => handleEliminarTutoria(tutoria.id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
