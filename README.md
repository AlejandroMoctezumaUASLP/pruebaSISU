# Avance del proyecto de diagnóstico

Me enfoque en hacer la parte del backend con Node.js de la aplicación. Después de evaluar la forma en que podría integrar MongoDB con la nube (MongoDB Atlas), reutilice un código de backend de uno de los proyectos de mi Github Personal y lo modifiqué para este proyecto.

Las librerías de Node que utilice fueron Express, Mongoose, Cors y dotenv.

## Estructura del Backend

El archivo principal del backend (index.js) describe una API REST. El backend se divide en tres directorios: Modelos, Controladores y Servicios.

Los modelos describen las 4 colecciones descritas en el proyecto anterior (Pais, Estado, Ciudad, Usuario). Los paises, estados y ciudades del backend anterior ya fueron integradas a la base de datos en MongoDB. Dicha BD puede ser accesada desde la nube sin ningún problema.

Los controladores describen el comportamiento esperado para cada una de las rutas del API REST. Agregue métodos para crear, modificar y borrar registros en cada una de las colecciones. Además, reimplemente los métodos del backend en Spring; los métodos de petición HTTP de dichos métodos fueron modificados para que no existiese conflicto con los métodos adicionales.

Los servicios son usados para encangarse de la interacción con la base de datos.

## Ejecución del backend

Como siempre, antes de ejecutar el proyecto, hay que instalar las librerías del proyecto con "npm install". El servidor se inicia con "npm start"
