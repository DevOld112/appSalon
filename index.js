import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { db } from './config/db.js'

//Variables de Entorno

dotenv.config()

//Configurar la app

const app = express()

//Leer los datos via Body

app.use(express.json())

//Conectar a la Base De Datos

db()

//Configurar CORS (Conectar frontend con backend)

const whiteList = [process.env.FRONTEND_URL]

const corsOption = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            // Permite la Conexion
            callback(null, true)
            console.log(colors.green.bold('Conexion establecida correctamente con el frontend'))
        } else {
            // No permite la Conexion
            callback(new Error('Error con la conexion de CORS'))
        }
    }
}

app.use(cors(corsOption))

//Definir Ruta

app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', userRoutes)

//Definir puerto 

const PORT = process.env.PORT || 4000;

//Arrancar la app

app.listen(PORT, (req, res) => {
    console.log(colors.green.bold(`El servidor se ejecuta en el puerto: ${PORT}`))
})


