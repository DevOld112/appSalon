import Appointment from "../models/Appointment.js"

const getUserAppointments = async(req, res) => {
    const { user } = req.params
    console.log(user)
    console.log(req.user._id.toString())
    //Si el usuario es distinto al que esta autenticado

    if(user !== req.user._id.toString()){
        const error = new Error('denied access')
        return res.status(400).json({msg: error.message})
    }
    
    try {
        const query = req.user.admin ? { date: {$gte: new Date() } } : { user, date: {$gte: new Date() } }
        
        const appointments = await Appointment.find(query).populate('services').populate('user').sort({date: 'asc'})

        res.json(appointments)

    } catch (error) {
        console.log(error)
    }
}

export {
    getUserAppointments
}