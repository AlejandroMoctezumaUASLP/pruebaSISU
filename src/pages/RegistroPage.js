import React, { useState, useEffect } from "react";
import { DropdownForm, SubmitButton } from "../components";
import FormHelperText from "@mui/material/FormHelperText";
import { CrudRegistro } from "../utils";
import styles from "./PagesStyle.module.css";
import { TextField } from "@mui/material";
import { verificarEdad, verificarId, verificarNombre} from '../funciones';

/**
 * Página de registro de nuevos usuarios.
 * 
 * El código se estructura de la sig. forma:
 * <ul style="list-style: none;">
 *  <li> Estados de Página
 *  <li> Estados de Formulario
 *  <li> Funciones de la Página
 *  <li> UseEffects (Carga Inicial, Recarga, Contexto regresó algo)
 *  <li> Componente
 * </ul>
 * @member
 */
export const RegistroPage = () => {
  // ESTADOS DE PÁGINA
  const [listaPaises, setListaPaises] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCiudades, setListaCiudades] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  // ESTADOS DE FORMULARIO
  // Datos de Formulario
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(18);

  // Validación de formulario
  const [errorPais, setErrorPais] = useState(false);
  const [errorPaisMensaje, setErrorPaisMensaje] = useState("");
  const [errorEstado, setErrorEstado] = useState(false);
  const [errorEstadoMensaje, setErrorEstadoMensaje] = useState("");
  const [errorCiudad, setErrorCiudad] = useState(false);
  const [errorCiudadMensaje, setErrorCiudadMensaje] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorNombreMensaje, setErrorNombreMensaje] = useState("");
  const [errorEdad, setErrorEdad] = useState(false);
  const [errorEdadMensaje, setErrorEdadMensaje] = useState("");

  // FUNCIONES DE LA PÁGINA

  // Formulario para crear usuario. Al terminar, se recarga la página
  const submitForm = async () => {
    const body = { ciudad, nombre, edad };
    let res = "";

    // SE HACE LA VALIDACIÓN DEL FORMULARIO
    // Validación de País
    if (!verificarId(pais)){
        setErrorPais(true);
        setErrorPaisMensaje("Falta seleccionar País!");
    }
    else{
        setErrorPais(false);
        setErrorPaisMensaje("");
    }

    // Validación de Estado
    if (!verificarId(estado)){
        setErrorEstado(true);
        setErrorEstadoMensaje("Falta seleccionar Estado!");
    }
    else{
        setErrorEstado(false);
        setErrorEstadoMensaje("");
    }

    // Validación de Ciudad
    if (!verificarId(ciudad)){
        setErrorCiudad(true);
        setErrorCiudadMensaje("Falta seleccionar Ciudad!");
    }
    else{
        setErrorCiudad(false);
        setErrorCiudadMensaje("");
    }

    // Validación de Edad
    if (!verificarEdad(edad)){
        setErrorEdad(true);
        setErrorEdadMensaje("Edad no válida!");
    }
    else{
        setErrorEdad(false);
        setErrorEdadMensaje("");
    }

    // Validación de Nombre
    const mensaje = verificarNombre(nombre);
    if (mensaje == "Válido"){
        setErrorNombre(false);
        setErrorNombreMensaje(" ");
    }
    else{
        setErrorNombre(true);
        setErrorNombreMensaje(mensaje);
    }

    // Se verifica que no hayan errores en la forma
    // Se verifica también que el mensaje de error de nombre no esté vacío
    if (!errorPais && !errorEstado && !errorCiudad && !errorEdad && !errorNombre && errorNombreMensaje !== ""){
      // Se crea el usuario
      res = await CrudRegistro.createUsuario(JSON.stringify(body));

      // Se limpian los valores del formulario
      if (res !== "")
      {
        console.log("Usuario Creado!");

        setPais("");
        setEstado("");
        setCiudad("");
        setNombre("");
        setEdad(18);
        
        setLoading(true);
      }
    }
  };

  // Cuando se carga por primera vez la página, se carga una lista de paises
  useEffect(() => {
    async function obtenerPaises() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/servicio/paises",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaPaises(result.result))
        .catch((error) => console.log("error", error));
    }

    obtenerPaises();
  }, []);

  // Cuando se cambia el pais, se carga una nueva lista de estados
  useEffect(() => {
    async function obtenerEstados() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:8000/servicio/estados/${pais}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaEstados(result.result))
        .catch((error) => console.log("No hay ID de Pais"));
    }

    // Se limpian los valores seleccionados
    setEstado("");
    setCiudad("");

    // Se limpian los dropdowns
    setListaEstados([]);
    setListaCiudades([]);
    
    // Si se selecciona un país, se actualiza el dropdown de los estados
    if (pais !== "")
        obtenerEstados();
  }, [pais]);

  // Cuando se cambia el estado, se carga una nueva lista de ciudades
  useEffect(() => {
    async function obtenerCiudades() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:8000/servicio/ciudades/${estado}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaCiudades(result.result))
        .catch((error) => console.log("No hay ID de Estado"));
    }

    // Se limpia el valor seleccionado
    setCiudad("");

    // Se limpia el dropdown
    setListaCiudades([]);

    // Si se selecciona un estado, se actualiza el dropdown de ciudades
    if (estado !== "")
        obtenerCiudades();
  }, [estado]);

  // Cuando se realiza una acción, se muestran la lista de usuarios de la página
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    if (loading) {
      fetch(
        "http://localhost:8000/servicio/usuarios",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaUsuarios(result.result))
        .catch((error) => console.log("Hubo un error"));
    }
  }, [loading]);

  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.pantallaRegistro}`} style={{display: loading ? "none" : "block"}}>
      {/* Formulario de Registro */}
      <h1 className={`${styles.tituloPantalla}`}>Registro de Usuario</h1>
      <TextField
        required
        id="outlined-required"
        label="Nombre"
        value={nombre}
        onChange={(event) => {
          setNombre(event.target.value);
        }}
        error={errorNombre}
        sx={{ paddingBottom: "10px", m: 1, width: 390 }}
      />
      <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorNombreMensaje}</FormHelperText>
      <TextField
        required
        id="outlined-required"
        label="Edad"
        type="number"
        value={edad}
        onChange={(event) => {
          const value = event.target.value;
          const setValue = (value >= 18 && value <= 99 && value.length <= 2) ? value : edad;
          setEdad(setValue);
        }}
        error={errorEdad}
        sx={{ paddingBottom: "10px", m: 1, width: 390 }}
      />
      <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorEdadMensaje}</FormHelperText>
      <DropdownForm
        label="Pais"
        opciones={listaPaises}
        values={pais}
        onChangeFunction={(event) => {
          const {
            target: { value },
          } = event;
          setPais(value);
        }}
        errorState={errorPais}
      />
      <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorPaisMensaje}</FormHelperText>
      <DropdownForm
        label="Estado"
        opciones={listaEstados}
        values={estado}
        onChangeFunction={(event) => {
          const {
            target: { value },
          } = event;
          setEstado(value);
        }}
        errorState={errorEstado}
      />
      <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorEstadoMensaje}</FormHelperText>
      <DropdownForm
        label="Ciudad"
        opciones={listaCiudades}
        values={ciudad}
        onChangeFunction={(event) => {
          const {
            target: { value },
          } = event;
          setCiudad(value);
        }}
        errorState={errorCiudad}
      />
      <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorCiudadMensaje}</FormHelperText>
      <SubmitButton title="Enviar" onClick={submitForm}></SubmitButton>
      </div>
      <div className={`${styles.pantallaRegistro}`} style={{display: loading ? "block" : "none"}}> 
        <h1 className={`${styles.tituloPantalla}`}>Usuarios del Sistema:</h1>
        {listaUsuarios.map((item, key) => (
          <div key={key} className={`${styles.datosUsuario}`}>
            <p className={`${styles.camposDatosUsuario}`}><b>Nombre:</b> {item.nombre}</p>
            <p className={`${styles.camposDatosUsuario}`}><b>Edad:</b> {item.edad}</p>
            <p className={`${styles.camposDatosUsuario}`}><b>Ciudad:</b> {item.ciudad.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
