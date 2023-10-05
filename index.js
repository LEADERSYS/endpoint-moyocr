const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./app/config/db_config');

//Routes
const infoBranchRouter = require('./app/v1/routes/info_suc');
const authRouter = require('./app/v1/routes/auth_route');

const app = express();
const port = process.env.PORT || 3000;

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuracion del Endpoint
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Main routes
app.use('/api/v1/data', infoBranchRouter);
app.use('/api/v1/verification', authRouter);


// Ruta para verificar que el Endpoint funcione
app.get('/api', (req, res) => {
    res.send('Bienvenido a Moyo CR.');
});
  
// Ruta por defecto para manejar URLs desconocidas
app.use((req, res) => {
    res.status(404).send('Página no encontrada.');
});

// Iniciar el servidor y hacer que escuche en el puerto especificado
app.listen(port, () => {
    connectToDatabase();
    console.log(`Servidor en funcionamiento en el puerto : ${port}`);
});