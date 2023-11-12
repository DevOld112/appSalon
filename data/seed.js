import { db } from '../config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import Services from '../models/Services.js'
import { services } from './beautyServices.js'

dotenv.config()

await db()

async function seedDB(){
    try {
        await Services.insertMany(services)
        console.log(colors.green.bold('Datos agregados correctamente'))
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

async function clearDB(){
    try {
        await Services.deleteMany()
        console.log(colors.red.bold('Se eliminaron los Datos'))
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === '--import'){
    seedDB()
} else{
    clearDB()
}