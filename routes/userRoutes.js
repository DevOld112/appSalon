import authMiddleware from "../middleware/authMiddleware.js"
import express from 'express'
import { getUserAppointments } from "../controllers/userControllers.js"

const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)


export default router