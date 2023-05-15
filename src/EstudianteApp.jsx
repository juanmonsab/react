import { useState } from "react"
import { useEffect } from "react"
import { FormularioEstudiante } from "./componentes/FormularioEstudiante";
import { TablaEstudiante } from "./componentes/TablaEstudiante";
import { getEstudiantes } from "./peticiones/getEstudiantes";
import { postEstudiantes } from "./peticiones/postEstudiantes";



//<ListaEstudiantes lista={estudiantes}/>

export const EstudiantesApp = () => {

    const [estudiantes, setEstudiantes] = useState([]);
    console.log(estudiantes);

    const agregarEstudiante = (estudiante) => {
        setEstudiantes([...estudiantes, estudiante])
        postEstudiantes(estudiante);
    }

    const cargueEstudiantes = async () => {
        const datos = await getEstudiantes()
        setEstudiantes(datos);
    }

    useEffect(()=>{
        cargueEstudiantes();
    },[])

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
