import React, { useState, useEffect } from "react";
import { DropdownForm, SubmitButton } from "../components";
// import { CrudConsultorios } from "../utils";
import styles from "../App.module.css";
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
  // Datos a mostrar y modales
  const [listaPaises, setListaPaises] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCiudades, setListaCiudades] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados del formulario
  const [pais, setPais] = useState(0);
  const [estado, setEstado] = useState(0);
  const [ciudad, setCiudad] = useState(0);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);

  // Formulario para crear consultorio.
  // Al terminar, se recarga la página
  const submitForm = async (e) => {
    e.preventDefault();
    const body = { pais, estado, ciudad, nombre, edad };
    let res = "";

    // SE CREA UN NUEVO USUARIO

    if (res !== "") {
      // Se limpian los valores
      setPais(0);
      setEstado(0);
      setCiudad(0);
      setNombre("");
      setEdad(0);

      setLoading(true);
    }

    // SE MUESTRAN LOS USUARIOS DEL SISTEMA
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
        .catch((error) => console.log("error", error));
    }

    // Se limpian los dropdowns
    setListaEstados([]);
    setListaCiudades([]);

    // Si se selecciona un país, se actualiza el dropdown de los estados
    if (pais !== 0)
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
        .catch((error) => console.log("error", error));
    }

    // Se limpian el dropdown
    setListaCiudades([]);

    // Si se selecciona un estado, se actualiza el dropdown de ciudades
    if (estado !== 0)
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
        .catch((error) => console.log("error", error));
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      {/* Formulario de Registro */}
      <TextField
        required
        id="outlined-required"
        label="Nombre"
        value={nombre}
        onChange={(event) => {
          setNombre(event.target.value);
        }}
        sx={{ paddingBottom: "10px" }}
      />
      <TextField
        required
        id="outlined-required"
        label="Edad"
        value={edad}
        onChange={(event) => {
          setEdad(event.target.value);
        }}
        sx={{ paddingBottom: "10px" }}
      />
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
      />
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
      />
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
      />
      <SubmitButton title="Enviar" onClick={submitForm}></SubmitButton>
    </div>    
  );
};
