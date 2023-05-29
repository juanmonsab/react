import React, { useState } from "react";
import { FormularioEstudiante } from "./componentes/FormularioEstudiante";
import { TablaEstudiante } from "./componentes/TablaEstudiante";
import { FormularioTutoria } from "./componentes/FormularioTutoria";
import { TablaTutoria } from "./componentes/TablaTutoria";

export const EstudiantesApp = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [tutorias, setTutorias] = useState([]);
  const [activeTab, setActiveTab] = useState("registroEstudiante");

  const handleAgregarEstudiante = (estudiante) => {
    setEstudiantes([...estudiantes, estudiante]);
  };

  const handleEliminarEstudiante = (id) => {
    const nuevosEstudiantes = estudiantes.filter((estudiante) => estudiante.id !== id);
    setEstudiantes(nuevosEstudiantes);

    // Eliminar tutorías asociadas al estudiante eliminado
    const nuevasTutorias = tutorias.filter((tutoria) => tutoria.estudiante.id !== id);
    setTutorias(nuevasTutorias);
  };

  const handleAgendarTutoria = (tutoria) => {
    setTutorias([...tutorias, tutoria]);
  };

  const handleEliminarTutoria = (tutoriaId) => {
    const nuevasTutorias = tutorias.filter((tutoria) => tutoria.id !== tutoriaId);
    setTutorias(nuevasTutorias);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "registroEstudiante" ? "active" : ""}`}
              onClick={() => handleTabChange("registroEstudiante")}
            >
              Registro de Estudiantes
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "listaEstudiantes" ? "active" : ""}`}
              onClick={() => handleTabChange("listaEstudiantes")}
            >
              Lista de Estudiantes
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "registroTutoria" ? "active" : ""}`}
              onClick={() => handleTabChange("registroTutoria")}
            >
              Registro de Tutorías
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "listaTutorias" ? "active" : ""}`}
              onClick={() => handleTabChange("listaTutorias")}
            >
              Lista de Tutorías
            </button>
          </li>
        </ul>
      </nav>

      {activeTab === "registroEstudiante" && (
        <FormularioEstudiante agregarEstudiante={handleAgregarEstudiante} />
      )}
      {activeTab === "listaEstudiantes" && (
        <TablaEstudiante
          estudiantes={estudiantes}
          eliminarEstudiante={handleEliminarEstudiante}
        />
      )}
      {activeTab === "registroTutoria" && (
        <FormularioTutoria
          estudiantes={estudiantes}
          agendarTutoria={handleAgendarTutoria}
        />
      )}
      {activeTab === "listaTutorias" && (
        <TablaTutoria tutorias={tutorias} eliminarTutoria={handleEliminarTutoria} />
      )}
    </>
  );
};
