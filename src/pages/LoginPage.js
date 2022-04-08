// React
import React, { useRef } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { SubmitButton } from "../components";
import { useAuth } from "../contexts"

// Modulo CSS
import styles from "./PagesStyle.module.css";

// Importaciones Prime React
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";

// Importaciones Formik
import { useFormik } from "formik";

/**
 * Página de login de usuarios.
 * 
 * El código se estructura de la sig. forma:
 * <ul style="list-style: none;">
 *  <li> Contexto de Autenticación, Refs y Navegador
 *  <li> Hooks (Formik)
 *  <li> Componente
 * </ul>
 * @member
 */
export const LoginPage = () => {
  // CONTEXTO DE AUTENTICACIÓN, REFS Y NAVEGADOR
  const {logIn} = useAuth();
  const navigate = useNavigate();
  const toastRef = useRef();

  // HOOKS
  // Hooks de Formik. Se definen los valores del formulario, la función validadora y
  // la función para logear al Usuario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: (valores) => {
      let errores = {};

      // Validación de email
      if(!valores.email){
        errores.email = "Por favor ingresa un email";
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
        errores.email = "Email no válido";
      }

      // Validación de password
      if(!valores.password){
        errores.password = "Por favor ingresa un password";
      } else if (valores.password.length < 6){
        errores.password = "La contraseña debe de ser de 6 caracteres de largo";
      }

      return errores;
    },
    onSubmit: async (valores) => {
      // Se logea al usuario
      try {
        await logIn(valores.email, valores.password);
        formik.resetForm();
        navigate("/");
      } catch (error) {
        toastRef.current.show({severity: "error", summary: "Failure", detail: error.message});
      } 
    }
  });

  // COMPONENTE
  return (
    <div className="card grid pt-8">
      <div className="col-3"></div>
      <div className="col-6">
        <Toast ref={toastRef}/>
        {/* Formulario de Registro */}
        <h1 className={`${styles.textoForma}`}>Login de Usuario</h1>

        <div className="field">
          <span className="p-float-label">
            <InputText 
              id="email" 
              name="email"
              value={formik.values.email} 
              onChange={formik.handleChange}
              className={`inputfield w-full ${formik.touched.email && formik.errors.email && "p-invalid"}`}
            />
            <label htmlFor="email">Email</label>
          </span>
          {formik.touched.email && formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
        </div>
          
        <div className="field">
          <span className="p-float-label">
            <Password 
              id="password" 
              name="password"
              value={formik.values.password} 
              onChange={formik.handleChange}
              feedback={false}
              className={formik.touched.password && formik.errors.password && "p-invalid"}
              inputClassName="inputfield w-full"
            />
            <label htmlFor="password">Password</label>
          </span>
          {formik.touched.password && formik.errors.password && <small className="p-error">{formik.errors.password}</small>}
        </div>

        {/* Acciones de la página */}
        <SubmitButton onClick={formik.handleSubmit} label="Enviar" />
        <p className={`${styles.textoForma}`}>¿Aún no tienes una cuenta?
        <Link to="/register"> Registrate </Link></p>
      </div>
    </div>
  );
};
