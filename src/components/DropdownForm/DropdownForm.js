// React
import React from "react";

// Importaciones Prime React
import { Dropdown } from 'primereact/dropdown';

/**
 * Input dropdown que permite seleccionar más de una opción en su interior.
 * 
 * @member
 * @property {array} opciones Arreglo con las opciones del dropdown
 * @property {string} label Nombre del Input a desplegar
 * @property {string} name Identificador del Input para Formik
 * @property {array} value Arreglo con los valores seleccionados en la Form
 * @property {function} onChange Función para cambiar el valor del estado
 * @property {string} error Mensaje de error regresado por Formik
 * @property {string} touched Identificador de si se interactúo con el input o no
 * @example
 *  <DropdownForm
 *   label="Pais"
 *   name="pais"
 *   opciones={listaPaises}
 *   value={formik.values.pais}
 *   onChange={formik.handleChange}
 *   error={formik.errors.pais}
 *   touched={formik.touched.pais}
 *  />
 */
export function DropdownForm(props) {
  const { options, label, name, value, onChange, error, touched } = props;

  return (
    <div>
      <span className="p-float-label">
          <Dropdown 
            inputId={`dropdown-${name}`}
            name={name} 
            options={options} 
            optionLabel="nombre"
            optionValue="_id"
            onChange={onChange} 
            value={value} 
            className={`inputfield w-full ${touched && error && "p-invalid"}`}
          />
          <label htmlFor={`dropdown-${name}`}>{label}</label>
      </span>
      {touched && error && <small className="p-error">{error}</small>}
    </div>
  );
}
