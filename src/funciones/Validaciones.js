/**************************
 * Verifica las siguientes propiedades del nombre:
 * - Que el input no esté vacío
 * - Que el nombre no sea de más de 50 caracteres
 * - Que el nombre use caracteres válidos (a-z,A-Z,á-ú,Á-Ú,Espacio y Punto)
 * La función retorna un string que dice si el nombre es válido y si no, el por qué.
 * @param {string} nombre El nombre a validar
 * @return {string} Texto que puede decir "Válido", "Nombre no válido", "Nombre demasiado largo" o "Falta Nombre"
 */
 export const verificarNombre = ( nombre ) => {
    if (nombre !== "")
    {
        if(nombre.length > 50)
            return "Nombre demasiado largo";
        for (let i = 0; i < nombre.length; i++ )
        {
            // Se verifica que el nombre tenga caracteres válidos en base a su valor Unicode.
            // Valores ASCII de los caracteres válidos
            // 32: Espacio
            // 46: Punto
            // 65 - 90: Letras Mayúsculas
            // 97 - 122: Letras Minúsculas
            // 193: Á, 201: É, 205: Í
            // 209: Ñ, 211: Ó, 218: Ú
            // 225: á, 233: é, 237: í
            // 241: ñ, 243: ó, 250: ú

            const caracter = nombre.charCodeAt(i);
            if ( caracter == 32 || caracter == 46 || ( caracter >= 65 && caracter <= 90 ) || 
               ( caracter >= 97 && caracter <= 122 ) || caracter == 193 || caracter == 201 || 
                 caracter == 205 || caracter == 209 || caracter == 211 || caracter == 218 ||
                 caracter == 225 || caracter == 233 || caracter == 237 || caracter == 241 ||
                 caracter == 243 || caracter == 250 )
                continue;
            else 
                // Existen caracteres no válidos en el nombre
                return "Nombre no válido";
        }
        // El nombre es válido
        return "Válido";
    }
    // El campo de Nombre está vacío
    return "Falta nombre";
};

/**************************
 * Verifica que la edad sea un entero. La forma hace la validación
 * que el rango de edad sea entre 18 a 99 años.
 * @param {number} edad La edad a validar
 * @return {boolean} Determina si la Edad es válida o no
 */
export const verificarEdad = ( edad ) => {
  if(Number.isInteger(edad))
    return true;
  else
    return false;
};

/**************************
 * Verifica que el ID que se haya pasado no sea un string vacio
 * @param {number} edad La edad a validar
 * @return {bolean} Determina si el ID es válido o no
 */
export const verificarId = ( id ) => {
  if (id !== "")
    return true;
  else
    return false;
};