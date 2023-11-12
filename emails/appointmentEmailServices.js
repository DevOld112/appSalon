import { createTransport } from '../config/nodemailer.js';

export async function sendEmailNewAppointment({date, time}) {

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     //Enviar Email
     const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Nueva Cita',
        text: 'AppSalon - Nueva Cita',
        html: `
        <html>
            <head>
                <style>
                /* Agrega estilos CSS aquí */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #555;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Hola Admin,</h1>
                <p>¡Tienes una nueva cita!</p>
                <p>La cita sera el dia: ${date} a las ${time} horas</p>
                </div>
            </body>
            </html>
        `
    })

    console.log('mensaje enviado', info.messageId)

}

export async function sendEmailUpdateAppointment({date, time}) {

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     //Enviar Email
     const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Actualizacion de Cita',
        text: 'AppSalon - Actualizacion de Cita',
        html: `
        <html>
            <head>
                <style>
                /* Agrega estilos CSS aquí */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #555;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Hola Admin,</h1>
                <p>¡Tienes una actualizacion de cita!</p>
                <p>La cita se ha modificado para el dia: ${date} a las ${time} horas</p>
                </div>
            </body>
            </html>
        `
    })

    console.log('mensaje enviado', info.messageId)

}

export async function sendEmailCancelAppointment({date, time}) {

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     //Enviar Email
     const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Cita Cancelada',
        text: 'AppSalon - Cita Cancelada',
        html: `
        <html>
            <head>
                <style>
                /* Agrega estilos CSS aquí */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #555;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Hola Admin,</h1>
                <p>¡Tienes una Cancelacion de cita!</p>
                <p>La cita Que tenias para el: ${date} a las ${time} horas ha sido cancelada.</p>
                </div>
            </body>
            </html>
        `
    })

    console.log('mensaje enviado', info.messageId)

}