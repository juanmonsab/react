import React, { useState } from "react";
import { FormularioEstudiante } from "./FormularioEstudiante";

export const TablaEstudiante = ({ listaEstudiantes, actualizarEstudiante, eliminarEstudiante }) => {

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

    return (
        <>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Buscar por nombre" onChange={handleChange} value={busqueda} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Estudiante</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Facultad</th>
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
                            actualizarEstudiante={actualizarEstudiante}
                            estudianteEditar={estudianteEditar}
                            setEstudianteEditar={setEstudianteEditar}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
