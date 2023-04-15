import React, { useState } from "react";
import { FormularioEstudiante } from "./FormularioEstudiante";

export const TablaEstudiante = ({ listaEstudiantes }) => {

    const [busqueda, setBusqueda] = useState("");   
    const [estudianteEditar, setEstudianteEditar] = useState(null);

    const handleChange = (event) => {
        setBusqueda(event.target.value);
      }
    
      const handleEditar = (estudiante) => {
        setEstudianteEditar(estudiante);
      }

      const handleEliminar = (id) => {
        eliminarEstudiante(id);
      }

      const estudiantesFiltrados = listaEstudiantes.filter((estudiante) => {
        return estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase());
      });

    }
    return (
        <>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Buscar por nombre" onChange={handleChange} value={busqueda} />
      </div>