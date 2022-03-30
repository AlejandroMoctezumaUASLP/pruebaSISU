import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/authContext'
import styles from "./PagesStyle.module.css";

export const HomePage = () => {
    const {user, logOut, loading} = useAuth();

    const [listaUsuarios, setListaUsuarios] = useState([]);

    const handleLogout = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
    
        fetch(
          "http://localhost:8000/servicio/usuarios",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setListaUsuarios(result.result))
          .catch((error) => console.log("Hubo un error"));
    }, []);

    return (
        <div>
            <h1 className={`${styles.camposDatosUsuario}`}>Welcome {user.displayName || user.email}!</h1>
            <button 
                sx={{ backgroundColor: "#CACACA", padding: "10px" }}
                onClick={handleLogout}
            >
                Logout
            </button>
            <h2 className={`${styles.tituloPantalla}`}>Usuarios del Sistema:</h2>
            {listaUsuarios.map((item, key) => (
            <div key={key} className={`${styles.datosUsuario}`}>
                <p className={`${styles.camposDatosUsuario}`}><b>Nombre:</b> {item.nombre}</p>
                <p className={`${styles.camposDatosUsuario}`}><b>Edad:</b> {item.edad}</p>
                <p className={`${styles.camposDatosUsuario}`}><b>Ciudad:</b> {item.ciudad.nombre}</p>
            </div>
            ))}
        </div>
    )
}
