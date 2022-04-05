// React
import React from "react";

// Importaciones Prime React
import { Dropdown } from 'primereact/dropdown';

/**
 * Input dropdown que permite seleccionar más de una opción en su interior.
 * 
 * @member
 * @property {array} opciones Arreglo con las opciones del dropdown
 * @property {string} label Nombre del campo
 * @property {array} values Arreglo con los valores seleccionados en la Form
 * @property {function} onChangeFunction Función para cambiar el valor del estado
 * @example
 *  <DropdownForm
 *    label="Paises"
 *    opciones={listaPaises}
 *    values={paises}
 *    onChangeFunction={(event) => {...}}
 *  />
 */
export function DropdownForm(props) {
  const { options, label, value, onChange, errorState, errorText } = props;

  return (
    <div style={{marginBottom: "30px"}}>
      <span className="p-float-label">
          <Dropdown 
            inputId={`dropdown-${label}`} 
            options={options} 
            optionLabel="nombre"
            optionValue="_id"
            onChange={onChange} 
            value={value} 
          />
          <label htmlFor={`dropdown-${label}`}>{label}</label>
      </span>
      {errorState && <small className="p-error">{errorText}</small>}
    </div>
  );
}
