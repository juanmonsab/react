import { useState, useEffect } from "react"

export const FormularioEstudiante = ({ agregar, actualizarEstudiante, estudianteEditar, setEstudianteEditar }) => {
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [facultad, setFacultad] = useState("");
    const [programa, setPrograma] = useState("");

    useEffect(() => {
        if (estudianteEditar) {
            setNombre(estudianteEditar.nombre);
            setSemestre(estudianteEditar.semestre);
            setFacultad(estudianteEditar.facultad);
            setPrograma(estudianteEditar.programa);
        }
    }, [estudianteEditar]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (!semestre) {
            alert("Por favor selecciona un semestre.");
            return;
        }

        if (!facultad) {
            alert("Por favor selecciona una facultad.");
            return;
        }

        if (!programa) {
            alert("Por favor ingresa un programa.");
            return;
        }

        let estudiante = { nombre: nombre, semestre: semestre, facultad: facultad, programa: programa };

        if (estudianteEditar) {
            actualizarEstudiante(estudianteEditar.id, estudiante);
            setEstudianteEditar(null);
            setNombre("");
            setSemestre("");
            setFacultad("");
            setPrograma("");

        } else {
            agregar(estudiante);
            setNombre("");
            setSemestre("");
            setFacultad("");
            setPrograma("");

        }
    };

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro que deseas eliminar el estudiante ${nombre}?`)) {
            actualizarEstudiante(estudianteEditar.id, null);
            setEstudianteEditar(null);
            setNombre("");
            setSemestre("");
            setFacultad("");
            setPrograma("");
        }
    };

        return (
            <>
                <form onSubmit={handleSubmit}>

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
                        <select
                            className="form-control"
                            id="semestre"
                            value={semestre}
                            onChange={(event) => setSemestre(event.target.value)}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((semestre) => (
                                <option value={semestre} key={semestre}>
                                    {semestre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facultad">Facultad</label>
                        <select
                            className="form-control"
                            id="facultad"
                            value={facultad}
                            onChange={(event) => setFacultad(event.target.value)}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Ingeniería">Ingeniería</option>
                            <option value="Ciencias">Ciencias</option>
                            <option value="Artes">Artes</option>
                            <option value="Humanidades">Humanidades</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="programa">Programa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Programa"
                            placeholder="Ingrese el Programa"
                            value={programa}
                            onChange={(event) => setPrograma (event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {estudianteEditar ? "Actualizar" : "Agregar"}
                    </button>
                    {estudianteEditar && (
                        <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
                            Eliminar
                        </button>
                    )}
                </form>
            </>
        );
    }; 