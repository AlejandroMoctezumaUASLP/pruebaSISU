# Proyecto de Diagnóstico

Para esta entrega, me enfoqué en desarrollar la parte del frontend en React.js y conectarlo al backend que había desarrollado en la entrega anterior.

Implementé Material Design (Con ayuda de React MUI). Aunque estéticamente se ve muy similar a la anterior entrega, los componentes usados son de dicha tecnología.

Para el backend, realicé una modificación al controlador de usuario para que se pudiese recuperar el nombre de la ciudad definida en el registro. Es necesario utilizar la versión del backend incluida en este proyecto y no la de la anterior entrega.

Para el backend, las librerías de Node que utilice fueron Express, Mongoose, Cors y dotenv.

## Tiempo utilizado para cada sección

Backend: 13 horas (Diseño de la solución, análisis de la BD, definición de los modelos, desarrollo del backend, pruebas del backend, creación de registros de prueba, corrección de errores).

Frontend: 24 horas (Diseño de la solución, desarrollo del frontend, conexión con el backend, pruebas de la solución completa.). Si hubiese podido, hubiese dedicado más tiempo para solucionar un error en el que hay que presionar el botón de enviar formulario dos veces. El resto de la aplicación funciona correctamente.

## Estructura del Frontend
Al entrar al archivo principal (index.js), se inicia el componente de la Aplicación (App.js). Aunque en la página solo hay una ruta, igual implementé un sistema de rutas (Con ayuda de Router). La única ruta de la página hace referencia a la página de Registro (RegistroPage.js)

El frontend se divide en cuatro directorios principales: components, funciones, pages y utils.

Components cuenta con todo el código de cada uno de los componentes desarrollados para esta aplicación.

Funciones cuenta con las funciones auxiliares usadas en la aplicación (como pueden ser los validadores de la aplicación).

Pages cuenta con el código de cada una de las páginas de la aplicación, junto con sus respectivos estados y funciones.

Utils cuenta con la parte del CRUD usado en la aplicación que no sea un simple GET (en el caso de este proyecto, cuenta con la función para guardar nuevos usuarios).

## Estructura del Backend

El archivo principal del backend (index.js) describe una API REST. El backend se divide en tres directorios: Modelos, Controladores y Servicios.

Los modelos describen las 4 colecciones descritas en el proyecto anterior (Pais, Estado, Ciudad, Usuario). Los paises, estados y ciudades del backend anterior ya fueron integradas a la base de datos en MongoDB. Dicha BD puede ser accesada desde la nube sin ningún problema.

Los controladores describen el comportamiento esperado para cada una de las rutas del API REST. Agregue métodos para crear, modificar y borrar registros en cada una de las colecciones. Además, reimplemente los métodos del backend en Spring; los métodos de petición HTTP de dichos métodos fueron modificados para que no existiese conflicto con los métodos adicionales.

Los servicios son usados para encangarse de la interacción con la base de datos.

## Ejecución del frontend

Antes de ejecutar el frontend, hay que instalar las librerías del proyecto con "npm install". El servidor se inicia con "npm start". Es necesario ejecutar el backend para poder recuperar los datos de la base de datos.

## Ejecución del backend

Como siempre, antes de ejecutar el proyecto, hay que instalar las librerías del proyecto con "npm install". El servidor se inicia con "npm start"
