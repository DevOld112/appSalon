import { formatDate, handleNotFoundError, validateObjectId } from "../helpers/utils.js"
import Appointment from "../models/Appointment.js"
import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns"
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailCancelAppointment } from "../emails/appointmentEmailServices.js"

const createAppointment = async(req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    console.log(appointment)



    
    try {
        const newAppointment = new Appointment(appointment)

        const result = await newAppointment.save()

        await sendEmailNewAppointment({
            date: formatDate(result.date) ,
            time: result.time
        })

        res.json({
            msg: 'Cita Almacenada Correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentByDate = async(req, res) => {
    const { date } = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if(!isValid(newDate)){
        return res.json({
            msg: 'Fecha de consulta invalida'
        })
    }

    const isoDate = formatISO(newDate)

    const appointments = await Appointment.find({date: {
        $gte: startOfDay(new Date(isoDate)),
        $lte: endOfDay(new Date(isoDate))
    }
    }).select('time')

    res.json(appointments)
}

const getAppointmentById = async(req, res) => {
    const { id } = req.params

    //validar por Object id

    if(validateObjectId(id, res)) return 

    //Validar que exista

    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment) {
        return handleNotFoundError('La Cita No existe', res)
    }

    //Validar que sea el mismo usuario que creo la cita pueda editarla

    console.log(appointment.user)
    console.log(req.user._id)

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({
            msg: error.message
        })
    }

    // retonar la cita

    res.json(appointment)
}

const updateAppointment = async(req, res) => {

    const { id } = req.params

    //validar por Object id

    if(validateObjectId(id, res)) return 

    //Validar que exista

    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment) {
        return handleNotFoundError('La Cita No existe', res)
    }

    //Validar que sea el mismo usuario que creo la cita pueda editarla

    console.log(appointment.user)
    console.log(req.user._id)

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({
            msg: error.message
        })
    }

    const { date, time, totalAmount, services } = req.body

    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()

        await sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time
        })

        console.log(sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time
        }))

        res.status(200).json({
            msg: 'Cita Actualizada Correctamente'
        })
    } catch (error) {
        console.log(error)
    }

    

}

const deleteAppointment = async(req, res) => {
    const { id } = req.params

    //validar por Object id

    if(validateObjectId(id, res)) return 

    //Validar que exista

    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment) {
        return handleNotFoundError('La Cita No existe', res)
    }

    //Validar que sea el mismo usuario que creo la cita pueda editarla

    console.log(appointment.user)
    console.log(req.user._id)

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({
            msg: error.message
        })
    }

    try {
        const result = await Appointment.deleteOne()
        
        sendEmailCancelAppointment({
            date: formatDate(result.date),
            time: result.time
        })

        res.json({
            msg: 'Cita Cancelada Correctamente'
        })

    }catch (error) {
        console.log(error)
    }
}

export {
    createAppointment,
    getAppointmentByDate,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}