import  Services  from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../helpers/utils.js'

const createService = async(req, res) => {
    if(Object.values(req.body).includes('')){
        
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })

    }

    try {
        const Service = new Services(req.body)
        await Service.save()

        res.json({
            msg: 'El Servicio se Registro Correctamente'
        })
    } catch (error) {
        console.log(colors.red(error))
    }

}

const getAllServices = async(req, res) => {

    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async(req, res) => {

    const { id } = req.params

    // Validar un ObjectID

    if(validateObjectId(id, res)) return

    //Validar que exista

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError('El Servicio no Existe', res)
    }

    //Mostrar el servicio

    res.json(service)
}

const updateService = async(req, res) => {
    
    const { id } = req.params

    // Validar un ObjectID

    if(validateObjectId(id, res)) return

    //Validar que exista

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError('El Servicio no Existe', res)
    }

    // Actualizamos el registro en la base de datos

    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()

        res.json({
            msg: 'El servicio se Actualizo correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}


const deleteService = async(req, res) => {
    
    const { id } = req.params

    // Validar un ObjectID (MONGODB)

    if(validateObjectId(id, res)) return

    //Validar que exista

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError('El Servicio no Existe', res)
    }

    try {
        await Services.deleteOne()
        res.json({
            msg: 'El servicio se elimino Correctamente!'
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}