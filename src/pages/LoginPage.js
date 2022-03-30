import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { SubmitButton } from "../components";
import { useAuth } from "../contexts"
import { verificarEmail, verificarPassword } from '../funciones';
import styles from "./PagesStyle.module.css";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";

/**
 * Página de login de usuarios.
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
export const LoginPage = () => {
  // ESTADOS DE PÁGINA
  const [submitting, setSubmitting] = useState(false);

  // ESTADOS DE FORMULARIO
  // Datos de Formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validación de formulario
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMensaje, setErrorEmailMensaje] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMensaje, seterrorPasswordMensaje] = useState("");

  // Contextos y Navegador
  const {logIn} = useAuth();
  const navigate = useNavigate();

  // FUNCIONES DE LA PÁGINA
  // Formulario para crear usuario. Al terminar, se recarga la página
  const submitForm = (e) => {
    e.preventDefault();

    // Se guardan los valores de las verificaciones del formulario
    const emailVerificado = verificarEmail(email);
    const passwordVerificado = verificarPassword(password);

    // SE HACE LA VALIDACIÓN DEL FORMULARIO
    // Validación de Email
    if (!emailVerificado){
      setErrorEmail(true);
      setErrorEmailMensaje("Email Incorrecto!");
    }
    else{
      setErrorEmail(false);
      setErrorEmailMensaje("");
    }

    // Validación de Password
    if (!passwordVerificado){
      setErrorPassword(true);
      seterrorPasswordMensaje("Password Incorrecto!");
    }
    else{
      setErrorPassword(false);
      seterrorPasswordMensaje("");
    }

    // Si todas las verificaciones pasaron, se inicia el proceso de crear un usuario
    // y logearlo en el sistema.
    if (emailVerificado && passwordVerificado){
      setSubmitting(true);
    }
  };

  // Con los datos del usuario, se crea un usuario en la BD local como también
  // en Firebase Auth
  useEffect(() => {
    async function logearUsuario() {
      let res = "";
      const userData = { email, password };

      // Se logea al usuario
      res = await logIn(userData.email, userData.password);

      // Se limpian los valores del formulario
      if (res !== "")
      {
        setEmail("");
        setPassword("");
        
        setSubmitting(false);
        navigate("/");
      }
    }

    if(submitting)
      logearUsuario();
  },[submitting])

  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.pantallaRegistro}`}>
        {/* Formulario de Registro */}
        <h1 className={`${styles.tituloPantalla}`}>Login de Usuario</h1>
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          error={errorEmail}
          sx={{ paddingBottom: "10px", m: 1, width: 390 }}
        />
        <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorEmailMensaje}</FormHelperText>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          error={errorPassword}
          sx={{ paddingBottom: "10px", m: 1, width: 390 }}
        />
        <FormHelperText sx={{ paddingBottom: "10px", m: 1 }}>{errorPasswordMensaje}</FormHelperText>
        <SubmitButton onClick={ submitForm } title="Enviar" />
        <p className={`${styles.camposDatosUsuario}`}>¿Aún no tienes una cuenta?
        <Link to="/register"> Registrate </Link></p>
      </div>
    </div>
  );
};
