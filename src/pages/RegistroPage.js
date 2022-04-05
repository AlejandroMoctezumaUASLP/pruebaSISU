// React
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { DropdownForm, SubmitButton } from "../components";
import { useAuth } from "../contexts"
import { 
  verificarEdad, 
  verificarId, 
  verificarNombre, 
  verificarEmail, 
  verificarPassword,
  verificarNoNull 
} from '../funciones';
import { CrudRegistro, subirImagen, descargarImagen } from "../utils";

// Modulo CSS
import styles from "./PagesStyle.module.css";

// Importaciones Prime React
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";

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
  const [submitting, setSubmitting] = useState(false);

  // ESTADOS DE FORMULARIO
  // Datos de Formulario
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState(18);
  const [profile, setProfile] = useState(null)

  // Validación de formulario
  const [errorPais, setErrorPais] = useState(false);
  const [errorPaisMensaje, setErrorPaisMensaje] = useState("");
  const [errorEstado, setErrorEstado] = useState(false);
  const [errorEstadoMensaje, setErrorEstadoMensaje] = useState("");
  const [errorCiudad, setErrorCiudad] = useState(false);
  const [errorCiudadMensaje, setErrorCiudadMensaje] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorNombreMensaje, setErrorNombreMensaje] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMensaje, setErrorEmailMensaje] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMensaje, seterrorPasswordMensaje] = useState("");
  const [errorEdad, setErrorEdad] = useState(false);
  const [errorEdadMensaje, setErrorEdadMensaje] = useState("");
  const [errorProfile, setErrorProfile] = useState(false);
  const [errorProfileMensaje, setErrorProfileMensaje] = useState("");

  // Contextos y Navegador
  const {signUp} = useAuth();
  const navigate = useNavigate();

  // FUNCIONES DE LA PÁGINA

  // Formulario para crear usuario. Al terminar, se recarga la página
  const submitForm = (e) => {
    e.preventDefault();

    // Se guardan los valores de las verificaciones del formulario
    const paisVerificado = verificarId(pais);
    const estadoVerificado = verificarId(estado);
    const ciudadVerificada = verificarId(ciudad);
    const edadVerificada = verificarEdad(edad);
    const emailVerificado = verificarEmail(email);
    const passwordVerificado = verificarPassword(password);
    const nombreVerificado = verificarNombre(nombre);
    const imagenVerificada = verificarNoNull(profile);

    // SE HACE LA VALIDACIÓN DEL FORMULARIO
    // Validación de País
    if (!paisVerificado){
        setErrorPais(true);
        setErrorPaisMensaje("Falta seleccionar País!");
    }
    else{
        setErrorPais(false);
        setErrorPaisMensaje("");
    }

    // Validación de Estado
    if (!estadoVerificado){
        setErrorEstado(true);
        setErrorEstadoMensaje("Falta seleccionar Estado!");
    }
    else{
        setErrorEstado(false);
        setErrorEstadoMensaje("");
    }

    // Validación de Ciudad
    if (!ciudadVerificada){
        setErrorCiudad(true);
        setErrorCiudadMensaje("Falta seleccionar Ciudad!");
    }
    else{
        setErrorCiudad(false);
        setErrorCiudadMensaje("");
    }

    // Validación de Edad
    if (!edadVerificada){
        setErrorEdad(true);
        setErrorEdadMensaje("Edad no válida!");
    }
    else{
        setErrorEdad(false);
        setErrorEdadMensaje("");
    }

    // Validación de Email
    if (!emailVerificado){
      setErrorEmail(true);
      setErrorEmailMensaje("Email no válido!");
    }
    else{
      setErrorEmail(false);
      setErrorEmailMensaje("");
    }

    // Validación de Password
    if (!passwordVerificado){
      setErrorPassword(true);
      seterrorPasswordMensaje("Password de mínimo 6 caractéres!");
    }
    else{
      setErrorPassword(false);
      seterrorPasswordMensaje("");
    }

    // Validación de Nombre
    if (nombreVerificado === "Válido"){
      setErrorNombre(false);
      setErrorNombreMensaje("");
    }
    else{
      setErrorNombre(true);
      setErrorNombreMensaje(nombreVerificado);
    }

    // Validar Imagen
    if (!imagenVerificada){
      setErrorProfile(true);
      setErrorProfileMensaje("No hay imagen!");
    }
    else{
      setErrorProfile(false);
      setErrorProfileMensaje("");
    }

    // Si todas las verificaciones pasaron, se inicia el proceso de crear un usuario
    // y logearlo en el sistema.
    if (paisVerificado && estadoVerificado && ciudadVerificada && edadVerificada && 
      emailVerificado && passwordVerificado && nombreVerificado === "Válido" && imagenVerificada){
      setSubmitting(true);
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

  // Con los datos del usuario, se crea un usuario en la BD local como también
  // en Firebase Auth
  useEffect(() => {
    async function registrarUsuario() {
      let body = { ciudad, nombre, edad };
      const userData = { email, password };
      let res = " ";

      // Se crea la imagen de perfil y se agrega la URL al body
      const urlImagen = await subirImagen(profile);
      body = {...body, urlImagen}

      // Se crea el usuario en la BD local
      res = await CrudRegistro.createUsuario(JSON.stringify(body));

      // // Se crea el usuario en Firebase Auth y se logea
      await signUp(userData.email, userData.password);

      // Se limpian los valores del formulario
      if (res !== "")
      {
        setPais("");
        setEstado("");
        setCiudad("");
        setNombre("");
        setEdad(18);
        setEmail("");
        setPassword("");
        
        setSubmitting(false);
        navigate("/");
      }
    }

    if(submitting)
      registrarUsuario();
  },[submitting])

  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.pantallaRegistro}`}>
        {/* Formulario de Registro */}
        <h1 className={`${styles.tituloPantalla}`}>Registro de Usuario</h1>

        <span className="p-float-label" style={{marginBottom: "30px"}}>
          <InputText 
            id="nombre" 
            value={nombre} 
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
          <label htmlFor="nombre">Nombre</label>
        </span>
        {errorNombre && <small className="p-error">{errorNombreMensaje}</small>}
        
        <span className="p-float-label" style={{marginBottom: "30px"}}>
          <InputText 
            id="email" 
            value={email} 
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
        </span>
        {errorEmail && <small className="p-error">{errorEmailMensaje}</small>}

        <span className="p-float-label" style={{marginBottom: "30px"}}>
          <Password 
            id="password" 
            value={password} 
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            feedback={false}
          />
          <label htmlFor="password">Password</label>
        </span>
        {errorPassword && <small className="p-error">{errorPasswordMensaje}</small>}

        <span className="p-float-label" style={{marginBottom: "30px"}}>
          <InputNumber 
            inputId="edad" 
            value={edad} 
            onValueChange={(event) => {
              setEdad(event.target.value)
            }} 
            mode="decimal" 
            useGrouping={false} 
          />
          <label htmlFor="edad">Edad</label>
        </span>
        {errorEdad && <small className="p-error">{errorEdadMensaje}</small>}
        
        <DropdownForm
          label="Pais"
          options={listaPaises}
          value={pais}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setPais(value);
          }}
          errorState={errorPais}
          errorText={errorPaisMensaje}
        />
        
        <DropdownForm
          label="Estado"
          options={listaEstados}
          value={estado}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setEstado(value);
          }}
          errorState={errorEstado}
          errorText={errorEstadoMensaje}
        />
        
        <DropdownForm
          label="Ciudad"
          options={listaCiudades}
          value={ciudad}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setCiudad(value);
          }}
          errorState={errorCiudad}
          errorText={errorCiudadMensaje}
        />
        
        <input
          accept="image/*"
          id="faceImage"
          type="file"
          className={{display: "block"}}
          onChange={({ target }) => {
            setProfile(target.files[0]);
          }}
        />
        
        {/* Acciones de la página */}
        <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorProfileMensaje}</FormHelperText>
        <SubmitButton onClick={ submitForm } label="Enviar" />
        <p className={`${styles.camposDatosUsuario}`}>¿Ya tienes una cuenta?
        <Link to="/login"> Login</Link></p>
      </div>
    </div>
  );
};
