import React, { useState } from "react";
import { postEstudiantes } from "../peticiones/postEstudiantes";

export const FormularioEstudiante = ({ agregarEstudiante }) => {
  const [nombre, setNombre] = useState("");
  const [semestre, setSemestre] = useState("");
  const [facultad, setFacultad] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [nuevoDia, setNuevoDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [programa, setPrograma] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (diasDisponibles.length === 0) {
      alert("Debe agregar al menos una disponibilidad.");
      return;
    }

    let estudiante = {
      nombre: nombre,
      semestre: semestre,
      facultad: facultad,
      habilidades: habilidades.split(",").map((habilidad) => habilidad.trim()),
      disponibilidad: diasDisponibles,
      programa: programa,
    };

    postEstudiantes(estudiante)
      .then((response) => {
        console.log("Estudiante agregado:", response);
        agregarEstudiante(response);
      })
      .catch((error) => {
        console.error("Error al agregar estudiante:", error);
      });

    setNombre("");
    setSemestre("");
    setFacultad("");
    setHabilidades("");
    setDiasDisponibles([]);
    setPrograma("");
  };

  const handleAgregarDiaHora = () => {
    if (horaFin < horaInicio) {
      alert("La hora de fin no puede ser antes que la hora de inicio.");
      return;
    }

    const horario = `${horaInicio}-${horaFin}`;

    setDiasDisponibles([...diasDisponibles, { dia: nuevoDia, horario }]);

    setNuevoDia("");
    setHoraInicio("");
    setHoraFin("");
  };

  const handleEliminarDiaHora = (index) => {
    const nuevosDiasDisponibles = [...diasDisponibles];
    nuevosDiasDisponibles.splice(index, 1);
    setDiasDisponibles(nuevosDiasDisponibles);
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
          <label htmlFor="habilidades">Habilidades</label>
          <input
            type="text"
            className="form-control"
            id="habilidades"
            placeholder="Ingrese habilidades separadas por comas"
            value={habilidades}
            onChange={(event) => setHabilidades(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="programa">Programa</label>
          <input
            type="text"
            className="form-control"
            id="programa"
            placeholder="Ingrese programa"
            value={programa}
            onChange={(event) => setPrograma(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Días y Horarios de Disponibilidad</label>
          <div className="input-group mb-3">
            <select
              className="custom-select"
              value={nuevoDia}
              onChange={(event) => setNuevoDia(event.target.value)}
            >
              <option value="">Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
            <div className="input-group-prepend">
              <span className="input-group-text">Inicio</span>
            </div>
            <input
              type="time"
              className="form-control"
              value={horaInicio}
              onChange={(event) => setHoraInicio(event.target.value)}
            />
            <div className="input-group-prepend">
              <span className="input-group-text">Fin</span>
            </div>
            <input
              type="time"
              className="form-control"
              value={horaFin}
              onChange={(event) => setHoraFin(event.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAgregarDiaHora}
              >
                Agregar
              </button>
            </div>
          </div>
          {diasDisponibles.length > 0 && (
            <ul className="list-group mt-2">
              {diasDisponibles.map((diaHora, index) => (
                <li className="list-group-item" key={index}>
                  {`${diaHora.dia} - ${diaHora.horario}`}
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => handleEliminarDiaHora(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </>
  );
};
