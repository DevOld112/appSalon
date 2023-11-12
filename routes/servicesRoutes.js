import express from 'express'
import { createService, deleteService, getAllServices, getServiceById, updateService } from '../controllers/servicesControllers.js'


const router = express.Router()

// Rutas de Servicios - CRUD



router.route('/')
    .post(createService)
    .get(getAllServices)

router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)



export default router