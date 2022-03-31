import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const subirImagen = async (imagen) => {
    const directorio = `imagenes/${imagen.name}`;
    const imagenRef = ref(storage, directorio);
    await uploadBytesResumable(imagenRef, imagen);
    return await getDownloadURL(imagenRef);
}