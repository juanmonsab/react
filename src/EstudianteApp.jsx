import { useState } from "react"
import { FormularioEstudiante } from "./componentes/FormularioEstudiante";
import { TablaEstudiante } from "./componentes/TablaEstudiante";



//<ListaEstudiantes lista={estudiantes}/>

export const EstudiantesApp = () => {

    const [estudiantes, setEstudiantes] = useState([]);
    console.log(estudiantes);

    const agregarEstudiante = (estudiante) => {
        setEstudiantes([...estudiantes, estudiante])
    }

    const actualizarEstudiante = (id, estudianteActualizado) => {
        const nuevosEstudiantes = estudiantes.map((estudiante) =>
            estudiante.id === id ? estudianteActualizado : estudiante
        );
        setEstudiantes(nuevosEstudiantes);
    };

    const eliminarEstudiante = (id) => {
        const nuevosEstudiantes = estudiantes.filter(
            (estudiante) => estudiante.id !== id
        );
        setEstudiantes(nuevosEstudiantes);
    };

    return (
        <>
            <FormularioEstudiante agregar={agregarEstudiante} actualizarEstudiante={actualizarEstudiante} />
            <TablaEstudiante listaEstudiantes={estudiantes} actualizarEstudiante={actualizarEstudiante} eliminarEstudiante={eliminarEstudiante} />
        </>
    )
} 
