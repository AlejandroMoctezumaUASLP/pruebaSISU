// React
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { SubmitButton } from "../components";
import { useAuth } from "../contexts"
import { verificarEmail, verificarPassword } from '../funciones';

// Modulo CSS
import styles from "./PagesStyle.module.css";

// Importaciones Prime React
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";

/**
 * Página de login de usuarios.
 * 
 * El código se estructura de la sig. forma:
 * <ul style="list-style: none;">
 *  <li> Contexto de Autenticación, Refs y Navegador
 *  <li> Estados de Página
 *  <li> Estados de Formulario
 *  <li> Funciones de la Página
 *  <li> Hooks (Inicio de sesión)
 *  <li> Componente
 * </ul>
 * @member
 */
export const LoginPage = () => {
  // CONTEXTO DE AUTENTICACIÓN, REFS Y NAVEGADOR
  const {logIn} = useAuth();
  const navigate = useNavigate();
  const toastRef = useRef();

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

  // FUNCIONES DE LA PÁGINA
  // Formulario para crear usuario. Al terminar, se recarga la página
  const submitForm = useCallback((e) => {
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
  },[email,password]);

  // HOOKS
  // Con los datos del usuario, se crea un usuario en la BD local como también
  // en Firebase Auth
  useEffect(() => {
    async function logearUsuario() {
      const userData = { email, password };

      // Se logea al usuario
      try {
        await logIn(userData.email, userData.password);
        setEmail("");
        setPassword("");
        setSubmitting(false);
        navigate("/");
      } catch (error) {
        toastRef.current.show({severity: "error", summary: "Failure", detail: error.message});
      } 
    }

    if(submitting)
      logearUsuario();
  },[submitting])

  // COMPONENTE
  return (
    <div className={`${styles.containerMain}`}>
      <Toast ref={toastRef}/>
      <div className={`${styles.pantallaRegistro}`}>
        {/* Formulario de Registro */}
        <h1 className={`${styles.tituloPantalla}`}>Login de Usuario</h1>
        
        <span className="p-float-label" style={{marginBottom: "30px"}}>
          <InputText 
            id="email" 
            value={email} 
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className={errorEmail && "p-invalid"}
          />
          <label htmlFor="email">Email</label>
        </span>
        {errorEmail && <small className="p-error">{errorEmailMensaje}</small>}
        
        <span className="p-float-label">
          <Password 
            id="password" 
            value={password} 
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            feedback={false}
            className={errorPassword && "p-invalid"}
          />
          <label htmlFor="password">Password</label>
        </span>
        {errorPassword && <small className="p-error">{errorPasswordMensaje}</small>}

        {/* Acciones de la página */}
        <SubmitButton onClick={ submitForm } label="Enviar" />
        <p className={`${styles.camposDatosUsuario}`}>¿Aún no tienes una cuenta?
        <Link to="/register"> Registrate </Link></p>
      </div>
    </div>
  );
};
