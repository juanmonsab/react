export const postTutorias = async (tutoria) => {
    try {
      const url = "http://localhost:8080/estudiantes/crearSesion";
      const method = "POST";
  
      const resp = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutoria),
      });
  
      if (!resp.ok) {
        throw new Error("Error al agendar la tutoría");
      }
  
      const data = await resp.json();
      console.log("Tutoría agendada:", data);
  
      return data;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw new Error("Error al agendar la tutoría");
    }
  };