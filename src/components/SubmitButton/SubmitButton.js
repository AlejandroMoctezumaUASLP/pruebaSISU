import React from "react";
import Button from "@mui/material/Button";

/**
 * Botón para poder enviar los datos del Formulario
 * @member
 * @property {function} onClick Función que se ejecuta al enviar el formulario
 * @property {string} title Nombre de la etiqueta de submit
 */
export const SubmitButton = (props) => {
  const { onClick, title } = props;

  return (
    <Button
      sx={{
        backgroundColor: "#CACACA",
        padding: "10px",
      }}
      onClick={ onClick }
    >
      {title}
    </Button>
  );
};
