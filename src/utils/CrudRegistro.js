/**
 * Función que implementa el CRUD del modelo de usuarios. Se implementa los sig. métodos:
 * 
 * <ul style="list-style: none;">
 *  <li> createUsuario
 * </ul>
 */
 export const CrudRegistro = {
    createUsuario: async (body) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
        redirect: "follow",
      };
  
      const res = await fetch(
        "https://sisu-prueba-correccion.herokuapp.com/servicio/usuarios",
        requestOptions
      );
  
      if (res.ok) return res.json();
      else return "Error en el CREATE";
    },
  };
  