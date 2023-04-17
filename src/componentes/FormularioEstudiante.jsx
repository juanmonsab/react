import { useState, useEffect } from "react"

export const FormularioEstudiante = ({ agregar, actualizarEstudiante, estudianteEditar, setEstudianteEditar }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [facultad, setFacultad] = useState("");

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

        if (!/^\d{6,10}$/.test(id)) {
            alert("El ID debe ser un número de 6 a 10 dígitos.");
            return;
        }

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        let estudiante = { id: id, nombre: nombre, semestre: semestre, facultad: facultad };

        if (estudianteEditar) {
            actualizarEstudiante(estudianteEditar.id, estudiante);
            setEstudianteEditar(null);
            setId("");
            setNombre("");
            setSemestre("");
            setFacultad("");

        } else {
            agregar(estudiante);
            setId("");
            setNombre("");
            setSemestre("");
            setFacultad("");

        }
    };

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro que deseas eliminar el estudiante ${nombre}?`)) {
            actualizarEstudiante(id, null);
            setEstudianteEditar(null);
            setId("");
            setNombre("");
            setSemestre("");
            setFacultad("");
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