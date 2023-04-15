import { useState } from "react"

export const FormularioEstudiante = ({ agregar }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");

    useEffect(() => {
        if (estudianteEditar) {
            setId(estudianteEditar.id);
            setNombre(estudianteEditar.nombre);
            setSemestre(estudianteEditar.semestre);
        }
    }, [estudianteEditar]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let estudiante = { id: id, nombre: nombre, semestre: semestre };
    
        if (estudianteEditar) {
            actualizarEstudiante(estudianteEditar.id, estudiante);
            setEstudianteEditar(null);
            setId("");
            setNombre("");
            setSemestre("");
        } else {
            agregar(estudiante);
            setId("");
            setNombre("");
            setSemestre("");
        }
    };
    
    return (
        <>
            <form onSubmit={guardarEstudiante}>
                <div className="form-group ">
                    <label htmlFor="id">ID Estudiante</label>
                    <input type="id" className="form-control" id="id" placeholder="Ingrese id" value={id} onChange={(event) => setId(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="semestre">Semestre</label>
                    <input type="text" className="form-control" id="semestre" placeholder="semestre" value={semestre} onChange={(event) => setSemestre(event.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </>
    )
}