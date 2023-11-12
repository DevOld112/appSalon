import User from "../models/User.js"
import { sendEmailVerification, sendEmailPasswordReset } from "../emails/authEmailService.js"
import { generateJWT, uniqueId } from "../helpers/utils.js"

const register = async(req, res) => {

    // Validar Todos los Campos

    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los Campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    const { email, password, name } = req.body

    // Evitar Registros Duplicados

    const userExists = await User.findOne({ email })
    if(userExists){
        return res.status(400).json({
            msg: 'Ya Existe este usuario'
        })
    }

    // Validar la extension del Password

    if(password.trim().length < 8){
        return res.status(400).json({
            msg: 'El password debe ser mayor a 8 caracteres'
        })
    }

    try {
        const user = new User(req.body)
        const result = await user.save();

        const { name, email, token } = result

        sendEmailVerification({ name, email, token }) 

        return res.status(200).json({
            msg: 'Registro Realizado Exitosamente!'
        })
    } catch (error) {
        console.log(error)
    }
}

const confirmation = async(req, res) => {
    
    const { token } = req.params

    // Evitar Tokens invalidos

    const validToken = await User.findOne({ token })
    if(validToken){
        console.log(validToken.token)
        // Realizo el cambio de confirmado de false a true

        try {
            await User.findOneAndUpdate(validToken._id, {token: null, verified:true})

            return res.status(200).json({
                msg:'Cuenta Confirmada Correctamente'
            })
        } catch (error) {
            console.log(error)
        }

    } else {
        return res.status(401).json({
            msg: 'Token Invalido, Usuario no encontrado'
        })
    }
}

const login = async(req, res) => {

       // Validar Todos los Campos

        if(Object.values(req.body).includes('')){
        const error = new Error('Todos los Campos son obligatorios')

            return res.status(400).json({
                msg: error.message
            })
        }   

    // Validar Credenciales

    const { email, password } = req.body;
    
    const validUser = await User.findOne({email})

    // 1) Si el usuario no existe

    if(!validUser){
        return res.status(400).json({
            msg:'Usuario no encontrado'
        })
    }

    // 2) Si el usuario no esta verificado

    if(!validUser.verified){
        return res.status(401).json({
            msg:'Cuenta No verificada aun'
        })
    }

    // 3) Comprobar el Password

    if(await validUser.checkPassword(password)){

        const token = generateJWT(validUser._id)
        console.log(token)
        res.json({
            token: token,
            msg: 'Usuario Autenticado'
        })

    } else {
        return res.status(400).json({
            msg:'La Contraseña es Incorrecta'
        })
    }

}

const forgotPassword = async(req, res) => {
    // Validar Todos los Campos

    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los Campos son obligatorios')
    
            return res.status(400).json({
                    msg: error.message
            })
        }   

        const { email } = req.body

        const validUser = await User.findOne({email})

        // 1) Si el usuario no existe
    
        if(!validUser){
            return res.status(400).json({
                msg:'Usuario no encontrado'
            })
        }
    
        // 2) Si el usuario no esta verificado
    
        if(!validUser.verified){
            return res.status(401).json({
                msg:'Cuenta No verificada aun'
            })
        }

        try {
            validUser.token = uniqueId()
            await validUser.save()

            await sendEmailPasswordReset({
                name: validUser.name,
                email: validUser.email,
                token: validUser.token
            })

            res.json('Revisa tu correo, hemos enviado un mensaje')
        } catch (error) {
            console.log(error)
        }

}

const verifyPasswordReset = async(req, res) => {
    const { token } = req.params

    const isValidToken = await User.findOne({token})
    if(!isValidToken){
        return res.status(400).json({
            msg:'Enlace Invalido/caducado'
        })
    }

    return res.json({msg: 'Enlace Valido'})
}

const updatePassword = async(req, res) => {

    const { token } = req.params

    const user = await User.findOne({token})
    if(!user){
        return res.status(400).json({
            msg:'Enlace Invalido/caducado'
        })
    }

    const { password } = req.body

    try {
        user.token = ''
        user.password = password
        await user.save()

        return res.status(200).json({
            msg: 'Password Modificado Correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const user = async(req, res) => {

    const { user } = req
    
    res.status(200).json(user)
}

const admin = async(req, res) => {

    const { user } = req
    if(!user.admin){
        return res.status(403).json({
            msg: 'Accion NO valida'
        })
    }
    console.log(user)
    
    res.status(200).json(user)
}





export {
    register,
    confirmation,
    login,
    forgotPassword,
    verifyPasswordReset,
    updatePassword,
    user,
    admin

}