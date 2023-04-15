import React, { useState } from "react";
import { FormularioEstudiante } from "./FormularioEstudiante";

export const TablaEstudiante = ({ listaEstudiantes }) => {

    const [busqueda, setBusqueda] = useState("");
        
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id Estudiante</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaEstudiantes.map((estudiante) => <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.semestre}</td>
                            <td> <button className="btn btn-info" onClick={editar}>Editar</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}