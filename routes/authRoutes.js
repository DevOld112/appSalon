import express from 'express'
import { register, confirmation, login, user, forgotPassword, verifyPasswordReset, updatePassword, admin } from '../controllers/authControllers.js'
import authMiddleware from '../middleware/authMiddleware.js' 



const router = express.Router()

//Rutas de Autenticacion y Registros de usuarios

router.post('/register', register)
router.get('/verify/:token', confirmation )
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

router.route('/forgot-password/:token')
    .get(verifyPasswordReset)
    .post(updatePassword)

// Area Privada - requiere JWT

router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)


export default router;