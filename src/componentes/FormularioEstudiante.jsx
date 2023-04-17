import { useState, useEffect } from "react"

export const FormularioEstudiante = ({ agregar, actualizarEstudiante, estudianteEditar, setEstudianteEditar }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [facultad, setfacultad] =useState("");

    useEffect(() => {
        if (estudianteEditar) {
            setId(estudianteEditar.id);
            setNombre(estudianteEditar.nombre);
            setSemestre(estudianteEditar.semestre);
            setFacultad(estudianteEditar.facultad);
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID Estudiante</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        placeholder="Ingrese ID"
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Ingrese nombre"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="semestre">Semestre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="semestre"
                        placeholder="Ingrese semestre"
                        value={semestre}
                        onChange={(event) => setSemestre(event.target.value)}
                        required
                    />
                </div>
                {estudianteEditar ? (
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Actualizar
                        </button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={() => {
                            setEstudianteEditar(null);
                            setId("");
                            setNombre("");
                            setSemestre("");
                        }}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary">
                        Registrar
                    </button>
                )}
            </form>
        </>
    );
};