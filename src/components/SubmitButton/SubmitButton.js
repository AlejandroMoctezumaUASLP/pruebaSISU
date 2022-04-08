// React
import React from "react";

// Importaciones Prime React
import { Button } from 'primereact/button';

/**
 * Botón para poder enviar los datos del Formulario
 * @member
 * @property {function} onClick Función que se ejecuta al enviar el formulario
 * @property {string} title Nombre de la etiqueta de submit
 */
export const SubmitButton = (props) => {
  const { onClick, label } = props;

  return (
    <Button
      label={label}
      onClick={onClick} 
      type="submit"
    />
  );
};
