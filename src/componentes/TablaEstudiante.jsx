import React, { useState } from "react";
import { FormularioEstudiante } from "./FormularioEstudiante";
import { deleteEstudiantes } from "../peticiones/deleteEstudiantes";
import { putEstudiantes } from "../peticiones/putEstudiantes";

export const TablaEstudiante = ({ listaEstudiantes, actualizarEstudiante, eliminarEstudiante }) => {

    const [busquedaNombre, setBusquedaNombre] = useState("");
    const [busquedaFacultad, setBusquedaFacultad] = useState("");
    const [estudianteEditar, setEstudianteEditar] = useState(null);
    const [limiteResultados, setLimiteResultados] = useState(0);

    const handleChangeNombre = (event) => {
        setBusquedaNombre(event.target.value);
    }

    const handleChangeFacultad = (event) => {
        setBusquedaFacultad(event.target.value);
        setLimiteResultados(0);
    }

    const handleEditar = (estudiante) => {
        setEstudianteEditar(estudiante);
    }

    const handleEliminar = async (id) => {
        await deleteEstudiantes(id);
        eliminarEstudiante(id);
        alert('El estudiante ha sido eliminado correctamente.');
    };

    const handleActualizar = async (id, datosEstudiante) => {
        const data = {
          nombre: datosEstudiante.nombre,
          semestre: datosEstudiante.semestre,
          facultad: datosEstudiante.facultad,
          programa: datosEstudiante.programa
        };
        console.log("Datos del estudiante a actualizar:", data); 
        await putEstudiantes(id, data);
        actualizarEstudiante(id, data);
        alert('El estudiante ha sido actualizado correctamente.');
    }

    const facultades = Array.from(new Set(listaEstudiantes.map((estudiante) => estudiante.facultad)));

    const estudiantesFiltrados = listaEstudiantes.filter((estudiante) => {
        return estudiante.nombre.toLowerCase().includes(busquedaNombre.toLowerCase())
          && (busquedaFacultad === "" || estudiante.facultad === busquedaFacultad);
    }).slice(0, limiteResultados || listaEstudiantes.length);

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Buscar por nombre" onChange={handleChangeNombre} value={busquedaNombre} />
                </div>
                <div className="col-md-4">
                    <select className="form-select" onChange={handleChangeFacultad} value={busquedaFacultad}>
                        <option value="">Filtrar por facultad</option>
                        {facultades.map((facultad) => (
                            <option key={facultad} value={facultad}>{facultad}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <select className="form-select" onChange={(e) => setLimiteResultados(e.target.value)} value={limiteResultados}>
                        <option value="">Limite resultados</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((limite) => (
                            <option key={limite} value={limite}>{limite}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary" onClick={() => { setBusquedaFacultad(""); setLimiteResultados(0); }}>Limpiar filtro</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Estudiante</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Facultad</th>
                        <th scope="col">Programa</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantesFiltrados.map((estudiante) => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.semestre}</td>
                            <td>{estudiante.facultad}</td>
                            <td>{estudiante.programa}</td>  
                            <td>
                                <button className="btn btn-info mr-2" onClick={() => handleEditar(estudiante)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger" onClick={() => handleEliminar(estudiante.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {estudianteEditar && (
                <div className="card">
                    <div className="card-header">
                        Editar Estudiante
                    </div>
                    <div className="card-body">
                        <FormularioEstudiante
                            actualizarEstudiante={handleActualizar}
                            estudianteEditar={estudianteEditar}
                            setEstudianteEditar={setEstudianteEditar}
                        />
                    </div>
                </div>
            )}
        </>
    );
}