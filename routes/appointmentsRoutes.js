import express from 'express'
import { createAppointment, getAppointmentByDate, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointmentControllers.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware , createAppointment)
    .get(authMiddleware, getAppointmentByDate)

router.route('/:id')
    .get(authMiddleware, getAppointmentById)
    .put(authMiddleware, updateAppointment)
    .delete(authMiddleware, deleteAppointment)

export default router