const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

// busca el archivo .env en la raíz del proyecto y carga todas las variables de entorno definidas en el archivo
dotenv.config();

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors = require('cors');

//Conexión con el Puerto que hay en ENV o en su defecto 6001
const PORT = process.env.PORT || 6001;

//Conexión MONGO DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* INSERTAR MOCK DATA de la carpeta DATA 
      Esto sólo se hace la primera vez que usamos la APP.
      Después es necesario comentar estas líneas de código.
      Insertamos datos de prueba en MongoDB.
    */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));
