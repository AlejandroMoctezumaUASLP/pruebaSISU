import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

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
  const { opciones, label, values, onChangeFunction } = props;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 390 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={values}
          onChange={onChangeFunction}
          input={<OutlinedInput label={label} />}
          MenuProps={{
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          }}
        >
          {opciones.map((item, key) => (
            <MenuItem key={key} value={item._id}>{item.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
