// React
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { DropdownForm, SubmitButton } from "../components";
import { useAuth } from "../contexts"
import { verificarNombre } from '../funciones';
import { CrudRegistro, subirImagen } from "../utils";

// Modulo CSS
import styles from "./PagesStyle.module.css";

// Importaciones Prime React
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

// Importaciones Formik
import { useFormik } from "formik";

/**
 * Página de registro de nuevos usuarios.
 * 
 * El código se estructura de la sig. forma:
 * <ul style="list-style: none;">
 *  <li> Estados de Página
 *  <li> Contexto de Autenticación y Navegador
 *  <li> Funciones (Cambio de Input)
 *  <li> Hooks (Formik, Carga de Países, Estados y Ciudad, Cambio de valor para edad e imagen)
 *  <li> Componente
 * </ul>
 * @member
 */
export const RegistroPage = () => {
  // ESTADOS DE PÁGINA
  const [listaPaises, setListaPaises] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCiudades, setListaCiudades] = useState([]);

  // CONTEXTO DE AUTENTICACIÓN Y NAVEGADOR
  const {signUp} = useAuth();
  const navigate = useNavigate();

  // FUNCIONES
  // Cambia el estado del Input manualmente (Se usa con la edad y la imagen de perfil)
  const onInputChange = (name, value) => {
    formik.setFieldValue(name,value,false);
  };

  // HOOKS
  // Hooks de Formik. Se definen los valores del formulario, la función validadora y
  // la función para logear al Usuario
  const formik = useFormik({
    initialValues: {
      pais: "",
      estado: "",
      ciudad: "",
      nombre: "",
      email: "",
      password: "",
      edad: 18,
      profile: null
    },
    validate: (valores) => {
      let errores = {};

      // Validación de pais
      if(!valores.pais){
        errores.pais = "Por favor ingresa un pais";
      }

      // Validación de estado
      if(!valores.estado){
        errores.estado = "Por favor ingresa un estado";
      }

      // Validación de ciudad
      if(!valores.ciudad){
        errores.ciudad = "Por favor ingresa una ciudad";
      }

      // Validación de nombre
      if(!valores.nombre){
        errores.nombre = "Por favor ingresa un nombre";
      } else if ( verificarNombre(valores.nombre) != "Válido" ){
        errores.nombre = "Nombre no válido";
      }

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

      // Validación de edad
      if(!valores.edad){
        errores.edad = "Por favor ingresa tu edad";
      }else if (valores.edad < 18 || valores.edad > 99){
        errores.edad = "Edad no válida";
      }

      // Validación de imagen de perfil
      if(!valores.profile){
        errores.profile = "Por favor agrega una imagen de perfil";
      }

      return errores;
    },
    onSubmit: async (valores) => {
      // Se crea la imagen de perfil y se agrega la URL a un nuevo objeto de usuario
      let res = "";
      const urlImagen = await subirImagen(valores.profile);
      const body = {
        ciudad: valores.ciudad,
        nombre: valores.nombre,
        edad: valores.edad,
        urlImagen
      }

      // Se crea el usuario en la BD local
      res = await CrudRegistro.createUsuario(JSON.stringify(body));

      // // Se crea el usuario en Firebase Auth y se logea
      await signUp(valores.email, valores.password);

      // Se limpian los valores del formulario
      if (res !== "")
      {
        formik.resetForm();
        navigate("/");
      }
    }
  });

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
        `http://localhost:8000/servicio/estados/${formik.values.pais}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaEstados(result.result))
        .catch((error) => console.log("No hay ID de Pais"));
    }

    // Se limpian los valores seleccionados
    // setEstado("");
    // setCiudad("");
    formik.setFieldValue("estado","",false);
    formik.setFieldTouched("estado",false,false);
    formik.setFieldValue("ciudad","",false);
    formik.setFieldTouched("ciudad",false,false);

    // Se limpian los dropdowns
    setListaEstados([]);
    setListaCiudades([]);
    
    // Si se selecciona un país, se actualiza el dropdown de los estados
    if (formik.values.pais !== "")
        obtenerEstados();
  }, [formik.values.pais]);

  // Cuando se cambia el estado, se carga una nueva lista de ciudades
  useEffect(() => {
    async function obtenerCiudades() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:8000/servicio/ciudades/${formik.values.estado}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setListaCiudades(result.result))
        .catch((error) => console.log("No hay ID de Estado"));
    }

    // Se limpia el valor seleccionado
    formik.setFieldValue("ciudad","",false);
    formik.setFieldTouched("ciudad",false,false);

    // Se limpia el dropdown
    setListaCiudades([]);

    // Si se selecciona un estado, se actualiza el dropdown de ciudades
    if (formik.values.estado !== "")
        obtenerCiudades();
  }, [formik.values.estado]);

  return (
    <div className="card grid pt-8">
      <div className="col-3"></div>
      <div className="col-6">
        {/* Formulario de Registro */}
        <h1 className={`${styles.textoForma}`}>Registro de Usuario</h1>

        <div className="field">
          <span className="p-float-label">
            <InputText 
              id="nombre" 
              name="nombre"
              value={formik.values.nombre} 
              onChange={formik.handleChange}
              className={`inputfield w-full ${formik.touched.nombre && formik.errors.nombre && "p-invalid"}`}
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
          {formik.touched.nombre && formik.errors.nombre && <small className="p-error">{formik.errors.nombre}</small>}
        </div>
        
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
              className={formik.touched.password && formik.errors.password && "p-invalid"}
              inputClassName="inputfield w-full"
            />
            <label htmlFor="password">Password</label>
          </span>
          {formik.touched.password && formik.errors.password &&  <small className="p-error">{formik.errors.password}</small>}
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputNumber 
              id="edad"
              name="edad" 
              value={formik.values.edad} 
              onChange={({value}) => {
                (value && value >= 18 && value <= 99) 
                ? onInputChange("edad",value) 
                : onInputChange("edad",18)
              }}
              mode="decimal"
              showButtons 
              buttonLayout="horizontal"
              min="18"
              max="99" 
              useGrouping={false}
              className={`inputfield w-full ${formik.touched.edad && formik.errors.edad && "p-invalid"}`}
            />
            <label htmlFor="edad">Edad</label>
          </span>
          {formik.touched.edad && formik.errors.edad && <small className="p-error">{formik.errors.edad}</small>}
        </div>
        
        <div className="field">
          <DropdownForm
            label="Pais"
            name="pais"
            options={listaPaises}
            value={formik.values.pais}
            onChange={formik.handleChange}
            error={formik.errors.pais}
            touched={formik.touched.pais}
          />
        </div>
        
        <div className="field">
          <DropdownForm
            label="Estado"
            name="estado"
            options={listaEstados}
            value={formik.values.estado}
            onChange={formik.handleChange}
            error={formik.errors.estado}
            touched={formik.touched.estado}
          />
        </div>
        
        <div className="field">
          <DropdownForm
            label="Ciudad"
            name="ciudad"
            options={listaCiudades}
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            error={formik.errors.ciudad}
            touched={formik.touched.ciudad}
          />
        </div>
        
        <div className="field">
          <input
            accept="image/*"
            id="faceImage"
            name="profile"
            type="file"
            className={{display: "block"}}
            onChange={({target}) => onInputChange("profile",target.files[0])}
          />
          {formik.touched.profile && formik.errors.profile && <small className="p-error">{formik.errors.profile}</small>}
        </div>
        
        {/* Acciones de la página */}
        <SubmitButton onClick={formik.handleSubmit} label="Enviar" />
        <p className={`${styles.textoForma}`}>¿Ya tienes una cuenta?
        <Link to="/login"> Login</Link></p>
      </div>
    </div>
  );
};
