export const postEstudiantes = async (estudiante) => {
    try {
      const url = "http://localhost:8080/estudiantes/crear";
      const method = "POST";
  
      const resp = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudiante),
      });
  
      const respuesta = await resp.json();
      console.log(respuesta);
  
      return respuesta;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw new Error("Error al agregar estudiante");
    }
  };
  