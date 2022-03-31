import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * Función asíncrona que da de alta una imagen en Firebase Storage:
 * @param {image} image La imagen a subir
 * @return {string} URL donde se encuentra la imagen en Storage.
 */

/**************************
 * Verifica que no sea null
 * @param {image} image La imagen a validar
 * @return {bolean} Determina si el password es válido o no
 */

export const subirImagen = async (imagen) => {
    const directorio = `imagenes/${imagen.name}`;
    const imagenRef = ref(storage, directorio);
    await uploadBytesResumable(imagenRef, imagen);
    return await getDownloadURL(imagenRef);
}